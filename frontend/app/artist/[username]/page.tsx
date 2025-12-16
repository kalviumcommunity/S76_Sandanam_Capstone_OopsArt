import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Instagram, Twitter, Globe, MapPin } from "lucide-react"
import ArtistArtworks from '@/components/artist-artworks'

// Image configuration for the artist page
const getArtistImages = (username: string) => {
  // Base path for images in the public folder (no need for /public in the path)
  const basePath = '/image/';
  
  // All available image filenames
  const allImages = [
    'IMG_20210819_225056.jpg',
    'IMG_20210819_225233.jpg',
    'IMG_20210819_225243.jpg',
    'IMG_20210819_225312.jpg',
    'IMG_20210819_225316.jpg',
    'IMG_20210819_225322.jpg',
    'IMG_20210819_225632.jpg',
    'IMG_20210819_230558.jpg',
    'IMG_20210819_230633.jpg',
    'IMG_20210819_230709.jpg',
    'IMG_20210819_230719.jpg',
    'IMG_20210819_230728.jpg',
    'IMG_20210819_230740.jpg',
    'IMG_20210819_230759.jpg',
    'IMG_20210819_231031.jpg',
    'IMG_20210819_231145.jpg',
    'IMG_20210819_231315.jpg',
    'IMG_20210819_231327.jpg',
    'IMG_20210819_231354.jpg',
    'IMG_20210819_231420.jpg',
    'IMG_20210819_231431.jpg',
    'IMG_20210819_231442.jpg'
  ].map(img => ({
    src: basePath + img,
    alt: `Artwork ${img.split('_').pop()?.split('.')[0] || ''}`
  }));

  // Create a deterministic index based on username
  const getIndex = (str: string, max: number) => {
    return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % max;
  };

  const avatarIndex = getIndex(username, 4);
  const coverIndex = getIndex(username + 'cover', 4);
  
  // Ensure we have enough images
  const safeIndex = (idx: number) => Math.min(idx, allImages.length - 1);
  
  return {
    avatar: allImages[safeIndex(avatarIndex)].src,
    cover: allImages[safeIndex(coverIndex + 4)].src,
    artworks: allImages.slice(0, 6).map(img => img.src),
    // Include alt text for better accessibility
    getAlt: (idx: number) => allImages[safeIndex(idx)]?.alt || 'Artwork'
  };
};

// Get images based on username
const getArtistImagesData = (username: string) => {
  if (!username) {
    // Fallback for undefined or empty username
    username = 'default';
  }
  
  // These are the known usernames we support
  const knownUsernames = ['elenaart', 'marcusdesigns', 'sophiaj', 'alexcreates'];
  
  try {
    // If it's a known username, use the same index for consistency
    // Otherwise, generate based on the username
    const index = knownUsernames.includes(username) 
      ? knownUsernames.indexOf(username) 
      : username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 4;
      
    return getArtistImages(knownUsernames[Math.min(index, knownUsernames.length - 1)] || username);
  } catch (error) {
    console.error('Error getting artist images:', error);
    // Return default images if there's an error
    return getArtistImages('default');
  }
};

// This would be replaced with a database query in a real application
function getArtist(username: string) {
  const defaultData = {
    id: 1,
    name: username.charAt(0).toUpperCase() + username.slice(1),
    username: username,
    bio: "Passionate artist creating unique pieces that inspire and captivate. My work is a reflection of my journey through different styles and mediums.",
    location: "Chennai, India",
    website: `www.${username}.art`,
    // Deterministic follower/following numbers based on username to avoid hydration mismatch
    followers: 500 + (username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5000),
    following: 50 + (username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 200),
    socialMedia: {
      instagram: username,
      twitter: username,
    },
    featuredArtworks: [
      { id: 1, title: "Morning Serenity", price: 249.99 },
      { id: 2, title: "Urban Rhythms", price: 329.99 },
      { id: 3, title: "Ethereal Dreams", price: 279.99 },
      { id: 4, title: "Harmonic Balance", price: 359.99 },
    ],
  }

  // Get images for this username
  const images = getArtistImagesData(username || 'default')

  return {
    ...defaultData,
    avatar: images.avatar,
    coverImage: images.cover,
    artworks: images.artworks.length,
    featuredArtworks: defaultData.featuredArtworks.map((artwork, index) => ({
      ...artwork,
      image: images.artworks[index % images.artworks.length]
    })),
  }
}

export default async function ArtistProfilePage({ params }: { params: { username: string } }) {
  // In Next's App Router, params may be async — await it before accessing properties
  const { username } = await params as { username: string }
  const artist = getArtist(username)
  // The interactive artwork list (edit/delete) is implemented in the
  // client component `ArtistArtworks`. Keep this server component purely
  // for rendering static content and pass `featuredArtworks` as initial data.

  return (
    <div>
      <div className="relative h-64 w-full md:h-80">
        <Image
          src={artist.coverImage || "/placeholder.svg"}
          alt={`${artist.name}'s cover image`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container px-4 py-8 md:px-6">
        <div className="relative -mt-20 flex flex-col items-center md:-mt-24 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-end">
            <Avatar className="h-32 w-32 border-4 border-background md:h-40 md:w-40">
              <AvatarImage src={artist.avatar} alt={artist.name} />
              <AvatarFallback>{artist.name[0]}</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center md:ml-6 md:text-left">
              <h1 className="text-3xl font-bold">{artist.name}</h1>
              <p className="text-muted-foreground">@{artist.username}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 md:mt-0">
            <Button>Follow</Button>
            <Button variant="outline">Message</Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <Tabs defaultValue="artworks">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="artworks">Artworks</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              <TabsContent value="artworks" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">All Artworks</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      Sort
                    </Button>
                  </div>
                </div>
                <ArtistArtworks username={username} initialArtworks={artist.featuredArtworks} />
              </TabsContent>
              <TabsContent value="collections" className="space-y-6">
                <h2 className="text-xl font-semibold">Collections</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[
                    { name: "Abstract Series", count: 12, cover: "/placeholder.svg?height=200&width=200" },
                    { name: "Urban Landscapes", count: 8, cover: "/placeholder.svg?height=200&width=200" },
                  ].map((collection, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="relative aspect-[3/2]">
                        <Image
                          src={collection.cover || "/placeholder.svg"}
                          alt={collection.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{collection.name}</h3>
                        <p className="text-sm text-muted-foreground">{collection.count} artworks</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="about" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">About {artist.name}</h2>
                  <p>{artist.bio}</p>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{artist.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`https://${artist.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {artist.website}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={`https://instagram.com/${artist.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="icon">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </a>
                    <a
                      href={`https://twitter.com/${artist.socialMedia.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="icon">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">Artist Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{artist.artworks}</p>
                  <p className="text-xs text-muted-foreground">Artworks</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{artist.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{artist.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">Featured Artworks</h3>
              <div className="space-y-4">
                {artist.featuredArtworks.slice(0, 2).map((artwork) => (
                  <div key={artwork.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={artwork.image || "/placeholder.svg"}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{artwork.title}</h4>
                      <p className="text-sm font-bold">${artwork.price}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#artworks">View All Artworks</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">Contact Artist</h3>
              <Button className="w-full">Send Message</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
