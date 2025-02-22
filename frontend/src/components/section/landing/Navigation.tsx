"use client";

import SignIn from "@/components/section/landing/SignIn";
import SignUp from "@/components/section/landing/SignUp";
// import { LogIn } from "@/components/section/app/LogIn";

import {
  NavBar as NavBarComponent,
  NavBarLeft,
  NavBarRight,
} from "@/components/ui/nav/NavBar";
import { NavButton as Button } from "@/components/ui/nav/NavButton";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/nav/Sheet";

import { Menu } from "lucide-react";
import Logo from "@/assets/Logo";

import { MenuBar } from "@/components/section/landing/MenuBar";

function Navigation() {
  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
      <div className="relative mx-auto max-w-container">
        <NavBarComponent>
          <NavBarLeft>
            <a href="/" className="flex items-center gap-2 text-xl font-bold">
              <Logo className="w-8 h-8" />
              SunSight
            </a>
            <MenuBar />
          </NavBarLeft>
          <NavBarRight>
            <SignIn>
              <Button variant="outline">Sign in</Button>
            </SignIn>
            <SignUp>
              <Button variant="default">Sign up</Button>
            </SignUp>
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
                  <a
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>SunSight</span>
                  </a>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Getting Started
                  </a>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Components
                  </a>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </NavBarRight>
        </NavBarComponent>
      </div>
    </header>
  );
}

export { Navigation };
