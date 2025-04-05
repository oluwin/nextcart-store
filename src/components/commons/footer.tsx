import Link from "next/link"
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    GithubIcon,
    LinkedinIcon
} from "lucide-react"
import { Button } from "@/components/components/ui/button"
import { Separator } from "@/components/components/ui/separator"
import { Input } from "@/components/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/components/ui/card"

export function Footer() {
    return (
        <footer className="bg-background border-t mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-cyan-800">NextCart</h3>
                        <p className="text-muted-foreground">
                            Your favorite e-commerce platform for modern shopping experiences.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon">
                                <FacebookIcon className="h-5 w-5 text-cyan-600" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <InstagramIcon className="h-5 w-5 text-cyan-600" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <TwitterIcon className="h-5 w-5 text-cyan-600" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Button asChild variant="link" className="px-0 text-muted-foreground">
                                    <Link href="/products">Products</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild variant="link" className="px-0 text-muted-foreground">
                                    <Link href="/about">About Us</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild variant="link" className="px-0 text-muted-foreground">
                                    <Link href="/contact">Contact</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild variant="link" className="px-0 text-muted-foreground">
                                    <Link href="/blog">Blog</Link>
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Customer Service</h4>
                        <ul className="space-y-2">
                            <li>
                                <Button asChild variant="link" className="px-0 text-muted-foreground">
                                    <Link href="/faq">FAQ</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild variant="link" className="px-0 text-muted-foreground">
                                    <Link href="/shipping">Shipping Policy</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild variant="link" className="px-0 text-muted-foreground">
                                    <Link href="/returns">Returns & Refunds</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild variant="link" className="px-0 text-muted-foreground">
                                    <Link href="/privacy">Privacy Policy</Link>
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <Card className="border-0 shadow-none">
                        <CardHeader>
                            <CardTitle>Newsletter</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Subscribe to get updates on new products and special offers.
                            </p>
                            <div className="flex space-x-2">
                                <Input placeholder="Your email" />
                                <Button className="bg-gradient-to-r from-cyan-600 to-green-500 hover:from-cyan-700
                                hover:to-green-600 transition-all">Subscribe</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} NextCart. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Button asChild variant="link" className="px-0 text-muted-foreground text-sm">
                            <Link href="/terms">Terms of Service</Link>
                        </Button>
                        <Button asChild variant="link" className="px-0 text-muted-foreground text-sm">
                            <Link href="/privacy">Privacy Policy</Link>
                        </Button>
                        <Button asChild variant="link" className="px-0 text-muted-foreground text-sm">
                            <Link href="/cookies">Cookie Policy</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}