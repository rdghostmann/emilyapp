"use client"
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
        <>
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
            <div className="px-2 py-6 animate-slide-in-up">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Other Featured Services</h2>
                    <button className="text-green-600 text-sm font-medium">View All</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <div className="bg-green-600 rounded-2xl p-4 text-white relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star h-5 w-5 fill-current text-yellow-300">
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                            </svg>
                        </div>
                        <div className="mt-2">
                            <h3 className="font-bold text-lg mb-1">Farm Consultation</h3>
                            <p className="text-sm opacity-90 mb-3">Expert agricultural advice</p>
                            <button className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium">Book Now</button>
                        </div>
                    </div>
                    <div className="bg-orange-600 rounded-2xl p-4 text-white relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-5 w-5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                <polyline points="16 7 22 7 22 13">
                                </polyline></svg></div>
                        <div className="mt-2">
                            <h3 className="font-bold text-lg mb-1">Fresh Produce</h3>
                            <p className="text-sm opacity-90 mb-3">Direct from farms</p>
                            <button className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium">Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}