import { useEffect, useMemo, useState } from "react";
import { MoveRight, PhoneCall } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { SignUp } from "@/components/authDialog";
import { BackgroundAnimation } from "@/components/ui/Background-Animation";

function Hero() {
    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(() => ["easy", "fast", "efficient", "effortless",], []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
            <BackgroundAnimation />

            <div className="container mx-auto relative z-10">
                <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
                    <div>
                        <Button variant="secondary" size="sm" className="gap-4">
                            Read our launch article <MoveRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex gap-4 flex-col">
                        <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                            <span className="text-spektr-cyan-50">Solar energy made</span>
                            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                                &nbsp;
                                {titles.map((title, index) => (
                                    <motion.span
                                        key={index}
                                        className="absolute font-semibold"
                                        initial={{ opacity: 0, y: "-100" }}
                                        transition={{ type: "spring", stiffness: 50 }}
                                        animate={titleNumber === index ? { y: 0, opacity: 1 } : { y: titleNumber > index ? -150 : 150, opacity: 0 }}
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                            Managing a small business today is already tough. Avoid further
                            complications by ditching outdated, tedious trade methods. Our
                            goal is to streamline SMB trade, making it easier and faster than ever.
                        </p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Button size="lg" className="gap-4" variant="outline">
                            Jump on a call <PhoneCall className="w-4 h-4" />
                        </Button>
                        <SignUp>
                            <Button size="lg" className="gap-4">
                                Sign up here <MoveRight className="w-4 h-4" />
                            </Button>
                        </SignUp>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Hero };