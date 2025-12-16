import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OopsArt - The Ultimate Art Marketplace & Social Platform",
  description: "Showcase, buy, and sell all kinds of artwork on OopsArt.",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Inline script to set initial theme before React hydrates to avoid hydration mismatch */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark' || (t===null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){} })();`,
          }}
        />
      </head>
      <body className={inter.className}>
        {/*
          Use a deterministic server-rendered theme to avoid hydration mismatches.
          - defaultTheme="light": predictable server output (no `dark` class injected on the server)
          - enableSystem: still allow the client to follow system preference after hydration
          - enableColorScheme={false}: avoid setting `color-scheme` style on the <html> element which
            can also cause hydration differences between server and client
          - disableTransitionOnChange: avoid brief theme transition flashes when the theme updates
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          enableColorScheme={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
