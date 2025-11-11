import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, ShoppingCart } from "lucide-react"

// This would be replaced with a database query in a real application
function getArtwork(id: string) {
  return {
    id: Number.parseInt(id),
    title: "Abstract Harmony",
    description:
      "This piece explores the relationship between color and emotion, using vibrant hues and dynamic brushstrokes to create a sense of movement and energy. The composition balances chaos and order, inviting viewers to find their own meaning within the abstract forms.",
    image: "/placeholder.svg?height=600&width=600",
    price: 299.99,
    dimensions: '24" x 36"',
    medium: "Acrylic on Canvas",
    year: 2023,
    artist: {
      id: 1,
      name: "Elena Rivera",
      avatar: "/placeholder.svg?height=100&width=100",
      username: "elenaart",
      bio: "Contemporary abstract artist specializing in vibrant acrylics and mixed media.",
      followers: 1240,
    },
    likes: 124,
    comments: [
      {
        id: 1,
        user: {
          name: "Sarah M.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "The use of color in this piece is absolutely stunning!",
        date: "2 days ago",
      },
      {
        id: 2,
        user: {
          name: "David K.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "I love how the composition creates a sense of movement. Would love to see this in person!",
        date: "1 week ago",
      },
    ],
  }
}

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = getArtwork(params.id)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-md border">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={`${artwork.title} view ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{artwork.title}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Link href={`/artist/${artwork.artist.username}`} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={artwork.artist.avatar} alt={artwork.artist.name} />
                  <AvatarFallback>{artwork.artist.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{artwork.artist.name}</span>
              </Link>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold">${artwork.price}</div>
            <div className="text-sm text-muted-foreground">Free shipping • 30-day returns</div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{artwork.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Dimensions</p>
              <p className="text-sm text-muted-foreground">{artwork.dimensions}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Medium</p>
              <p className="text-sm text-muted-foreground">{artwork.medium}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Year</p>
              <p className="text-sm text-muted-foreground">{artwork.year}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <Tabs defaultValue="details">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="comments">Comments ({artwork.comments.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <h2 className="text-xl font-bold">About this artwork</h2>
          <p>{artwork.description}</p>
          <p>
            This original artwork comes with a certificate of authenticity and is ready to hang. The colors in the image
            may vary slightly from the actual artwork due to differences in screen displays.
          </p>
        </TabsContent>
        <TabsContent value="shipping" className="space-y-4">
          <h2 className="text-xl font-bold">Shipping Information</h2>
          <p>
            This artwork is carefully packaged to ensure safe delivery. Shipping is free within the continental United
            States. International shipping is available at an additional cost.
          </p>
          <p>
            Delivery typically takes 5-7 business days after processing. For custom shipping requests or international
            orders, please contact our customer service team.
          </p>
        </TabsContent>
        <TabsContent value="comments" className="space-y-6" id="comments">
          <h2 className="text-xl font-bold">Comments ({artwork.comments.length})</h2>
          <div className="space-y-4">
            {artwork.comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{comment.user.name}</p>
                    <p className="text-xs text-muted-foreground">{comment.date}</p>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
