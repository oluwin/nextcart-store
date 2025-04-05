'use client'

import { usePathname } from 'next/navigation'
import {CheckoutProvider, CheckoutStepper} from "@/components/features/checkout";

// Map URL paths to step indices
const STEP_PATHS = [
    '/checkout/shipping',
    '/checkout/payment',
    '/checkout/review'
]

export default function CheckoutLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const currentStep = STEP_PATHS.findIndex(path => pathname.startsWith(path))

    return (
        <CheckoutProvider>
            <div className="container py-8">

                <CheckoutStepper currentStep={Math.max(currentStep, 0)} />


                <div
                    className="mt-8 animate-in fade-in duration-300"
                    key={pathname}
                >
                    {children}
                </div>
            </div>
        </CheckoutProvider>
    )
}