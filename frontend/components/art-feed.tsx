"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

// Image paths for the art feed
const img1 = '/image/IMG_20210819_225056.jpg'
const img2 = '/image/IMG_20210819_225233.jpg'
const img3 = '/image/IMG_20210819_225243.jpg'
const img4 = '/image/IMG_20210819_225312.jpg'
const img5 = '/image/IMG_20210819_225316.jpg'
const img6 = '/image/IMG_20210819_225322.jpg'
const img7 = '/image/IMG_20210819_225632.jpg'
const img8 = '/image/IMG_20210819_230558.jpg'
const img9 = '/image/IMG_20210819_230633.jpg'
const img10 = '/image/IMG_20210819_230709.jpg'
const img11 = '/image/IMG_20210819_230719.jpg'
const img12 = '/image/IMG_20210819_230728.jpg'
const img13 = '/image/IMG_20210819_230740.jpg'
const img14 = '/image/IMG_20210819_230759.jpg'
const img15 = '/image/IMG_20210819_231031.jpg'
const img16 = '/image/IMG_20210819_231145.jpg'
const img17 = '/image/IMG_20210819_231315.jpg'
const img18 = '/image/IMG_20210819_231327.jpg'
const img19 = '/image/IMG_20210819_231354.jpg'
const img20 = '/image/IMG_20210819_231420.jpg'
const img21 = '/image/IMG_20210819_231431.jpg'
const img22 = '/image/IMG_20210819_231442.jpg'

// Mock data for the art feed
const localImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22]

const artworks = [
  {
    id: 1,
    title: "Abstract Harmony",
    image: localImages[0],
    price: 299.99,
    artist: {
      name: "Elena Rivera",
      avatar: "https://i.pravatar.cc/300?img=1",
      username: "elenaart",
    },
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    title: "Urban Landscape",
    image: localImages[1],
    price: 349.99,
    artist: {
      name: "Marcus Chen",
      avatar: "https://i.pravatar.cc/300?img=5",
      username: "marcusdesigns",
    },
    likes: 89,
    comments: 7,
  },
  {
    id: 3,
    title: "Serenity in Blue",
    image: localImages[2],
    price: 199.99,
    artist: {
      name: "Sophia Johnson",
      avatar: "https://i.pravatar.cc/300?img=9",
      username: "sophiaj",
    },
    likes: 215,
    comments: 32,
  },
  {
    id: 4,
    title: "Digital Dreams",
    image: localImages[3],
    price: 149.99,
    artist: {
      name: "Alex Kim",
      avatar: "https://i.pravatar.cc/300?img=13",
      username: "alexcreates",
    },
    likes: 76,
    comments: 5,
  },
  {
    id: 5,
    title: "Mystic Visions",
    image: localImages[4],
    price: 279.99,
    artist: {
      name: "Sarah Park",
      avatar: "https://i.pravatar.cc/300?img=17",
      username: "sarahp_art",
    },
    likes: 142,
    comments: 21,
  },
  {
    id: 6,
    title: "Ethereal Whispers",
    image: localImages[5],
    price: 349.99,
    artist: {
      name: "Raj Patel",
      avatar: "https://i.pravatar.cc/300?img=21",
      username: "raj_creations",
    },
    likes: 98,
    comments: 14,
  },
  {
    id: 7,
    title: "Urban Jungle",
    image: localImages[6],
    price: 289.99,
    artist: {
      name: "Mia Chen",
      avatar: "https://i.pravatar.cc/300?img=25",
      username: "miachen_art",
    },
    likes: 176,
    comments: 29,
  },
  {
    id: 8,
    title: "Celestial Dreams",
    image: localImages[7],
    price: 419.99,
    artist: {
      name: "Diego Rivera",
      avatar: "https://i.pravatar.cc/300?img=29",
      username: "diego_artworks",
    },
    likes: 231,
    comments: 42,
  },
  {
    id: 9,
    title: "Whimsical Wonders",
    image: localImages[8],
    price: 379.99,
    artist: {
      name: "Lila Chen",
      avatar: "https://i.pravatar.cc/300?img=33",
      username: "lilac_creations",
    },
    likes: 187,
    comments: 23,
  },
  {
    id: 10,
    title: "Oceanic Serenity",
    image: localImages[9],
    price: 329.99,
    artist: {
      name: "Marco Silva",
      avatar: "https://i.pravatar.cc/300?img=37",
      username: "marco_oceanart",
    },
    likes: 154,
    comments: 31,
  },
  {
    id: 11,
    title: "Desert Mirage",
    image: localImages[10],
    price: 289.99,
    artist: {
      name: "Nina Patel",
      avatar: "https://i.pravatar.cc/300?img=41",
      username: "nina_desertart",
    },
    likes: 112,
    comments: 17,
  },
  {
    id: 12,
    title: "Mountain Majesty",
    image: localImages[11],
    price: 459.99,
    artist: {
      name: "Oliver Chen",
      avatar: "https://i.pravatar.cc/300?img=45",
      username: "oliver_mountains",
    },
    likes: 198,
    comments: 28,
  },
  {
    id: 13,
    title: "Urban Jungle",
    image: localImages[12],
    price: 279.99,
    artist: {
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/300?img=49",
      username: "priya_urbanart",
    },
    likes: 167,
    comments: 19,
  },
  {
    id: 14,
    title: "Cosmic Dance",
    image: localImages[13],
    price: 399.99,
    artist: {
      name: "Rafael Mendez",
      avatar: "https://i.pravatar.cc/300?img=53",
      username: "rafa_cosmic",
    },
    likes: 243,
    comments: 36,
  },
  {
    id: 15,
    title: "Forest Whispers",
    image: localImages[14],
    price: 349.99,
    artist: {
      name: "Sofia Chen",
      avatar: "https://i.pravatar.cc/300?img=57",
      username: "sofia_forestart",
    },
    likes: 178,
    comments: 24,
  },
  {
    id: 16,
    title: "Golden Hour",
    image: localImages[15],
    price: 419.99,
    artist: {
      name: "Tariq Al-Farsi",
      avatar: "https://i.pravatar.cc/300?img=61",
      username: "tariq_goldenlight",
    },
    likes: 201,
    comments: 29,
  },
]

export function ArtFeed() {
  const [likedArt, setLikedArt] = useState<number[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()

  const toggleLike = (id: number) => {
    if (likedArt.includes(id)) {
      setLikedArt(likedArt.filter((artId) => artId !== id))
    } else {
      setLikedArt([...likedArt, id])
    }
  }

  const handleAddToCart = (artwork: (typeof artworks)[0]) => {
    addItem({
      id: artwork.id,
      title: artwork.title,
      price: artwork.price,
      image: artwork.image,
      artist: artwork.artist.name,
    })

    toast({
      title: "Added to cart",
      description: `${artwork.title} has been added to your cart.`,
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {artworks.map((artwork) => (
        <Card key={artwork.id} className="overflow-hidden flex flex-col h-full">
          <CardHeader className="p-0 flex-1">
            <Link href={`/artwork/${artwork.id}`} className="block h-full">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </Link>
          </CardHeader>
          <CardContent className="p-4 flex-1">
            <div className="flex items-center justify-between">
              <Link href={`/artwork/${artwork.id}`} className="font-medium line-clamp-1">
                {artwork.title}
              </Link>
              <span className="font-bold text-sm whitespace-nowrap ml-2">${artwork.price}</span>
            </div>
            <div className="mt-2 flex items-center">
              <Link href={`/artist/${artwork.artist.username}`} className="flex items-center gap-2 w-full">
                <Avatar className="h-6 w-6 flex-shrink-0">
                  <AvatarImage src={artwork.artist.avatar || "/placeholder.svg"} alt={artwork.artist.name} />
                  <AvatarFallback>{artwork.artist.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground truncate" title={artwork.artist.name}>
                  {artwork.artist.name}
                </span>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike(artwork.id);
                  }}
                >
                  <Heart className={`h-3.5 w-3.5 ${likedArt.includes(artwork.id) ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="sr-only">Like</span>
                </Button>
                <span className="text-xs text-muted-foreground min-w-[20px] text-center">
                  {likedArt.includes(artwork.id) ? artwork.likes + 1 : artwork.likes}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  asChild
                >
                  <Link href={`/artwork/${artwork.id}#comments`}>
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span className="sr-only">Comments</span>
                  </Link>
                </Button>
                <span className="text-xs text-muted-foreground min-w-[20px] text-center">
                  {artwork.comments}
                </span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                className="h-7 px-2 text-xs" 
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(artwork);
                }}
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                Add
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
