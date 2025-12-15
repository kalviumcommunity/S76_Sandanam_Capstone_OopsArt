import Link from "next/link"
import { ArtFeed } from "@/components/art-feed"
import { FeaturedArtists } from "@/components/featured-artists"
import { Button } from "@/components/ui/button"
import { Brush, Search, Sparkles, TrendingUp, Users } from "lucide-react"

// Reusable section component
const Section = ({ 
  children, 
  bg = 'light',
  fullHeight = true,
  id = '',
  className = ''
}: { 
  children: React.ReactNode, 
  bg?: 'light' | 'dark' | 'gradient',
  fullHeight?: boolean,
  id?: string,
  className?: string
}) => {
  const bgClasses = {
    light: 'bg-white dark:bg-gray-900',
    dark: 'bg-gray-50 dark:bg-gray-950',
    gradient: 'bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
  }

  return (
    <section 
      id={id}
      className={`w-full ${fullHeight ? 'min-h-[calc(100vh-80px)]' : 'py-20 md:py-32'} flex items-center justify-center ${bgClasses[bg]} ${className}`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  )
}

// Reusable section header component with size prop
const SectionHeader = ({
  title,
  subtitle,
  icon: Icon = Sparkles,
  highlight = '',
  size = 'lg' // 'sm' | 'md' | 'lg'
}: {
  title: string | React.ReactNode,
  subtitle: string | React.ReactNode,
  icon?: React.ComponentType<{ className?: string }>,
  highlight?: string,
  size?: 'sm' | 'md' | 'lg'
}) => {
  const titleSizes = {
    sm: 'text-4xl',
    md: 'text-5xl',
    lg: 'text-6xl md:text-7xl lg:text-8xl'
  }

  const subtitleSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-2l md:text-4xl'
  }

  return (
    <div className="text-center w-full max-w-6xl mx-auto mb-8">
      {highlight && (
        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 mb-4">
          <Icon className="mr-2 h-4 w-4" />
          {highlight}
        </div>
      )}
      <h2 className={`${titleSizes[size]} font-bold tracking-tight leading-none`}>
        {title}
      </h2>
      <div className={`mt-3 ${subtitleSizes[size]} text-muted-foreground max-w-4xl mx-auto leading-relaxed`}>
        {subtitle}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <Section bg="gradient" id="home" className="pt-4">
          <div className="text-center space-y-4 w-full">
            <SectionHeader 
              title={
                <div className="flex flex-col items-center justify-center">
                  <span className="block text-4xl md:text-7xl lg:text-8xl font-black leading-none mb-2 md:mb-4">
                    Discover and Collect
                  </span>
                  <span className="block text-3xl md:text-6xl lg:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Unique Artwork
                  </span>
                </div>
              }
              subtitle={
                <div className="text-lg md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  OopsArt connects artists with art enthusiasts. Buy, sell, and showcase your creativity on our platform.
                </div>
              }
              highlight="Welcome to OopsArt"
            />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button asChild size="lg" className="px-8 py-6 text-lg">
                <Link href="/explore" className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Explore Art
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg" asChild>
                <Link href="/upload" className="flex items-center gap-2">
                  <Brush className="h-5 w-5" />
                  Start Selling
                </Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* Trending Artwork Section */}
        <Section bg="light" id="trending">
          <div className="text-center w-full">
            <SectionHeader 
              title="Explore Trending Artwork"
              subtitle="Discover the most popular pieces from talented artists around the world."
              icon={TrendingUp}
              highlight="Trending Now"
              size="sm"  // This makes it smaller
            />
            <div className="mt-8 text-left">
              <ArtFeed />
            </div>
          </div>
        </Section>

        {/* Featured Artists Section */}
        <Section bg="dark" id="artists">
          <div className="text-center w-full">
            <SectionHeader 
              title="Featured Artists"
              subtitle="Meet the creators behind the most extraordinary pieces on OopsArt."
              icon={Users}
              highlight="Creative Minds"
              size="md"  // Medium size
            />
            <div className="mt-8 text-left">
              <FeaturedArtists />
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}