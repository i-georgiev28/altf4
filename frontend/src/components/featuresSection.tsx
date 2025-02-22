// import { cn } from "@/lib/utils";
// import React from "react";
import Logo from "@/assets/logo";
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid";
import { image } from "@heroui/react";
import { ImageIcon } from "lucide-react";

export function Features() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "Real time dashbord",
    description: "With aur app you can monitir all of yor solar panels and track their specs.",
    header: <img src="/public/" />,
    className: "md:col-span-2",
  },
  {
    title: "SolarEye",
    description: "We live in the future, let the future live with you!",
    header: <Logo />,
    className: "md:col-span-1",
  },
  {
    title: "Advanced analytics",
    description: "With aur thnology you can chek easy for bugs or underwatig in the system.",
    header: <Skeleton />,
    className: "md:col-span-1",
  },
  {
    title: "User manigment",
    description: "You can make your oun filds with solar panels directly with aur software.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
];
