'use client'

import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/components/ui/card'
import { Badge } from '@/components/components/ui/badge'
import { Input } from '@/components/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/components/ui/select'
import { Separator } from '@/components/components/ui/separator'
import { toast } from 'sonner'
import {useCart} from "@/components/utils/useCart";

export default function CartPage() {
    const {
        items,
        totalItems,
        totalPrice,
        removeItem,
        updateQuantity,
        clearCart,
    } = useCart()

    const handleClearCart = () => {
        clearCart()
        toast.success('Cart cleared', {
            style: {
                background: 'linear-gradient(45deg, #4f0092 10%, #9cffa1 50%, #30cdff 90%)',
                color: 'white',
                border: 'none'
            }
        })
    }

    if (totalItems === 0) {
        return (
            <div className="py-12 text-center">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Your cart is empty</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="link" className="text-primary">
                            <Link href="/products" className="flex items-center">
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Continue shopping
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="py-8 container">
            <h1 className="text-3xl font-bold mb-8">Your Cart <Badge className="ml-2 bg-gradient-to-r from-purple-600
            to-blue-500 hover:from-purple-700 hover:to-blue-600">{totalItems} items</Badge></h1>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.id} className="p-4">
                            <div className="flex gap-4">
                                <div className="bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-lg w-24 h-24 flex-shrink-0 flex items-center justify-center">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <span className="text-muted-foreground text-xs">[Image]</span>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-muted-foreground">₦{item.price.toLocaleString()}</p>
                                    <div className="mt-2 flex items-center gap-4">
                                        <Select
                                            value={item.quantity.toString()}
                                            onValueChange={(value) => updateQuantity(item.id, Number(value))}
                                        >
                                            <SelectTrigger className="w-20">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[...Array(10).keys()].map((num) => (
                                                    <SelectItem key={num + 1} value={(num + 1).toString()}>
                                                        {num + 1}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                removeItem(item.id)
                                                toast.error(`${item.name} removed from cart`)
                                            }}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="font-bold text-cyan-700">
                                    ₦{(item.price * item.quantity).toLocaleString()}
                                </div>
                            </div>
                        </Card>
                    ))}

                    <Button
                        variant="outline"
                        onClick={handleClearCart}
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear cart
                    </Button>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₦{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg text-cyan-700">
                                    <span>Total</span>
                                    <span>₦{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                            <Button
                                asChild
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                            >
                                <Link href="/checkout">
                                    Proceed to Checkout
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}