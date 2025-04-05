'use client'

import Link from 'next/link'
import { ShoppingCart, User, Menu } from 'lucide-react'
import { Badge } from '@/components/components/ui/badge'
import { Button } from "@/components/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/components/ui/dropdown-menu"
import { useState } from 'react'
import { cn } from "@/components/lib/utils"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useCartStore } from "@/components/stores/cart-store"
import {useAuthStore} from "@/components/stores/auth-store";


export function Header() {
    const router = useRouter()
    const { items } = useCartStore()
    const { isLoggedIn, logout } = useAuthStore()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navLinks = [
        { name: "Products", href: "/products" },
        { name: "About", href: "/about",  active: false },
        { name: "Contact", href: "/contact", active: false }
    ]

    const handleLogout = () => {
        logout()
        router.push('/login')
        toast.success('You have been logged out')
        setMobileMenuOpen(false)
    }

    const userMenuItems = [
        ...(isLoggedIn
            ? [
                {
                    name: "My Account",
                    href: "/account",
                    active:false,
                    onClick: () => setMobileMenuOpen(false)
                },
                {
                    name: "Logout",
                    onClick: handleLogout
                }
            ]
            : [
                {
                    name: "Login",
                    href: "/login",
                    onClick: () => setMobileMenuOpen(false)
                }
            ]),
        ...(isLoggedIn ? [] : [
            {
                name: "Register",
                href: "/register",
                onClick: () => setMobileMenuOpen(false)
            }
        ])
    ]

    const handleCheckoutClick = (e: React.MouseEvent) => {
        if (items.length === 0) {
            e.preventDefault()
            toast.warning('Your cart is empty. Please add items before checkout.')
            router.push('/cart')
        }
    }

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-cyan-800">NextCart</span>
                    </Link>

                    {/* Desktop navigation and right-aligned menus */}
                    <div className="flex items-center gap-4">
                        {/* Desktop navigation - moved to right */}
                        <nav className="hidden md:flex items-center gap-2">
                            {navLinks.map((link) => (
                                <Button key={link.href} asChild variant="ghost">
                                    <Link href={link.href}>
                                        {link.name}
                                    </Link>
                                </Button>
                            ))}
                        </nav>

                        {/* Right side icons */}
                        <div className="flex items-center gap-2">
                            {/* User account dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                        <span className="sr-only">User account</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {userMenuItems.map((item, index) => (
                                        <div key={item.name}>
                                            {item.href ? (
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={item.href}
                                                        className="w-full"
                                                        onClick={item.onClick}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem
                                                    onClick={item.onClick}
                                                    className="w-full cursor-pointer"
                                                >
                                                    {item.name}
                                                </DropdownMenuItem>
                                            )}
                                            {index < userMenuItems.length - 1 && (
                                                <DropdownMenuSeparator />
                                            )}
                                        </div>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Cart dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative">
                                        <ShoppingCart className="h-5 w-5" />
                                        {items.length > 0 && (
                                            <Badge
                                                className={cn(
                                                    "absolute -right-2 -top-2 h-5 w-5 justify-center p-0",
                                                    "bg-gradient-to-r from-cyan-600 to-green-500",
                                                    "hover:from-cyan-700 hover:to-green-600 transition-all"
                                                )}
                                            >
                                                {items.length}
                                            </Badge>
                                        )}
                                        <span className="sr-only">Shopping cart</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href="/cart" className="w-full">
                                            View Cart
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        disabled={items.length === 0}
                                        className={items.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
                                    >
                                        <div>
                                            <Link
                                                href={items.length > 0 ? "/checkout" : "#"}
                                                onClick={handleCheckoutClick}
                                                className="w-full"
                                            >
                                                Checkout
                                                {items.length === 0 && (
                                                    <span className="ml-2 text-xs text-gray-500">(Empty)</span>
                                                )}
                                            </Link>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Mobile menu button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={cn(
                    "md:hidden",
                    mobileMenuOpen ? "block" : "hidden"
                )}>
                    <div className="space-y-1 pb-3 pt-2">
                        {navLinks.map((link) => (
                            <Button
                                key={link.href}
                                asChild
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Link href={link.href}>
                                    {link.name}
                                </Link>
                            </Button>
                        ))}

                        {/* Mobile Cart Links */}
                        <div className="border-t pt-2 mt-2">
                            <Button
                                asChild
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Link href="/cart">
                                    View Cart
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                                className="w-full justify-start"
                                disabled={items.length === 0}
                                onClick={(e) => {
                                    if (items.length === 0) {
                                        e.preventDefault()
                                        toast.warning('Your cart is empty. Please add items before checkout.')
                                        router.push('/cart')
                                        setMobileMenuOpen(false)
                                    } else {
                                        setMobileMenuOpen(false)
                                    }
                                }}
                            >
                                <Link
                                    href={items.length > 0 ? "/checkout" : "#"}
                                    className={items.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
                                >
                                    Checkout
                                    {items.length === 0 && (
                                        <span className="ml-2 text-xs text-gray-500">(Empty)</span>
                                    )}
                                </Link>
                            </Button>
                        </div>

                        {/* Mobile User Links */}
                        <div className="border-t pt-2 mt-2">
                            {userMenuItems.map((item) => (
                                item.href ? (
                                    <Button
                                        key={item.name}
                                        asChild
                                        variant="ghost"
                                        className="w-full justify-start"
                                        onClick={item.onClick}
                                    >
                                        <Link href={item.href}>
                                            {item.name}
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button
                                        key={item.name}
                                        variant="ghost"
                                        className="w-full justify-start"
                                        onClick={item.onClick}
                                    >
                                        {item.name}
                                    </Button>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}