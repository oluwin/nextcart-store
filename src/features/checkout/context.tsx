'use client'

import { createContext, useContext, useState } from 'react'
import {z} from "zod";
import {shippingSchema} from "@/components/lib/schemas";

type CardDetails = {
    number: string
    expiry: string
    cvc: string
    name: string
}


type CheckoutData = {
    shipping: z.infer<typeof shippingSchema> // Reuse shipping schema
    payment: {
        method: 'card' | 'paypal'
        card?: {
            number: string
            expiry: string
            cvc: string
        }
    }
}

const CheckoutContext = createContext<{
    data: CheckoutData
    setData: React.Dispatch<React.SetStateAction<CheckoutData>>
    currentStep: number
    setCurrentStep: (step: number) => void
}>(null!)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<CheckoutData>({} as CheckoutData)
    const [currentStep, setCurrentStep] = useState(0)

    return (
        <CheckoutContext.Provider value={{ data, setData, currentStep, setCurrentStep }}>
    {children}
    </CheckoutContext.Provider>
)
}

export function useCheckout() {
    const context = useContext(CheckoutContext)
    if (!context) throw new Error('useCheckout must be used within CheckoutProvider')
    return context
}