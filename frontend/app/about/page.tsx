import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brush, Heart, ShoppingBag, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">About OopsArt</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Connecting artists with art enthusiasts around the world.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              OopsArt was founded with a simple mission: to make art accessible to everyone while supporting artists in
              their creative journey. We believe that art has the power to inspire, provoke thought, and transform
              spaces.
            </p>
            <p className="text-muted-foreground">
              Our platform connects talented artists with art enthusiasts, collectors, and interior designers, creating
              a vibrant community where creativity thrives and artists receive fair compensation for their work.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src="/placeholder.svg?height=400&width=600" alt="OopsArt mission" fill className="object-cover" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative order-2 aspect-video overflow-hidden rounded-lg md:order-1">
            <Image src="/placeholder.svg?height=400&width=600" alt="OopsArt story" fill className="object-cover" />
          </div>
          <div className="order-1 space-y-4 md:order-2">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground">
              OopsArt began in 2023 when a group of artists and tech enthusiasts recognized the need for a better way to
              showcase and sell artwork online. Traditional galleries were inaccessible to many talented artists, while
              existing online platforms often prioritized quantity over quality.
            </p>
            <p className="text-muted-foreground">
              We set out to create a platform that combines the curation of a gallery with the accessibility of an
              online marketplace, resulting in OopsArt—a space where art is celebrated, artists are supported, and
              collectors can discover unique pieces with confidence.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-center text-3xl font-bold">Why Choose OopsArt?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Brush,
                title: "Curated Selection",
                description: "Every artwork on our platform is carefully selected for quality and originality.",
              },
              {
                icon: Heart,
                title: "Support Artists",
                description: "Artists receive fair compensation and retain creative control of their work.",
              },
              {
                icon: ShoppingBag,
                title: "Secure Shopping",
                description: "Enjoy a safe buying experience with our satisfaction guarantee.",
              },
              {
                icon: Users,
                title: "Vibrant Community",
                description: "Join a community of art lovers, collectors, and creators.",
              },
            ].map((feature, i) => (
              <Card key={i}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-muted p-8 text-center">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="text-muted-foreground">
              Whether you're an artist looking to showcase your work or an art enthusiast searching for the perfect
              piece, OopsArt welcomes you to our growing community.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/explore">Explore Artwork</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-center text-3xl font-bold">Meet Our Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Jamie Chen",
                role: "Creative Director",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Taylor Wilson",
                role: "Head of Curation",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Jordan Smith",
                role: "Community Manager",
                image: "/placeholder.svg?height=200&width=200",
              },
            ].map((person, i) => (
              <Card key={i}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full">
                    <Image src={person.image || "/placeholder.svg"} alt={person.name} fill className="object-cover" />
                  </div>
                  <h3 className="mt-4 font-bold">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p>
              Have questions or feedback? We'd love to hear from you. Reach out to our team at{" "}
              <a href="mailto:contact@oopsart.com" className="underline">
                contact@oopsart.com
              </a>
            </p>
            <Button variant="secondary" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
