import { Layers, CircleGauge, LayoutPanelTop, Settings } from "lucide-react";

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Sidebar as SideBarComponent, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Logo from "@/assets/Logo";
import api from "@/lib/api";
import { useNavigate } from "react-router";

interface SideBarProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }

const SideBar: React.FC<SideBarProps> = ({ isOpen, setOpen }) => {

  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      api
        .get("/auth/me")
        .then((response) => setUsername(response.data.username))
        .catch((error) => console.log(error));
    };

    fetchUserData();
  }, [navigate]);

    return (
        <SideBarComponent open={isOpen} setOpen={setOpen}>
        <SidebarBody className="ml-10 bg-gray-100 justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-row">
              <Logo className="w-7 h-7 block"/>
              {isOpen ? <h1 className="inline">SolarEye</h1> : <></>}
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
                label: username,
                href: "#",
                icon: (
                  <img
                    src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
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
        <Layers className="text-neutral h-6 w-6 flex-shrink-0" />
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