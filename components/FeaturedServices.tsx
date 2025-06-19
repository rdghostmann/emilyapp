import { Card, CardContent } from "@/components/ui/card"
import { Truck, Shield, Clock, Headphones } from "lucide-react"

const services = [
  {
    id: "delivery",
    title: "Fast Delivery",
    description: "Same day delivery available",
    icon: Truck,
    color: "bg-blue-500",
  },
  {
    id: "quality",
    title: "Quality Assured",
    description: "100% fresh guarantee",
    icon: Shield,
    color: "bg-green-500",
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "Always here to help",
    icon: Headphones,
    color: "bg-purple-500",
  },
  {
    id: "fresh",
    title: "Always Fresh",
    description: "Direct from farm",
    icon: Clock,
    color: "bg-orange-500",
  },
]

export default function FeaturedServices() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us</h2>

      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card key={service.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center mb-3`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
