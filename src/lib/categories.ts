import { Category } from './types';

export const categories: Category[] = [
    {
        id: "1",
        name: "Electronics",
        slug: "electronics",
        count: 120
    },
    {
        id: "2",
        name: "Home Appliances",
        slug: "home-appliances",
        count: 80,
        subcategories: [
            {
                id: "3",
                name: "Kitchen Appliances",
                slug: "kitchen-appliances",
            },
            {
                id: "4",
                name: "Cleaning Appliances",
                slug: "cleaning-appliances",
            }
        ]
    },
    {
        id: "5",
        name: "Security Systems",
        slug: "security-systems",
        count: 50
    },
    {
        id: "6",
        name: "Metering Solutions",
        slug: "metering-solutions",
        count: 100,
    },
    {
        id: "7",
        name: "Clothing",
        slug: "clothing",
        count: 200
    },
    {
        id: "8",
        name: "Health & Beauty",
        slug: "health-beauty",
        count: 110,
        subcategories: [
            {
                id: "9",
                name: "Skincare",
                slug: "skincare",
            },
            {
                id: "10",
                name: "Makeup",
                slug: "makeup",
            }
        ]
    },
    {
        id: "11",
        name: "Construction Materials",
        slug: "construction-materials",
        count: 75
    },
    {
        id: "12",
        name: "Electrical Equipment",
        slug: "electrical-equipment",
        count: 60
    },
    {
        id: "13",
        name: "Safety Equipment",
        slug: "safety-equipment",
        count: 45
    },
    {
        id: "14",
        name: "Communication Devices",
        slug: "communication-devices",
        count: 55
    },
    {
        id: "15",
        name: "Sports",
        slug: "sports",
        count: 84
    },
    {
        id: "16",
        name: "Accessories",
        slug: "accessories",
        count: 105
    }
];