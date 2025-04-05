'use client'

import {useCheckout} from '@/components/features/checkout'
import {useCartStore} from "@/components/stores/cart-store";
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {Button} from '@/components/components/ui/button'
import {Loader2} from 'lucide-react'
import {useCart} from "@/components/utils/useCart";


export default function SuccessPage() {
    const {data} = useCheckout()
    const clearCart = useCartStore((state) => state.clearCart)
    const [isClearing, setIsClearing] = useState(false)
    const {
        totalPrice,
    } = useCart()

    useEffect(() => {
        const clearCartAfterPurchase = async () => {
            try {
                setIsClearing(true)
                await new Promise(resolve => setTimeout(resolve, 500)) // Small delay for UX
                clearCart()
            } catch (error) {
                console.error('Failed to clear cart:', error)
            } finally {
                setIsClearing(false)
            }
        }

        clearCartAfterPurchase()
    }, [clearCart])

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-12 w-12 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Order Confirmed!
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                    Thank you for your purchase! Your order has been received.
                </p>

                <div className="bg-gray-50 p-4 rounded-md mb-8">
                    <p className="text-gray-700">
                        Payment method: Card ending in {data.payment?.card?.number.slice(-4)}
                    </p>
                    <p className="text-gray-700 mt-2">
                        Order total: ₦{totalPrice?.toLocaleString()}
                    </p>
                </div>

                {isClearing ? (
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin"/>
                        <span>Finalizing your order...</span>
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/#" passHref>
                            <Button variant="outline" className="w-full sm:w-auto">
                                View Order History
                            </Button>
                        </Link>
                        <Link href="/products" passHref>
                            <Button className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-green-500 hover:from-cyan-700
                                hover:to-green-600 transition-all">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}