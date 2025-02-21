"use client";

import * as React from "react";
import { NavLink as Link } from "react-router";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/nav/NavigationMenu";

import Logo from "@/assets/logo/default";

const components: { title: string; href: string; description: string }[] = [
    {
      title: "Residential Monitoring",
      href: "/docs/primitives/alert-dialog",
      description:
        "Tailored solar tracking solutions designed for individual households.",
    },
    {
      title: "Commercial Rooftop Systems",
      href: "/docs/primitives/hover-card",
      description:
        "Optimized monitoring for business rooftop installations.",
    },
    {
      title: "Corporate Solar Farms",
      href: "/docs/primitives/progress",
      description:
        "Scalable solutions to efficiently manage large-scale solar farms.",
    },
    {
      title: "Industrial Installations",
      href: "/docs/primitives/scroll-area",
      description: "Robust systems built for industrial solar energy setups",
    },
    {
      title: "Off-Grid Solutions",
      href: "/docs/primitives/tabs",
      description:
        "Innovative monitoring for remote and off-grid solar applications.",
    },
    {
      title: "Community Solar Projects",
      href: "/docs/primitives/tooltip",
      description:
        "Empowering communities with shared solar energy management.",
    },
  ];
  
function MenuBar() {
    return (
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/30 to-muted/10 p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Logo />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        SolarEye
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                      Empowering your solar journey with real-time insights and seamless energy optimization. We remove the hastle from saving.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/" title="Real-Time Dashboard">
                  View live performance metrics of your solar panels at a glance.
                </ListItem>
                <ListItem href="/" title="Advanced Analytics">
                  Dive into historical data with interactive charts and detailed insights.
                </ListItem>
                <ListItem href="/" title="User Management">
                  Easily control access and customize user settings across the system.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href="/"
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
  
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  export {MenuBar};