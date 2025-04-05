'use client'

import { Product } from '@/components/lib/types'
import Link from 'next/link'
import { useCart } from '@/components/utils/useCart'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/components/ui/card'
import { Badge } from '@/components/components/ui/badge'
import { toast } from 'sonner'

export default function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart()

    const handleAddToCart = () => {
        try {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
            // toast.success(`${product.name} added to cart`, {
            //     style: {
            //         background: 'linear-gradient(45deg, rgba(79,0,146,1) 10%, rgba(156,255,161,1) 50%, rgba(48,205,255,1) 90%)',
            //         color: 'white',
            //         border: 'none'
            //     }
            // });
        } catch (error) {
            toast.error('Failed to add item to cart');
        }
    };

    return (
        <Card className="hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group h-full flex flex-col bg-white dark:bg-gray-900">
            <Link href={`/products/${product.id}`} className="flex-grow">
                <CardHeader className="p-0 relative">
                    <div className="aspect-square bg-gradient-to-br from-purple-900/10 via-emerald-100 to-cyan-200 dark:from-purple-900/20 dark:via-emerald-900/20 dark:to-cyan-900/20 rounded-t-lg overflow-hidden relative">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                <div className="bg-gradient-to-br from-purple-900/5 via-emerald-100/10 to-cyan-200/10 dark:from-purple-900/10 dark:via-emerald-900/10 dark:to-cyan-900/10 w-full h-full flex items-center justify-center">
                                    [Product Image]
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-1 text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <span key={i}>
                                    {i < Math.floor(product.rating) ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                        <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-purple-900/10 via-emerald-500/10 to-cyan-500/10 text-purple-800 dark:text-purple-200 border-purple-300/50 dark:border-purple-500/30">
                            {product.rating.toFixed(1)}
                        </Badge>
                    </div>
                </CardContent>
            </Link>
            <CardFooter className="flex justify-between items-center p-4 pt-0 bg-gradient-to-r from-[#4f0092] via-[#9cffa1] to-[#30cdff] border-t border-gray-100 dark:border-gray-700">
                <span className="font-bold text-lg text-white drop-shadow-md">
                    ₦{product.price.toLocaleString()}
                </span>
                <Button
                    size="icon"
                    className="bg-white/90 text-gray-900 hover:bg-white shadow-lg hover:shadow-purple-500/30 transition-all backdrop-blur-sm"
                    onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart();
                    }}
                    aria-label={`Add ${product.name} to cart`}
                >
                    <ShoppingCart className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}