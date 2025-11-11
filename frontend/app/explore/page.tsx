import { ArtFeed } from "@/components/art-feed"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal } from "lucide-react"

export default function ExplorePage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Explore Artwork</h1>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search for artwork, artists, or styles..." className="pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="trending">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">Categories</h3>
            <div className="space-y-3">
              {["Abstract", "Digital", "Photography", "Painting", "Sculpture", "Mixed Media"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category.toLowerCase()}`} />
                  <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Price Range</h3>
            <div className="space-y-4">
              <Slider defaultValue={[0, 1000]} min={0} max={1000} step={10} />
              <div className="flex items-center justify-between">
                <span className="text-sm">$0</span>
                <span className="text-sm">$1000+</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Medium</h3>
            <div className="space-y-3">
              {["Oil", "Acrylic", "Watercolor", "Digital", "Pencil", "Charcoal"].map((medium) => (
                <div key={medium} className="flex items-center space-x-2">
                  <Checkbox id={`medium-${medium.toLowerCase()}`} />
                  <Label htmlFor={`medium-${medium.toLowerCase()}`}>{medium}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Size</h3>
            <div className="space-y-3">
              {["Small", "Medium", "Large", "Oversized"].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size.toLowerCase()}`} />
                  <Label htmlFor={`size-${size.toLowerCase()}`}>{size}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">Apply Filters</Button>
        </div>

        <div>
          <ArtFeed />
        </div>
      </div>
    </div>
  )
}
