import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Instagram, Twitter, Globe, MapPin } from "lucide-react"

// This would be replaced with a database query in a real application
function getArtist(username: string) {
  return {
    id: 1,
    name: "Elena Rivera",
    username: username,
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    bio: "Contemporary abstract artist specializing in vibrant acrylics and mixed media. My work explores the relationship between urban environments and natural elements, creating dynamic compositions that invite viewers to find their own meaning within the abstract forms.",
    location: "New York, USA",
    website: "www.elenarivers-art.com",
    followers: 1240,
    following: 385,
    artworks: 48,
    socialMedia: {
      instagram: "elenarivera_art",
      twitter: "elenarivera_art",
    },
    featuredArtworks: [
      {
        id: 1,
        title: "Abstract Harmony",
        image: "/placeholder.svg?height=400&width=400",
        price: 299.99,
      },
      {
        id: 2,
        title: "Urban Flow",
        image: "/placeholder.svg?height=400&width=400",
        price: 349.99,
      },
      {
        id: 3,
        title: "Chromatic Dreams",
        image: "/placeholder.svg?height=400&width=400",
        price: 279.99,
      },
      {
        id: 4,
        title: "Structural Balance",
        image: "/placeholder.svg?height=400&width=400",
        price: 399.99,
      },
    ],
  }
}

export default function ArtistProfilePage({ params }: { params: { username: string } }) {
  const artist = getArtist(params.username)

  return (
    <div>
      <div className="relative h-64 w-full md:h-80">
        <Image
          src={artist.coverImage || "/placeholder.svg"}
          alt={`${artist.name}'s cover image`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container px-4 py-8 md:px-6">
        <div className="relative -mt-20 flex flex-col items-center md:-mt-24 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-end">
            <Avatar className="h-32 w-32 border-4 border-background md:h-40 md:w-40">
              <AvatarImage src={artist.avatar} alt={artist.name} />
              <AvatarFallback>{artist.name[0]}</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center md:ml-6 md:text-left">
              <h1 className="text-3xl font-bold">{artist.name}</h1>
              <p className="text-muted-foreground">@{artist.username}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 md:mt-0">
            <Button>Follow</Button>
            <Button variant="outline">Message</Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <Tabs defaultValue="artworks">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="artworks">Artworks</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              <TabsContent value="artworks" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">All Artworks</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      Sort
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {artist.featuredArtworks.map((artwork) => (
                    <Card key={artwork.id} className="overflow-hidden">
                      <Link href={`/artwork/${artwork.id}`}>
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
                      </Link>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="collections" className="space-y-6">
                <h2 className="text-xl font-semibold">Collections</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[
                    { name: "Abstract Series", count: 12, cover: "/placeholder.svg?height=200&width=200" },
                    { name: "Urban Landscapes", count: 8, cover: "/placeholder.svg?height=200&width=200" },
                  ].map((collection, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="relative aspect-[3/2]">
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
              <TabsContent value="about" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">About {artist.name}</h2>
                  <p>{artist.bio}</p>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{artist.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`https://${artist.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {artist.website}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={`https://instagram.com/${artist.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="icon">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </a>
                    <a
                      href={`https://twitter.com/${artist.socialMedia.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="icon">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">Artist Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{artist.artworks}</p>
                  <p className="text-xs text-muted-foreground">Artworks</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{artist.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{artist.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">Featured Artworks</h3>
              <div className="space-y-4">
                {artist.featuredArtworks.slice(0, 2).map((artwork) => (
                  <div key={artwork.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={artwork.image || "/placeholder.svg"}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{artwork.title}</h4>
                      <p className="text-sm font-bold">${artwork.price}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#artworks">View All Artworks</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">Contact Artist</h3>
              <Button className="w-full">Send Message</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
