import { test, expect } from '@playwright/test'

test('no hydration mismatch warnings on home page', async ({ page }) => {
  const messages: string[] = []
  page.on('console', (msg) => {
    // Only capture text messages
    try {
      messages.push(msg.text())
    } catch (e) {}
  })

  await page.goto('/')
  // wait for idle network and rendering
  await page.waitForLoadState('networkidle')

  // debug: capture documentElement.className immediately and after short delay
  const initialClass = await page.evaluate(() => document.documentElement.className)
  console.log('documentElement.className (initial):', initialClass)
  await page.waitForTimeout(500)
  const laterClass = await page.evaluate(() => document.documentElement.className)
  console.log('documentElement.className (after 500ms):', laterClass)

  // Fetch server HTML (raw) and compare the <html ...> opening tag with client DOM
  const res = await page.request.get(page.url())
  const text = await res.text()
  const serverHtmlTagMatch = text.match(/<html[^>]*>/i)
  const serverHtmlTag = serverHtmlTagMatch ? serverHtmlTagMatch[0] : '<html?>'
  console.log('server <html> tag:', serverHtmlTag)

  const clientHtmlTag = await page.evaluate(() => {
    const h = document.documentElement
    // Reconstruct opening tag with attributes for comparison
    const attrs = Array.from(h.attributes).map(a => `${a.name}="${a.value}"`).join(' ')
    return `<html ${attrs}>`
  })
  console.log('client <html> tag:', clientHtmlTag)

  // Fail if any console message mentions hydration mismatch
  const bad = messages.find((m) => /hydration|A tree hydrated|did not match/i.test(m))
  expect(bad, `Found hydration-related console message: ${bad ?? 'none'}`).toBeFalsy()
})
