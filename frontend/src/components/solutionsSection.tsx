import { HoverEffect } from "@/components/ui/hover-effect"

export function Solutions() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
} 
export const projects = [
  {
    title: "Residential Monitoring",
    description:
      "Tailored solar tracking solutions that allow homeowners to monitor energy production, optimize usage, and reduce costs with real-time insights.",
    link: "",
  },
  {
    title: "Comercial Rooftop Systems",
    description:
      "Advanced monitoring for businesses, ensuring efficient solar energy management, cost savings, and optimal system performance for rooftop installations.",
    link: "",
  },
  {
    title: "Corporate Solar Farms",
    description:
      "Scalable solutions for managing large solar farms, providing real-time tracking, predictive maintenance, and performance optimization.",
    link: "",
  },
  {
    title: "Industrial installations",
    description:
      "Robust monitoring systems designed for industrial-scale solar energy setups, ensuring efficiency, reliability, and maximum energy output.",
    link: "",
  },
  {
    title: "Off-Grid Solutions",
    description:
      "Innovative tracking for remote and off-grid solar applications, ensuring energy reliability in areas without traditional power access.",
    link: "",
  },
  {
    title: "Community Solar Projects",
    description:
      "Empowering communities with shared solar management, enabling efficient energy distribution and cost-effective sustainable power solutions.",
    link: "",
  },
];
