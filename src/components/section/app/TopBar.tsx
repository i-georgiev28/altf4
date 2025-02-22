import {
  NavBar as NavBarComponent,
  NavBarLeft,
  NavBarRight,
} from "@/components/ui/nav/NavBar";
import { Button } from "@/components/ui/ButtonOld";
import { Separator } from "@/components/ui/Seperator";
import { ChevronLeft, ChevronRight, HomeIcon, ComponentIcon, Ellipsis } from "lucide-react";
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/Avatar"

function Breadcrumb() {
  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
            <HomeIcon size={16} aria-hidden="true" />
            {/* Home */}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
            <ComponentIcon size={16} aria-hidden="true" />
            My Arrays
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="">Razgrad</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
}

function TopBar() {
  return (
    <header className="sticky gap-4 top-0 z-50 md:pl-4 md:pr-8 border-b-2 border-slate-100 items-center justify-center">
      <NavBarComponent>
        <NavBarLeft className="px-6 h-full">
          <button className="text-zinc-500 h-6 w-6 text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30">
            <ChevronLeft />
          </button>
          <button disabled className="text-zinc-500 text-secondary-foreground hover:bg-secondary/80 h-6 w-6 -mx-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30">
            <ChevronRight />
          </button>
          {/* seperator */}
          <div className="inline-block mx-2 self-center h-[2em] w-[0.1em] bg-black/5"></div>
          {/* /seperator */}
          <Breadcrumb />
        </NavBarLeft>
        {/* <NavBarRight className="flex">

          <button className="text-zinc-500 px-4 py-1 text-secondary-foreground hover:bg-secondary/80 gap-4 flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Ellipsis />
            <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>
        </NavBarRight> */}
      </NavBarComponent>
    </header>
  );
}

export { TopBar };
