import type {Metadata} from "next"
import {Geist, Geist_Mono} from "next/font/google"
import "./globals.css"
import {ToastProvider} from "@/components/components/toaster"
import {AuthProvider} from "@/components/providers/auth-provider";
import {ThemeProvider} from "@/components/components/commons";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "NextCart - Your Online Store",
    description: "Discover amazing products at unbeatable prices",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>

            {/* Main content area */}
            <main className="flex-1">
                <AuthProvider>
                    {children}
                </AuthProvider>
            </main>
            <ToastProvider/>

        </body>
        </html>
    )
}