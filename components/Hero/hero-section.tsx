import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">EmilyAgros</h1>
                <p className="text-sm text-gray-600">Empowering the future of Agriculture</p>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Agriculture & Marketplace Made <span className="text-green-600">Simple, Secure & Smart</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Experience the future of agri-business with our cutting-edge digital platform. Manage your farm,
              marketplace, and finances with ease and confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/marketplace">Explore Marketplace</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/post-product">Post Your Product</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Agricultural marketplace illustration"
              width={600}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
