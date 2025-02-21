"use client";

import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/nav/NavBar";
import { NavButton as Button } from "@/components/ui/nav/NavButton";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/nav/Sheet";

import { Menu } from "lucide-react";
import Logo from "@/assets/logo/default";

import {MenuBar} from '@/components/section/MenuBar';



function Navigation() {
  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
      <div className="relative mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            <a href="/" className="flex items-center gap-2 text-xl font-bold">
              <Logo />
              Launch UI
            </a>
            <MenuBar />
          </NavbarLeft>
          <NavbarRight>
            <a href="/" className="hidden text-sm md:block">
              Sign in
            </a>
            <Button variant="default" asChild>
              <a href="/">Get Started</a>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a href="/" className="flex items-center gap-2 text-xl font-bold">
                    <span>Launch UI</span>
                  </a>
                  <a href="/" className="text-muted-foreground hover:text-foreground">
                    Getting Started
                  </a>
                  <a href="/" className="text-muted-foreground hover:text-foreground">
                    Components
                  </a>
                  <a href="/" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}

export { Navigation };
