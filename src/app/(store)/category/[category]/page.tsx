'use client'

import { useParams } from 'next/navigation'
import { mockProducts } from '@/components/lib/constant'
import { categories } from '@/components/lib/categories'
import { slugify } from '@/components/lib/utils'
import { Suspense } from 'react'
import React from 'react'

// Dynamically import ProductCard with Suspense
const ProductCard = React.lazy(() => import('@/components/components/commons/product-card'))

export default function CategoryPage() {
    const { category: categorySlug } = useParams()
    const { subcategory: subcategorySlug } = useParams()

    // Find the current category by matching the slug
    const currentCategory = categories.find(c =>
        slugify(c.name) === categorySlug
    )

    // Find the current subcategory by matching the slug if exists
    const currentSubcategory = currentCategory?.subcategories?.find(
        sc => slugify(sc.name) === subcategorySlug
    )

    // Filter products based on category/subcategory
    const filteredProducts = mockProducts.filter(product => {
        if (subcategorySlug && currentSubcategory) {
            // For subcategory pages - match either category name or subcategory name
            return product.category === currentSubcategory.name ||
                product.category === currentSubcategory.slug
        } else if (currentCategory) {
            // For category pages - match category name or any of its subcategories
            const subcategoryNames = currentCategory.subcategories?.map(sc => sc.name) || []
            const subcategorySlugs = currentCategory.subcategories?.map(sc => sc.slug) || []

            return product.category === currentCategory.name ||
                product.category === currentCategory.slug ||
                subcategoryNames.includes(product.category) ||
                subcategorySlugs.includes(product.category)
        }
        return false
    })

    return (
        <div className="flex flex-col md:flex-row">
            <main className="flex-1 p-4 md:p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        {currentSubcategory?.name || currentCategory?.name || "Category"}
                    </h1>
                    <p className="text-gray-600">
                        {filteredProducts.length} products available
                    </p>
                </div>

                {/* Wrap with Suspense if dynamically loading ProductCard */}
                <Suspense fallback={<div>Loading products...</div>}>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No products found in this category</p>
                        </div>
                    )}
                </Suspense>
            </main>
        </div>
    )
}