import Link from "next/link"
import { ArtFeed } from "@/components/art-feed"
import { FeaturedArtists } from "@/components/featured-artists"
import { Button } from "@/components/ui/button"
import { Brush, Search, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover and Collect Unique Artwork
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  OopsArt connects artists with art enthusiasts. Buy, sell, and showcase your creativity on our
                  platform.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/explore">
                    <Search className="mr-2 h-4 w-4" />
                    Explore Art
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/upload">
                    <Brush className="mr-2 h-4 w-4" />
                    Start Selling
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  <div className="flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span>Trending Now</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Explore Trending Artwork</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Discover the most popular pieces from talented artists around the world.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-1">
              <ArtFeed />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Artists</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Meet the creators behind the most extraordinary pieces on OopsArt.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
              <FeaturedArtists />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
