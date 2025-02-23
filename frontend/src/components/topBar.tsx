import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
//   import { Separator } from "@/components/ui/seperator";
import {
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  ComponentIcon,
  Ellipsis,
  PanelRightOpen,
  PanelLeftOpen,
  DoorOpen,
  User,
} from "lucide-react";
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  PopoverBody,
  PopoverButton,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverForm,
  PopoverHeader,
  PopoverLabel,
  PopoverRoot,
  PopoverSubmitButton,
  PopoverTextarea,
  PopoverTrigger,
} from "@/components/ui/popover-button";
import { useAuth } from "@/provider/authProvider";
import axios from "axios";
import { replace, useNavigate } from "react-router";
import api from "@/lib/api";

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
          <BreadcrumbPage className="inline-flex items-center gap-1.5">
            <ComponentIcon size={16} aria-hidden="true" />
            My Arrays
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
}

const TopBar = () => {
  const [username, setUsername] = useState("");
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
    <header className="sticky gap-4 top-0 z-50 md:pl-4 md:pr-8 border-b-2 border-slate-100 items-center justify-center">
      <NavbarComponent>
        <NavbarLeft className="px-6 h-full">
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
          <Breadcrumb />
        </NavbarLeft>
        <NavbarRight className="flex">
          <ProfilePopOver username={username} />
          
        </NavbarRight>
      </NavbarComponent>
    </header>
  );
};

interface ProfilePopoverProps {
  username: string;
}

const ProfilePopOver = ({ username }: ProfilePopoverProps) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const actions = [
    {
      icon: <User className="w-4 h-4" />,
      label: "Profile",
      action: () => navigate('/profile', {replace: true}),
    },
    {
      icon: <Ellipsis className="w-4 h-4" />,
      label: "Settings",
      action: () => navigate('/profile', {replace: true}),
    },
    {
      icon: <DoorOpen className="w-4 h-4" />,
      label: "Log Out",
      action: () => {
        setToken(null);
        navigate('/', {replace: true});
      },
    },
  ];

  return (
    <PopoverRoot>
      <PopoverTrigger className="flex p-6 flex-row text-zinc-500 text-secondary-foreground hover:bg-secondary/80 gap-4 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {/* <Ellipsis /> */}
        <span>{capitalizeFirstLetter(username)}</span>
        <Avatar>
          <AvatarImage
            src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
            alt="User pfp"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-48 h-48 mt-40 mr-40">
        <PopoverHeader className="flex flex-row gap-4 items-center justify-end">
          <span>{capitalizeFirstLetter(username)}</span>
          <Avatar>
            <AvatarImage
              src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
              alt="User pfp"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </PopoverHeader>
        <PopoverBody>
          {actions.map((action, index) => (
            <PopoverButton key={index} onClick={action.action}>
              {action.icon}
              <span>{action.label}</span>
            </PopoverButton>
          ))}
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export { TopBar };
