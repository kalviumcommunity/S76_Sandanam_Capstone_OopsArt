"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/auth-context'

export default function SettingsPage() {
  const { user, updateProfile, isLoading } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState((user as any)?.bio || '')
  const [bannerUrl, setBannerUrl] = useState((user as any)?.bannerUrl || '')
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleBannerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setFilePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setAvatarPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      const payload: any = { name, bio }
      if (filePreview) payload.bannerBase64 = filePreview
      else if (bannerUrl) payload.bannerUrl = bannerUrl
      if (avatarPreview) payload.avatarBase64 = avatarPreview
      await updateProfile(payload)
      setMessage('Profile updated')
      setFilePreview(null)
      setAvatarPreview(null)
    } catch (err: any) {
      setMessage(err?.message || 'Failed')
    } finally {
      setSaving(false)
    }
  }

  // Derive a simple handle from the name (for display)
  const handle = (user?.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 20) || user?.email?.split('@')[0]

  return (
    <div className="container mx-auto py-8">
      {/* Header with banner and avatar */}
      <div className="relative rounded-lg overflow-hidden bg-muted">
        <div className="h-40 w-full relative bg-gray-800">
          {filePreview ? (
            // preview banner while picking
            <img src={filePreview} alt="banner preview" className="object-cover w-full h-full" />
          ) : (user as any)?.bannerUrl ? (
            <Image src={(user as any).bannerUrl} alt="banner" fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-900" />
          )}
        </div>
        <div className="container mx-auto px-4">
          <div className="-mt-12 flex items-end justify-between">
            <div className="flex items-end gap-4">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-background">
                  {avatarPreview ? (
                    // use plain img to avoid layout shift
                    <img src={avatarPreview} alt="avatar preview" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <AvatarImage src={user?.avatar || '/placeholder.svg?height=80&width=80'} alt={user?.name} />
                  )}
                  <AvatarFallback>{(user?.name || '').charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="pb-3">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">@{handle}</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-lg border p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-xs text-muted-foreground">Artworks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1,344</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">94</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px] mt-6">
        <main>
          <div className="rounded-lg border p-6 bg-card">
            <h1 className="text-xl font-semibold mb-4">Edit Profile</h1>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 block w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Bio</label>
                <textarea value={bio} onChange={(e)=>setBio(e.target.value)} className="mt-1 block w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Banner URL (or upload)</label>
                <input value={bannerUrl} onChange={(e)=>setBannerUrl(e.target.value)} className="mt-1 block w-full" />
                <div className="mt-2 flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={handleBannerFile} />
                  <input type="file" accept="image/*" onChange={handleAvatarFile} />
                </div>
                {filePreview && (
                  <div className="mt-2">
                    <img src={filePreview} alt="preview" className="h-40 object-cover w-full rounded" />
                  </div>
                )}
                {avatarPreview && (
                  <div className="mt-2">
                    <img src={avatarPreview} alt="avatar preview" className="h-20 w-20 rounded-full object-cover" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={saving || isLoading}>{saving ? 'Saving...' : 'Save changes'}</Button>
                <Button variant="outline" onClick={() => { setName(user?.name || ''); setBio((user as any)?.bio || ''); setBannerUrl((user as any)?.bannerUrl || ''); setFilePreview(null); setAvatarPreview(null); }}>Reset</Button>
              </div>
              {message && <p className="text-sm mt-2">{message}</p>}
            </form>
          </div>
        </main>

        <aside className="space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Profile Preview</h3>
            <div className="rounded overflow-hidden">
              <div className="h-24 bg-gray-800 relative">
                {(user as any)?.bannerUrl ? (
                  <Image src={(user as any).bannerUrl} alt="banner preview" fill className="object-cover" />
                ) : <div className="h-24 bg-gradient-to-r from-gray-800 to-gray-900" />}
              </div>
              <div className="p-3 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img src={(user as any)?.avatar || '/placeholder.svg?height=48&width=48'} alt="avatar" className="object-cover h-full w-full" />
                </div>
                <div>
                  <div className="font-semibold">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">@{handle}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Tips</h3>
            <p className="text-sm text-muted-foreground">Fill out your bio and add a banner to make your profile stand out. You can upload images directly from this page.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
