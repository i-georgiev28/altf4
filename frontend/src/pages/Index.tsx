import { Hero } from "@/components/heroSection";
import { Navigation } from "@/components/navigation";
import { Contact } from "@/components/contactSection";
import { AboutUs } from "@/components/aboutUsSection";
import { Footer } from "@/components/footerSection";

function Index() {
    return (
        <>
            <Navigation />
            <Hero />
            <AboutUs />
            <Contact />
            <Footer />
        </>
    );
}

export {Index};