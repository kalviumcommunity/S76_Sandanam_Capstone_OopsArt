"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Flag, Home, ImageIcon, Settings, ShieldAlert, Users } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
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
              <h2 className="mb-4 text-lg font-semibold">Admin Panel</h2>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/admin">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/admin/artworks">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Artworks
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/admin/reports">
                  <Flag className="mr-2 h-4 w-4" />
                  Reports
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/admin/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <Button variant="destructive" className="w-full" asChild>
                <Link href="/admin/moderation">
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Moderation Queue
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
