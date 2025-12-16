"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { api } from '@/lib/api'

export default function ArtistArtworks({ username, initialArtworks }: { username: string, initialArtworks: any[] }) {
  const [artworks, setArtworks] = useState(initialArtworks)
  const { user } = useAuth()
  const slugFromName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 20)
  const currentHandle = user ? (slugFromName(user.name) || user.email.split('@')[0]) : null
  const isOwner = currentHandle === username

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this artwork?')) return
    setArtworks((prev) => prev.filter((a) => a.id !== id))
    try {
      await api.deleteProduct(String(id))
    } catch (err) {
      // ignore if backend doesn't have the id
    }
  }

  const handleEdit = (id: number) => {
    window.location.href = `/upload?edit=${id}`
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork) => (
        <Card key={artwork.id} className="overflow-hidden relative">
          <a href={`/artwork/${artwork.id}`}>
            <div className="relative aspect-square">
              <Image
                src={artwork.image || "/placeholder.svg"}
                alt={artwork.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{artwork.title}</h3>
              <p className="font-bold">${artwork.price}</p>
            </CardContent>
          </a>

          {isOwner && (
            <div className="absolute top-2 right-2 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(artwork.id)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(artwork.id)}>Delete</Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
