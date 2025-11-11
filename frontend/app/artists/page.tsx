import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

import imgA from "@/image/IMG_20210819_231031.jpg"
import imgB from "@/image/IMG_20210819_231145.jpg"
import imgC from "@/image/IMG_20210819_231315.jpg"
import imgD from "@/image/IMG_20210819_231327.jpg"
import imgE from "@/image/IMG_20210819_231354.jpg"
import imgF from "@/image/IMG_20210819_231420.jpg"
import imgG from "@/image/IMG_20210819_231431.jpg"
import imgH from "@/image/IMG_20210819_231442.jpg"

// Mock data for artists
const artists = [
  {
    id: 1,
    name: "Elena Rivera",
    username: "elenaart",
    avatar: imgA.src,
    bio: "Contemporary abstract artist specializing in vibrant acrylics and mixed media.",
    followers: 1240,
    artworks: 48,
  },
  {
    id: 2,
    name: "Marcus Chen",
    username: "marcusdesigns",
    avatar: imgB.src,
    bio: "Digital artist creating surreal landscapes and futuristic cityscapes.",
    followers: 890,
    artworks: 36,
  },
  {
    id: 3,
    name: "Sophia Johnson",
    username: "sophiaj",
    avatar: imgC.src,
    bio: "Traditional oil painter with a focus on portraits and emotional storytelling.",
    followers: 2150,
    artworks: 72,
  },
  {
    id: 4,
    name: "Alex Kim",
    username: "alexcreates",
    avatar: imgD.src,
    bio: "Experimental artist working with digital media and interactive installations.",
    followers: 760,
    artworks: 29,
  },
  {
    id: 5,
    name: "Jordan Taylor",
    username: "jordantart",
    avatar: imgE.src,
    bio: "Photographer capturing urban landscapes and street culture.",
    followers: 1560,
    artworks: 104,
  },
  {
    id: 6,
    name: "Maya Patel",
    username: "mayapatels",
    avatar: imgF.src,
    bio: "Sculptor working with sustainable materials to create environmental statements.",
    followers: 980,
    artworks: 42,
  },
  {
    id: 7,
    name: "Leo Garcia",
    username: "leogarcia",
    avatar: imgG.src,
    bio: "Mixed media artist exploring cultural identity through collage and assemblage.",
    followers: 1120,
    artworks: 67,
  },
  {
    id: 8,
    name: "Zoe Williams",
    username: "zoewilliams",
    avatar: imgH.src,
    bio: "Illustrator creating whimsical characters and fantastical worlds.",
    followers: 2340,
    artworks: 89,
  },
]

export default function ArtistsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Artists</h1>
          <p className="text-muted-foreground">Discover talented artists from around the world.</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search artists..." className="pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="popular">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="artworks">Most Artworks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artists.map((artist) => (
            <Card key={artist.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={artist.avatar} alt={artist.name} />
                    <AvatarFallback>{artist.name[0]}</AvatarFallback>
                  </Avatar>
                  <Link href={`/artist/${artist.username}`}>
                    <h3 className="font-bold text-lg">{artist.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3">@{artist.username}</p>
                  <p className="text-sm mb-4 line-clamp-2">{artist.bio}</p>
                  <div className="flex justify-between w-full mb-4">
                    <div className="text-center">
                      <p className="font-bold">{artist.followers}</p>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{artist.artworks}</p>
                      <p className="text-xs text-muted-foreground">Artworks</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={`/artist/${artist.username}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
