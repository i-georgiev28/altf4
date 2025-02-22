import * as React from "react";
import { cn } from "@/lib/utils";

const NavBar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      className={cn("flex items-center justify-between py-2", className)}
      {...props}
      ref={ref}
    />
  )
);
NavBar.displayName = "Navbar";

const NavBarLeft = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav
    className={cn("flex items-center gap-4 justify-start", className)}
    {...props}
    ref={ref}
  />
));
NavBarLeft.displayName = "NavbarLeft";

const NavBarRight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav
    className={cn("flex items-center gap-4 justify-end", className)}
    {...props}
    ref={ref}
  />
));
NavBarRight.displayName = "NavbarRight";

const NavBarCenter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav
    className={cn("flex items-center gap-4 justify-center", className)}
    {...props}
    ref={ref}
  />
));
NavBarCenter.displayName = "NavbarCenter";

export { NavBar, NavBarLeft, NavBarRight, NavBarCenter};
