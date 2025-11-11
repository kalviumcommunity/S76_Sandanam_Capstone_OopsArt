"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from "lucide-react"

export default function UploadPage() {
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [quantity, setQuantity] = useState<number>(1)
  const [publishing, setPublishing] = useState(false)
  const apiBase = (process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:3000")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      setImages([...images, ...selectedFiles])

      // Create preview URLs
      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file))
      setPreviews([...previews, ...newPreviews])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newPreviews = [...previews]
    URL.revokeObjectURL(newPreviews[index])
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
  }

  return (
    <div className="container max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Upload Your Artwork</h1>
          <p className="text-muted-foreground">Share your creations with the OopsArt community</p>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Artwork Details</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Artwork Title</Label>
                <Input id="title" placeholder="Enter the title of your artwork" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your artwork, including inspiration, techniques used, and the story behind it"
                  rows={5}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abstract">Abstract</SelectItem>
                      <SelectItem value="digital">Digital Art</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="sculpture">Sculpture</SelectItem>
                      <SelectItem value="mixed-media">Mixed Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="medium">Medium</Label>
                  <Select>
                    <SelectTrigger id="medium">
                      <SelectValue placeholder="Select medium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oil">Oil</SelectItem>
                      <SelectItem value="acrylic">Acrylic</SelectItem>
                      <SelectItem value="watercolor">Watercolor</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="pencil">Pencil</SelectItem>
                      <SelectItem value="charcoal">Charcoal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="width">Width (inches)</Label>
                  <Input id="width" type="number" placeholder="Width" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="height">Height (inches)</Label>
                  <Input id="height" type="number" placeholder="Height" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="year">Year Created</Label>
                  <Input id="year" type="number" placeholder="Year" />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Upload Images</Label>
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Drag images here or click to upload</p>
                      <p className="text-xs text-muted-foreground">
                        Upload up to 5 high-quality images of your artwork (Max 10MB each)
                      </p>
                    </div>
                    <Input
                      id="artwork-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button variant="outline" onClick={() => document.getElementById("artwork-upload")?.click()}>
                      Select Images
                    </Button>
                  </div>
                </div>

                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-md border">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="Enter price" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input id="quantity" type="number" placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="shipping-options">Shipping Options</Label>
                <Select>
                  <SelectTrigger id="shipping-options">
                    <SelectValue placeholder="Select shipping option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free Shipping</SelectItem>
                    <SelectItem value="flat">Flat Rate</SelectItem>
                    <SelectItem value="calculated">Calculated by Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="shipping-details">Shipping Details</Label>
                <Textarea
                  id="shipping-details"
                  placeholder="Provide details about shipping, handling time, and any special considerations"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="returns">Return Policy</Label>
                <Textarea id="returns" placeholder="Describe your return policy" rows={3} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex justify-end gap-4">
          <Button variant="outline">Save as Draft</Button>
          <Button
            onClick={async () => {
              if (!title.trim()) return
              setPublishing(true)
              try {
                await fetch(`${apiBase}/api/items`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: title.trim(), quantity: Number(quantity) || 0 }),
                })
                setTitle("")
                setQuantity(1)
                setImages([])
                setPreviews([])
                alert("Artwork published")
              } catch (e) {
                alert("Failed to publish")
              } finally {
                setPublishing(false)
              }
            }}
            disabled={publishing}
          >
            {publishing ? "Publishing..." : "Publish Artwork"}
          </Button>
        </div>
      </div>
    </div>
  )
}
