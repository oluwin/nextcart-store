import {CategoriesSidebar, ThemeProvider} from "@/components/components/commons"
import {Header, Footer} from "@/components/components/commons"
import {AuthProvider} from "@/components/providers/auth-provider";

export default function MainLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Header/>

            <div className="flex flex-1">
                <div className="hidden md:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-r">
                    <CategoriesSidebar/>
                </div>

                {/* Main content area */}
                <main className="flex-1 p-2">
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </main>
            </div>
            <Footer/>
        </ThemeProvider>
    )
}