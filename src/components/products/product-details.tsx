'use client'

import {Badge, ShoppingCart} from 'lucide-react'
import { toast } from 'sonner'
import {Product} from "@/components/lib/types";
import {useCart} from "@/components/utils/useCart";
import {Card, CardContent} from "@/components/components/ui/card";
import {Button} from "@/components/components/ui/button";


export default function ProductDetails({ product }: { product: Product }) {
    const { addItem } = useCart()

    const handleAddToCart = () => {
        try {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            })           
        } catch (error) {
            toast.error('Failed to add item to cart')
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
           
            <Card className="border-0 shadow-none">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <CardContent className="p-0 aspect-square">
                        <div className="bg-gradient-to-br from-purple-100/20 to-blue-100/20 dark:from-purple-900/10 dark:to-blue-900/10 rounded-lg h-full flex items-center justify-center">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="text-muted-foreground">[Product Image]</div>
                            )}
                        </div>
                    </CardContent>

                    {/* Product Info */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>
                    {i < Math.floor(product.rating) ? '★' : '☆'}
                  </span>
                                ))}
                            </div>
                            <Badge className="text-green-500">
                                {product.rating.toFixed(1)} ({product.reviews} reviews)
                            </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground">{product.description}</p>

                        {/* Price */}
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            ₦{product.price.toLocaleString()}
                        </div>

                        {/* Add to Cart */}
                        <Button
                            onClick={handleAddToCart}
                            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all"
                        >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </Card>
           
        </div>
    )
}