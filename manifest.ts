import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "EmilyAgros",
        short_name: "EmilyAgros",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4CAF50",
        description: "Your Gateway to the Future of Agriculture and Marketplace",
        icons: [
            {
                src: "/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    }
}

