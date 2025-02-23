"use client"


import { Navigation } from "@/components/navigation";

import { SideBar } from "@/components/sideBar";
// import { TopBar } from "@/components/topBar";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
  NavbarCenter,
} from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  ComponentIcon,
  Ellipsis,
  PanelRightOpen,
  PanelLeftOpen,
  BarChart3,
  Pencil,
  Mail,
  FileText,
  User,
  Sun,
} from "lucide-react";
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { Dispatch, SetStateAction, useRef, useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { ExpandableTabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/Badge";
import Viewport from "@/components/viewport";
import { useParams } from "react-router";
import api from "@/lib/api";
function Array() {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [mode, setMode] = useState<string>("edit");
  const [totalOutput, setTotalOutput] = useState<number>(0);
  const { id: arrayId } = useParams();

  
  const [title, setTitle] = useState<string>("");
  
  useEffect(() => {
    api.get(`/arrays/${arrayId}`).then((response) => {
      console.log("Titledata:", response);
      setTitle(response.data.name);
    });
  }, [arrayId]);
  return (
    <>
      <div className="h-screen flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden">
        <SideBar isOpen={isSideBarOpen} setOpen={setSideBarOpen} />
        <div className="flex flex-1">
          <div className="px-2 pb-6 md:px-10 rounded-tl-2xl flex flex-col gap-2 flex-1 w-full h-full">
            <TopBar 
              isOpen={isSideBarOpen} 
              mode={mode} 
              setMode={setMode} 
              setOpen={setSideBarOpen}
              totalOutput={totalOutput}
              setTotalOutput={setTotalOutput}
              title={title}
              setTitle={setTitle}
            />
            <Viewport mode={mode} totalOutput={totalOutput} setTotalOutput={setTotalOutput} arrayId={arrayId!} setTitle={setTitle} />
          </div>
        </div>
      </div>
    </>
  );
}

const Breadcrumb = ({ title, setTitle }: { title: string, setTitle: (title: string) => void }) => {
  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/arrays" className="inline-flex items-center gap-1.5">
            <HomeIcon size={16} aria-hidden="true" />
            {/* Home */}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/arrays" className="inline-flex items-center gap-1.5">
            <ComponentIcon size={16} aria-hidden="true" />
            My Arrays
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="">{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
}

interface TopBarProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  totalOutput: number;
  setTotalOutput: Dispatch<SetStateAction<number>>;
  title: string;
  setTitle: (title: string) => void;
}

type TabItem =
  | { title: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }
  | { type: "separator" };

const TopBar: React.FC<TopBarProps> = ({ isOpen, setOpen, mode, setMode, totalOutput, setTotalOutput, title, setTitle }) => {
  const tabs: TabItem[] = [
    { title: "View", icon: BarChart3 },
    { type: "separator" },
    { title: "Edit", icon: Pencil },
  ];

  const toggleSidebar = () => {
    setOpen(prevState => !prevState);
  };

  const handleModeChange = (index: number | null) => {
    if (index === 0) {
      setMode("view");
    } else if (index === 2) {
      setMode("edit");
    }
  };

  const activeTabIndex = mode === "view" ? 0 : 2;


  return (
    <header className="sticky gap-4 top-0 z-50 md:pl-4 md:pr-8 border-b-2 border-slate-100 items-center justify-center">
      <NavbarComponent>
        <NavbarLeft className="px-6 h-full">
          <button
            onClick={toggleSidebar}
            className="text-zinc-500 h-6 w-6 text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30"
          >
            {isOpen ? <PanelLeftOpen /> : <PanelRightOpen />}
          </button>
          {/* seperator */}
          <div className="inline-block mx-2 self-center h-[2em] w-[0.1em] bg-black/5"></div>
          {/* /seperator */}
          <button className="text-zinc-500 h-6 w-6 text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30">
            <ChevronLeft />
          </button>
          <button
            disabled
            className="text-zinc-500 text-secondary-foreground hover:bg-secondary/80 h-6 w-6 -mx-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight />
          </button>
          {/* seperator */}
          <div className="inline-block mx-2 self-center h-[2em] w-[0.1em] bg-black/5"></div>
          {/* /seperator */}
          <Breadcrumb title={title} setTitle={setTitle} />
        </NavbarLeft>
        <NavbarCenter>
          <ExpandableTabs
            tabs={tabs}
            activeColor="text-amber-500"
            className="border-blue-200"
            activeTab={activeTabIndex}
            onTabChange={handleModeChange}
          />
        </NavbarCenter>

        <NavbarRight className="flex">
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <span>{totalOutput} W</span>
          </Badge>
        </NavbarRight>
      </NavbarComponent>
    </header>
  );
};
export { Array };

