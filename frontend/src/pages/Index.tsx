import { Hero } from "@/components/heroSection";
import { Navigation } from "@/components/navigation";
import { Contact } from "@/components/contactSection";
import { AboutUs } from "@/components/aboutUsSection";
import { Footer } from "@/components/footerSection";
import { Features } from "@/components/featuresSection";
import { Solutions } from "@/components/solutionsSection";
function Index() {
    return (
        <>
            <Navigation />
            <Hero />
            <Features/>
            <Solutions/>
            <AboutUs />
            <Contact />
            <Footer />
        </>
    );
}

export {Index};