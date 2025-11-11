import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Brush } from "lucide-react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Brush className="h-6 w-6" />
        <span className="inline-block font-bold">OopsArt</span>
      </Link>
      <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
        <Button asChild variant="link">
          <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
            Explore
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Categories
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/artists" className="text-sm font-medium transition-colors hover:text-primary">
            Artists
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
        </Button>
      </nav>
    </div>
  )
}
