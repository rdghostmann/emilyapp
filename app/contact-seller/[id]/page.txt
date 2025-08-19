// app/contact-seller/[id]/page.tsx
import { getProductById } from "@/controllers/products"
import { ProductInterface } from "@/types/product"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Phone, Shield, MapPin, Star } from "lucide-react"
import { revalidatePath } from "next/cache"
import Link from "next/link"

interface PageProps {
  params: { id: string }
}

interface ContactFormProps {
  product: ProductInterface
}

export const sendMessage = async (formData: FormData) => {
  "use server"

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string
  const productId = formData.get("productId") as string

  // Here you would implement sending the message (DB or email)
  console.log({ name, email, phone, subject, message, productId })

  // Optionally, revalidate product page or redirect
  revalidatePath(`/product/${productId}`)
}

export default async function ContactSellerPage(props: PageProps) {
  const { params } = await props
  const product = await getProductById(params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
      </div>
    )
  }

  return <ContactSellerForm product={product} />
}

function ContactSellerForm({ product }: ContactFormProps) {
  const seller = product.seller
  console.log("Seller Data:", seller)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Seller</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seller Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Seller Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.username} />
                  <AvatarFallback>{seller.username}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold">{seller.username}</h3>
                    {seller.verified && <Shield className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" /> {seller.rating || 0} ({seller.totalSales || 0} sales)
                  </div>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 gap-2">
                {seller.location && <MapPin className="w-4 h-4" />}
                {seller.location}
              </div>

              <div className="pt-4 border-t">
                <Badge variant="secondary">Verified Seller</Badge>
                <p className="text-sm text-gray-600">
                  This seller has been verified and has a good track record.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 items-center">
                <img
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <p className="text-lg font-bold text-green-600">₦{product.price.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={sendMessage} className="space-y-4">
                <input type="hidden" name="productId" value={product._id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input id="name" name="name" placeholder="Enter your name" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+234 800 123 4567" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder={`Inquiry about ${product.name}`} />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" name="message" rows={6} required />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                    Send Message
                  </Button>
                  <Link href={`tel:${product.seller.phone}`}>
                    <Button type="button" variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" /> Call Now
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
