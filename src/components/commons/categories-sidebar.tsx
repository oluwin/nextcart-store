'use client'

import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { categories } from '@/components/lib/categories'
import { useState } from "react"
import { slugify } from '@/components/lib/utils' // You'll need to implement this

export function CategoriesSidebar() {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
    const pathname = usePathname()

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }))
    }

    // Function to generate URL-friendly slugs
    const generatePath = (categoryName: string, subcategoryName?: string) => {
        const categorySlug = slugify(categoryName)
        if (!subcategoryName) return `/category/${categorySlug}`
        return `/category/${categorySlug}/${slugify(subcategoryName)}`
    }

    return (
        <div className="w-full md:w-64 border-r h-full">
            <div className="p-4 border-b sticky top-0 bg-white z-10">
                <h2 className="font-semibold text-cyan-800">Categories</h2>
            </div>

            <nav className="p-2">
                {categories.map(category => {
                    const currentPath = generatePath(category.name)
                    const isCategoryActive = pathname.startsWith(currentPath)

                    return (
                        <div key={category.id} className="mb-1 last:mb-0">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <Link
                                    href={currentPath}
                                    className={`flex-1 ${isCategoryActive ? 'font-medium' : ''}`}
                                >
                                    {category.name}
                                </Link>

                                {category.subcategories?.length ? (
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="p-1"
                                        aria-label={`Toggle ${category.name}`}
                                    >
                                        {expandedCategories[category.id] ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4" />
                                        )}
                                    </button>
                                ) : null}
                            </div>

                            {expandedCategories[category.id] && category.subcategories?.length && (
                                <div className="ml-4 pl-2 border-l">
                                    {category.subcategories.map(subcategory => {
                                        const subcategoryPath = generatePath(category.name, subcategory.name)
                                        return (
                                            <Link
                                                key={subcategory.id}
                                                href={subcategoryPath}
                                                className={`block p-2 hover:bg-gray-50 rounded ${pathname === subcategoryPath ? 'font-medium bg-gray-100' : ''}`}
                                            >
                                                {subcategory.name}
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>
        </div>
    )
}