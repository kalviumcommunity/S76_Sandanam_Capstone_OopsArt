import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for featured artists with actual profile pictures
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

export function FeaturedArtists() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {artists.map((artist) => (
        <Card key={artist.id} className="h-full flex flex-col">
          <CardContent className="p-6 flex-grow flex flex-col">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src={artist.avatar} alt={artist.name} />
                <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{artist.name}</h3>
                <p className="text-sm text-muted-foreground">@{artist.username}</p>
              </div>
              <p className="text-sm text-muted-foreground flex-grow">
                {artist.bio}
              </p>
              <div className="flex justify-between w-full text-sm text-muted-foreground">
                <span>{new Intl.NumberFormat('en-US').format(artist.followers)} followers</span>
                <span>{artist.artworks} artworks</span>
              </div>
              <Button asChild variant="outline" size="sm" className="w-full mt-2">
                <Link href={`/artists/${artist.username}`}>View Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}