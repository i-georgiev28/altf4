// import CountBtn from "@/components/count-btn";
// import ReactSVG from "@/assets/react.svg";
// import { Badge } from "@/components/ui/badge";

import { Hero } from '@/components/section/landing/Hero';
import { Navigation } from '@/components/section/landing/Navigation';
import {Contact} from '@/components/section/landing/Contact';
import {Footer} from '@/components/section/landing/Footer';
import { FeatureSteps } from '@/components/section/landing/feature-section';
// import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { BentoGridSecondDemo } from '@/components/section/landing/BendoGrid';
// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
// ); 

const features = [
  { 
    step: 'Step 1', 
    title: 'Learn the Basics',
    content: 'Start your Web3 journey by learning the basics of blockchain.', 
    image: 'https://images.unsplash.com/photo-1723958929247-ef054b525153?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    step: 'Step 2',
    title: 'Deep Dive',
    content: 'Dive deep into blockchain fundamentals and smart contract development.',
    image: 'https://images.unsplash.com/photo-1723931464622-b7df7c71e380?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    step: 'Step 3',
    title: 'Build Projects',
    content: 'Graduate with hands-on Web3 experience through building decentralized applications.',
    image: 'https://images.unsplash.com/photo-1725961476494-efa87ae3106a?q=80&w=2070&auto=format&fit=crop'
  },
]

function Landing() {
  return (
    <>
    <Navigation />
    <Hero />
    <BentoGridSecondDemo />
    <FeatureSteps 
      features={features}
      title = "Features"
      autoPlayInterval={3500}
      imageHeight="h-[500px]"
    />
    <Contact />
    <Footer />
    </>
  );
}

export default Landing;
