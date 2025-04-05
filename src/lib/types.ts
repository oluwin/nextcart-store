export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    rating: number
    reviews: number
}

export interface ProductListing {
    products: Product[]
    total: number
    page: number
    limit: number
}

export interface PageBackground {
    id: string
    name: string
    image: string
}

export interface Category {
    id: string
    name: string
    slug: string
    count: number
    subcategories?: Subcategory[]
}

export interface Subcategory {
    id: string
    name: string
    slug: string
}