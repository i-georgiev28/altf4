"use client";

import {
  Navbar as NavBarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { SignUp, SignIn } from "@/components/authDialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

import Logo from "@/assets/logo";
import { useAuth } from "@/provider/authProvider";

function Navigation() {
  const {token, setToken } = useAuth();
  const handleClick = () => {
    setToken(null);
  };

  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
      <div className="relative mx-auto max-w-container">
        <NavBarComponent>
          <NavbarLeft>
            <a href="/" className="flex items-center gap-2 text-xl font-bold">
              <Logo className="w-8 h-8" />
              SunSight
            </a>
            <MenuBar />
          </NavbarLeft>
          <NavbarRight>
            {token === null ? (
              <>
            <SignIn>
              <Button variant="outline">Sign in</Button>
            </SignIn>
            <SignUp>
              <Button variant="default">Sign up</Button>
            </SignUp>
              </>
            ) : (
              <>
              <Button variant="outline" onClick={handleClick}>logout</Button>
              <a href="/fields">
                <Button variant="default">Dashboard</Button>
              </a>
              </>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white" side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <button className="flex items-center gap-2 text-xl font-bold">
                    <span>SunSight</span>
                  </button>
                  <button className="text-muted-foreground hover:text-foreground">
                    Getting Started
                  </button>
                  <button className="text-muted-foreground hover:text-foreground">
                    Components
                  </button>
                  <button className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavBarComponent>
      </div>
    </header>
  );
}

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
    description: "Optimized monitoring for business rooftop installations.",
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
    description: "Empowering communities with shared solar energy management.",
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
                  <button className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/30 to-muted/10 p-6 no-underline outline-none focus:shadow-md">
                    <Logo />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      SolarEye
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Empowering your solar journey with real-time insights and
                      seamless energy optimization. We remove the hastle from
                      saving.
                    </p>
                  </button>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="Real-Time Dashboard">
                View live performance metrics of your solar panels at a glance.
              </ListItem>
              <ListItem href="/" title="Advanced Analytics">
                Dive into historical data with interactive charts and detailed
                insights.
              </ListItem>
              <ListItem href="/" title="User Management">
                Easily control access and customize user settings across the
                system.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component, idx) => (
                <ListItem key={idx} title={component.title} href="/">
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <button>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <button>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </button>
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

export { Navigation };
