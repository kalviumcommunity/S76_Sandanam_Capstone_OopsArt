import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

// Mock data for artists
const artists = [
  {
    id: 1,
    name: "Elena Rivera",
    username: "elenaart",
    avatar: "https://i.pravatar.cc/300?img=1",
    bio: "Contemporary abstract artist specializing in vibrant acrylics and mixed media.",
    followers: 1240,
    artworks: 48,
  },
  {
    id: 2,
    name: "Marcus Chen",
    username: "marcusdesigns",
    avatar: "https://i.pravatar.cc/300?img=5",
    bio: "Digital artist creating surreal landscapes and futuristic cityscapes.",
    followers: 890,
    artworks: 36,
  },
  {
    id: 3,
    name: "Sophia Johnson",
    username: "sophiaj",
    avatar: "https://i.pravatar.cc/300?img=9",
    bio: "Traditional oil painter with a focus on portraits and emotional storytelling.",
    followers: 2150,
    artworks: 72,
  },
  {
    id: 4,
    name: "Alex Kim",
    username: "alexcreates",
    avatar: "https://i.pravatar.cc/300?img=13",
    bio: "Experimental artist working with digital media and interactive installations.",
    followers: 760,
    artworks: 29,
  },
  {
    id: 5,
    name: "Jordan Taylor",
    username: "jordantart",
    avatar: "https://i.pravatar.cc/300?img=17",
    bio: "Photographer capturing urban landscapes and street culture.",
    followers: 1560,
    artworks: 104,
  },
  {
    id: 6,
    name: "Maya Patel",
    username: "mayapatels",
    avatar: "https://i.pravatar.cc/300?img=21",
    bio: "Sculptor working with sustainable materials to create environmental statements.",
    followers: 980,
    artworks: 42,
  },
  {
    id: 7,
    name: "Leo Garcia",
    username: "leogarcia",
    avatar: "https://i.pravatar.cc/300?img=25",
    bio: "Mixed media artist exploring cultural identity through collage and assemblage.",
    followers: 1120,
    artworks: 67,
  },
  {
    id: 8,
    name: "Zoe Williams",
    username: "zoewilliams",
    avatar: "https://i.pravatar.cc/300?img=29",
    bio: "Illustrator creating whimsical characters and fantastical worlds.",
    followers: 2340,
    artworks: 89,
  }
]

export default function ArtistsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Artists</h1>
        <p className="text-xl text-muted-foreground">Discover talented artists from around the world.</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search artists..."
            className="pl-10 w-full"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select defaultValue="popular">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="painting">Painting</SelectItem>
              <SelectItem value="digital">Digital Art</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="sculpture">Sculpture</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <Card key={artist.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <Link href={`/artist/${artist.username}`} className="block">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative group-hover:scale-105 transition-transform">
                    <Avatar className="h-24 w-24 border-4 border-primary/20">
                      <AvatarImage src={artist.avatar} alt={artist.name} />
                      <AvatarFallback>{artist.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">@{artist.username}</p>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{artist.bio}</p>
                  <div className="flex justify-between w-full text-sm">
                    <div className="text-center">
                      <div className="font-semibold">{artist.followers.toLocaleString()}</div>
                      <div className="text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{artist.artworks}</div>
                      <div className="text-muted-foreground">Artworks</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
            <div className="px-6 pb-6 pt-0">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/artist/${artist.username}`}>View Profile</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
