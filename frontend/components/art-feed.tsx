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

// Import a selection of local images to replace placeholders
import img1 from "@/image/IMG_20210819_225056.jpg"
import img2 from "@/image/IMG_20210819_225233.jpg"
import img3 from "@/image/IMG_20210819_225243.jpg"
import img4 from "@/image/IMG_20210819_225312.jpg"
import img5 from "@/image/IMG_20210819_225316.jpg"
import img6 from "@/image/IMG_20210819_225322.jpg"
import img7 from "@/image/IMG_20210819_225632.jpg"
import img8 from "@/image/IMG_20210819_230558.jpg"
import img9 from "@/image/IMG_20210819_230633.jpg"
import img10 from "@/image/IMG_20210819_230709.jpg"
import img11 from "@/image/IMG_20210819_230719.jpg"
import img12 from "@/image/IMG_20210819_230728.jpg"
import img13 from "@/image/IMG_20210819_230740.jpg"
import img14 from "@/image/IMG_20210819_230759.jpg"
import img15 from "@/image/IMG_20210819_231031.jpg"
import img16 from "@/image/IMG_20210819_231145.jpg"
import img17 from "@/image/IMG_20210819_231315.jpg"
import img18 from "@/image/IMG_20210819_231327.jpg"
import img19 from "@/image/IMG_20210819_231354.jpg"
import img20 from "@/image/IMG_20210819_231420.jpg"
import img21 from "@/image/IMG_20210819_231431.jpg"
import img22 from "@/image/IMG_20210819_231442.jpg"

// Mock data for the art feed
const localImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22]

const artworks = [
  {
    id: 1,
    title: "Abstract Harmony",
    image: localImages[0].src,
    price: 299.99,
    artist: {
      name: "Elena Rivera",
      avatar: localImages[10].src,
      username: "elenaart",
    },
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    title: "Urban Landscape",
    image: localImages[1].src,
    price: 349.99,
    artist: {
      name: "Marcus Chen",
      avatar: localImages[11].src,
      username: "marcusdesigns",
    },
    likes: 89,
    comments: 7,
  },
  {
    id: 3,
    title: "Serenity in Blue",
    image: localImages[2].src,
    price: 199.99,
    artist: {
      name: "Sophia Johnson",
      avatar: localImages[12].src,
      username: "sophiaj",
    },
    likes: 215,
    comments: 32,
  },
  {
    id: 4,
    title: "Digital Dreams",
    image: localImages[3].src,
    price: 149.99,
    artist: {
      name: "Alex Kim",
      avatar: localImages[13].src,
      username: "alexcreates",
    },
    likes: 76,
    comments: 5,
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
        <Card key={artwork.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <Link href={`/artwork/${artwork.id}`}>
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
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Link href={`/artwork/${artwork.id}`} className="font-medium">
                {artwork.title}
              </Link>
              <span className="font-bold">${artwork.price}</span>
            </div>
            <div className="mt-2 flex items-center">
              <Link href={`/artist/${artwork.artist.username}`} className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={artwork.artist.avatar || "/placeholder.svg"} alt={artwork.artist.name} />
                  <AvatarFallback>{artwork.artist.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{artwork.artist.name}</span>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleLike(artwork.id)}>
                <Heart className={`h-4 w-4 ${likedArt.includes(artwork.id) ? "fill-red-500 text-red-500" : ""}`} />
                <span className="sr-only">Like</span>
              </Button>
              <span className="text-sm text-muted-foreground">
                {likedArt.includes(artwork.id) ? artwork.likes + 1 : artwork.likes}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href={`/artwork/${artwork.id}#comments`}>
                  <MessageCircle className="h-4 w-4" />
                  <span className="sr-only">Comments</span>
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground">{artwork.comments}</span>
            </div>
            <Button size="sm" className="h-8" onClick={() => handleAddToCart(artwork)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
