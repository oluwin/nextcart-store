import {LandingPage} from "@/components/components/landing-page";
import {Header, Footer} from "@/components/components/commons";

export default function Home() {
    return (
        <div>
            <Header />
            <div className="flex">
                <div className="flex-1">
                    <LandingPage/>
                </div>
            </div>
            <Footer />
        </div>
    )
}