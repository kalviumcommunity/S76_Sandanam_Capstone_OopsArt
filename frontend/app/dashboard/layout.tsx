"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Brush, Home, ImageIcon, Package, Settings, Users } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "artist")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="container py-10">Loading...</div>
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="md:w-64">
          <div className="sticky top-20">
            <div className="space-y-1">
              <h2 className="mb-4 text-lg font-semibold">Artist Dashboard</h2>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  Overview
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/artworks">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  My Artworks
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/orders">
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/followers">
                  <Users className="mr-2 h-4 w-4" />
                  Followers
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/upload">
                  <Brush className="mr-2 h-4 w-4" />
                  Upload New Artwork
                </Link>
              </Button>
            </div>
          </div>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
