import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="container flex h-[calc(100vh-8rem)] items-center justify-center">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Successful!</CardTitle>
          <CardDescription>Thank you for your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Your order has been placed successfully. We&apos;ve sent a confirmation email with all the details to your
            registered email address.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium">Order #OA-{Math.floor(Math.random() * 10000)}</p>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/profile/orders">View Order</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/explore">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
