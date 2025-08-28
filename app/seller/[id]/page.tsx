// /seller/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, MessageSquare, Shield, Calendar, Eye, Heart, Share2, Flag } from "lucide-react";
import { getSellerById } from "@/controllers/seller";

interface PageProps {
  params: { id: string };
}

export default async function SellerProfilePage({ params }: PageProps) {
  // Await params in case it's a Promise
  const { id } = params;

  const seller = await getSellerById(id);

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Seller Not Found</h1>
          <p className="text-gray-600 mb-8">
            The seller profile you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-green-400 to-green-600">
        <Image
          src={`${seller.coverImage}`}
          alt={`${seller.firstName} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={seller.avatar} alt={seller.username} />
                <AvatarFallback>{seller.username.slice(0, 2)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{seller.username}</h1>
                  {seller.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Shield className="w-4 h-4 mr-1" /> Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{seller.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {seller.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Member since {new Date(seller.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{seller.description}</p>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <MessageSquare className="w-4 h-4 mr-2" /> Contact Seller
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Flag className="w-4 h-4 mr-2" /> Report
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Products Tab */}
        <Tabs defaultValue="products" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 bg-white">
            <TabsTrigger value="products">Products ({seller.products.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seller.products.map((product) => (
                <Card key={product._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-2xl font-bold text-green-600 mb-3">
                        ₦{product.price.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <Eye className="w-4 h-4 mr-1" /> {product.stats?.views || 0} views
                        <Heart className="w-4 h-4 mr-1" /> {product.stats?.favorites || 0} likes
                      </div>
                      <Button asChild size="sm" className="flex-1">
                        <Link href={`/product/${product._id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Business Hours: {seller.businessHours || "N/A"}</p>
                <p>Certifications: {seller.certifications?.join(", ") || "None"}</p>
                <p>Followers: {seller.stats?.followers || 0}</p>
                <p>Profile Views: {seller.stats?.profileViews || 0}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
