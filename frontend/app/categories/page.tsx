import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

// Image paths for categories
const img1 = '/image/IMG_20210819_225056.jpg'
const img2 = '/image/IMG_20210819_225233.jpg'
const img3 = '/image/IMG_20210819_225243.jpg'
const img4 = '/image/IMG_20210819_225312.jpg'
const img5 = '/image/IMG_20210819_225316.jpg'
const img6 = '/image/IMG_20210819_225322.jpg'
const img7 = '/image/IMG_20210819_225632.jpg'
const img8 = '/image/IMG_20210819_230558.jpg'
const img9 = '/image/IMG_20210819_230633.jpg'

// Mock data for categories
const categories = [
  {
    name: "Abstract",
    description: "Non-representational art that does not attempt to depict reality",
    image: img1,
    count: 1245,
    slug: "abstract",
  },
  {
    name: "Digital Art",
    description: "Art created or modified using digital technology",
    image: img2,
    count: 856,
    slug: "digital-art",
  },
  {
    name: "Photography",
    description: "The art of capturing light with a camera to create images",
    image: img3,
    count: 642,
    slug: "photography",
  },
  {
    name: "Painting",
    description: "The application of paint to a surface to create art",
    image: img4,
    count: 1532,
    slug: "painting",
  },
  {
    name: "Sculpture",
    description: "Three-dimensional art made by shaping materials",
    image: img5,
    count: 428,
    slug: "sculpture",
  },
  {
    name: "Mixed Media",
    description: "Art that combines different materials and techniques",
    image: img6,
    count: 753,
    slug: "mixed-media",
  },
  {
    name: "Illustration",
    description: "Visual representations that illuminate or elucidate text",
    image: img7,
    count: 921,
    slug: "illustration",
  },
  {
    name: "Street Art",
    description: "Art created in public spaces, often with a social message",
    image: img8,
    count: 384,
    slug: "street-art",
  },
  {
    name: "Conceptual",
    description: "Art where the concept takes precedence over traditional aesthetics",
    image: img9,
    count: 512,
    slug: "conceptual",
  },
]

export default function CategoriesPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Art Categories</h1>
          <p className="text-muted-foreground">Explore artwork by category and discover new artists.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3]">
                  <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-4 text-white">
                    <h2 className="text-xl font-bold">{category.name}</h2>
                    <p className="text-sm text-white/80">{category.count} artworks</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
