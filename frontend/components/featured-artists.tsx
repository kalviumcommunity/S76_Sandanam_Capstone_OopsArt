import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for featured artists
const artists = [
  {
    id: 1,
    name: "Elena Rivera",
    username: "elenaart",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Contemporary abstract artist specializing in vibrant acrylics and mixed media.",
    followers: 1240,
    artworks: 48,
  },
  {
    id: 2,
    name: "Marcus Chen",
    username: "marcusdesigns",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Digital artist creating surreal landscapes and futuristic cityscapes.",
    followers: 890,
    artworks: 36,
  },
  {
    id: 3,
    name: "Sophia Johnson",
    username: "sophiaj",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Traditional oil painter with a focus on portraits and emotional storytelling.",
    followers: 2150,
    artworks: 72,
  },
  {
    id: 4,
    name: "Alex Kim",
    username: "alexcreates",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Experimental artist working with digital media and interactive installations.",
    followers: 760,
    artworks: 29,
  },
]

export function FeaturedArtists() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {artists.map((artist) => (
        <Card key={artist.id}>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={artist.avatar || "/placeholder.svg"} alt={artist.name} />
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
  )
}
