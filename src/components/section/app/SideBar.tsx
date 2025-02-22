import { Layers, CircleGauge, LayoutPanelTop, Settings } from "lucide-react";
import { Sidebar as SideBarComponent, SidebarBody, SidebarLink } from "@/components/ui/SideBar";

import Logo from "@/assets/logo/default";

import React, { Dispatch, SetStateAction } from 'react';

interface SideBarProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, setOpen }) => {
    return (
        <SideBarComponent open={isOpen} setOpen={setOpen}>
        <SidebarBody className="ml-10 bg-gray-100 justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <h1>Logo</h1> : <Logo />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </SideBarComponent>
    );
}

const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <Layers className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "History",
      href: "#",
      icon: (
        <CircleGauge className="text-neutral-700  h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "#",
      icon: (
        <LayoutPanelTop className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

export { SideBar };
