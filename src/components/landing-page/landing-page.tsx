'use client'

import Link from "next/link"
import { mockProducts } from "@/components/lib/constant"
import { useEffect, useState } from "react"
import { PageBackground, Product } from "@/components/lib/types"
import { backgrounds as availableBackgrounds } from "@/components/lib/backgrounds"

export function LandingPage() {
    const [randomProducts, setRandomProducts] = useState<Product[]>([])
    const [randomMarqueeProducts, setRandomMarqueeProducts] = useState<Product[]>([])
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0)
    const [displayedBackgrounds, setDisplayedBackgrounds] = useState<PageBackground[]>([])
    const [isMarqueePaused, setIsMarqueePaused] = useState(false)

    useEffect(() => {
        const shuffleArray = <T,>(array: T[]): T[] => {
            return [...array].sort(() => Math.random() - 0.5)
        }

        setRandomProducts(shuffleArray(mockProducts).slice(0, 6))
        setRandomMarqueeProducts(shuffleArray(mockProducts).slice(0, 9))
        setDisplayedBackgrounds(shuffleArray(availableBackgrounds).slice(0, 4))

        const interval = setInterval(() => {
            setCurrentBackgroundIndex(prev =>
                (prev + 1) % displayedBackgrounds.length
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [displayedBackgrounds.length])

    return (
        <div className="max-w-6xl mx-auto bg-white">
            {/* Hero Section with Background Images */}
            <section className="relative h-[500px] overflow-hidden">
                {displayedBackgrounds.map((bg, index) => (
                    <div
                        key={bg.id}
                        className={`absolute inset-0 transition-opacity duration-1000 rounded-md ease-in-out ${
                            index === currentBackgroundIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            backgroundImage: `url('${bg.image}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                ))}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-6xl font-extrabold text-white sm:text-7xl md:text-7xl drop-shadow-lg">
                        Welcome to Next Cart Online Store
                    </h1>
                    <p className="mt-3 text-xl text-white drop-shadow-md">
                        Discover amazing products and unbeatable deals at unbelievable prices!
                    </p>
                    <Link href="/products" className="mt-8">
                        <button className="bg-gradient-to-r from-cyan-600 to-green-500 text-white py-3 px-8 rounded-md hover:from-cyan-700 hover:to-green-600 transition-all shadow-lg">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </section>

            {/* Marquee Section */}
            <section
                className="py-8 relative bg-white"
                onMouseEnter={() => setIsMarqueePaused(true)}
                onMouseLeave={() => setIsMarqueePaused(false)}
            >
                <div className="relative overflow-hidden">
                    <div
                        className="flex gap-8 whitespace-nowrap"
                        style={{
                            animation: `${isMarqueePaused ? 'paused' : 'marquee 20s linear infinite'}`,
                            display: 'inline-flex',
                            width: 'max-content'
                        }}
                    >
                        {[...randomMarqueeProducts, ...randomMarqueeProducts].map((product, index) => (
                            <div
                                key={`${product.id}-${index}`}
                                className="flex-shrink-0 relative"
                            >
                                {/* Separator line - only show between items */}
                                {index > 0 && (
                                    <div className="absolute left-[-1rem] top-1/2 transform -translate-y-1/2 h-16 w-px bg-gray-200"></div>
                                )}

                                <div className="w-40 p-2 rounded-lg hover:shadow-md transition-shadow">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-32 w-full object-contain"
                                    />
                                    <p className="text-center mt-2 font-medium text-gray-700 truncate">
                                        {product.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-12 bg-gray-100 rounded-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-cyan-900 mb-8 text-center">
                        Featured Products
                    </h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {randomProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                            >
                                <div className="h-100 overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                    <p className="mt-2 text-green-600 font-bold">
                                        ₦{product.price.toLocaleString()}
                                    </p>
                                    <Link href={`/products/${product.id}`}>
                                        <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-colors">
                                            View Product
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    )
}