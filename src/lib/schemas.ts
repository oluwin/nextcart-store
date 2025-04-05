import { z } from 'zod'

export const shippingSchema = z.object({
    fullName: z.string().min(2),
    address: z.string().min(5),
    city: z.string().min(2),
    postalCode: z.string().regex(/^\d{5}(-\d{4})?$/),
    country: z.string().min(2)
})

export const paymentSchema = z.object({
    number: z.string()
        .min(16, "Must be at least 16 digits")
        .max(19, "Too long"),
    expiry: z.date()
        .min(new Date(new Date().setMonth(new Date().getMonth() - 1)), "Card expired"),
    cvc: z.string()
        .min(3, "At least 3 digits required")
        .max(4, "Maximum 4 digits"),
    name: z.string()
        .min(2, "Name too short")
        .max(50, "Name too long")
})