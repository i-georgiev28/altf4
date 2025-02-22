import { Hero } from "@/components/heroSection";
import { Navigation } from "@/components/navigation";
import { Contact } from "@/components/contactSection";
import { Features } from "@/components/featureSection";
import { Footer } from "@/components/footerSection";

function Index() {
    return (
        <>
            <Navigation />
            <Hero />
            <Features />
            <Contact />
            <Footer />
        </>
    );
}

export {Index};