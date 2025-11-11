"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Loader2, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=cart")
      return
    }

    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container max-w-4xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
            <p className="text-muted-foreground">Looks like you haven't added any artwork to your cart yet.</p>
          </div>
          <Button asChild>
            <Link href="/explore">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">Review and update your cart before checkout.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Link href={`/artwork/${item.id}`} className="font-medium hover:underline">
                        {item.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">By {item.artist}</p>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="h-8 w-12 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span>${(subtotal * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${(subtotal * 1.08).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </Button>
              </CardFooter>
            </Card>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/explore">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
