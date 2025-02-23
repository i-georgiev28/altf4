import { Layers, CircleGauge, LayoutPanelTop, Settings } from "lucide-react";

import React, { Dispatch, SetStateAction } from 'react';

import { Sidebar as SideBarComponent, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Logo from "@/assets/Logo";

interface SideBarProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }

const SideBar: React.FC<SideBarProps> = ({ isOpen, setOpen }) => {
    return (
        <SideBarComponent open={isOpen} setOpen={setOpen}>
        <SidebarBody className="ml-10 bg-gray-100 justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-row">
              <Logo className="w-7 h-7 block"/>
              {isOpen ? <h1 className="inline">Logo</h1> : <></>}
            </div>
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
        <Layers className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "History",
      href: "#",
      icon: (
        <CircleGauge className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "#",
      icon: (
        <LayoutPanelTop className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
  ];

export {SideBar};