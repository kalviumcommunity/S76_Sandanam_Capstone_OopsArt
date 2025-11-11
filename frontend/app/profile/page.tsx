"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Edit, Heart, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="container py-10">Loading...</div>
  }

  return (
    <div className="container py-10">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar || "/placeholder.svg?height=80&width=80"} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">
                {user.role === "artist" ? "Artist" : "Art Enthusiast"} • Member since {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/profile/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/profile/edit">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="collections">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="collections" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Collections</h2>
              <Button variant="outline" size="sm">
                Create Collection
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Modern Art", count: 12, cover: "/placeholder.svg?height=200&width=200" },
                { name: "Abstract Favorites", count: 8, cover: "/placeholder.svg?height=200&width=200" },
                { name: "Inspiration", count: 15, cover: "/placeholder.svg?height=200&width=200" },
              ].map((collection, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={collection.cover || "/placeholder.svg"}
                      alt={collection.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground">{collection.count} artworks</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="favorites" className="space-y-6">
            <h2 className="text-xl font-semibold">Favorite Artworks</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                {
                  title: "Abstract Harmony",
                  artist: "Elena Rivera",
                  price: 299.99,
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  title: "Urban Landscape",
                  artist: "Marcus Chen",
                  price: 349.99,
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  title: "Serenity in Blue",
                  artist: "Sophia Johnson",
                  price: 199.99,
                  image: "/placeholder.svg?height=200&width=200",
                },
              ].map((artwork, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      <span className="sr-only">Remove from favorites</span>
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground">by {artwork.artist}</p>
                    <p className="mt-1 font-medium">${artwork.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-xl font-semibold">Order History</h2>
            <div className="space-y-4">
              {[
                { id: "OA-1234", date: "April 12, 2023", status: "Delivered", items: 2, total: 649.98 },
                { id: "OA-1156", date: "March 3, 2023", status: "Shipped", items: 1, total: 199.99 },
                { id: "OA-1089", date: "January 15, 2023", status: "Delivered", items: 3, total: 799.97 },
              ].map((order, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Order #{order.id}</CardTitle>
                      <Badge variant={order.status === "Delivered" ? "default" : "outline"}>{order.status}</Badge>
                    </div>
                    <CardDescription>{order.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">
                      {order.items} {order.items === 1 ? "item" : "items"} • ${order.total.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/profile/orders/${order.id}`}>View Order</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">Bio</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.role === "artist"
                      ? "Contemporary artist specializing in abstract and mixed media pieces. My work explores the relationship between urban environments and natural elements."
                      : "Art enthusiast with a passion for contemporary and abstract pieces. I enjoy collecting works that tell a story and evoke emotion."}
                  </p>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-sm text-muted-foreground">New York, USA</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Website</h3>
                    <p className="text-sm text-muted-foreground">www.example.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Member Since</h3>
                    <p className="text-sm text-muted-foreground">January 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
