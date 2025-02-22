"use client";
import { TopBar } from "@/components/section/field/TopBar";
import { SideBar } from "@/components/section/field/SideBar";
import { useState } from "react";

function Field() {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden">
    <SideBar isOpen={isSideBarOpen} setOpen={setSideBarOpen} />
    <div className="flex flex-1">
    <div className="px-2 pb-6 md:px-10 rounded-tl-2xl flex flex-col gap-2 flex-1 w-full h-full">
    <TopBar isOpen={isSideBarOpen} setOpen={setSideBarOpen} />
      <div className="flex gap-2">
        {[...new Array(4)].map((i) => (
          <div
            key={"first-array" + i}
            className="h-20 w-full rounded-lg  bg-gray-100 animate-pulse"
          ></div>
        ))}
      </div>
      <div className="flex gap-2 flex-1">
        {[...new Array(2)].map((i) => (
          <div
            key={"second-array" + i}
            className="h-full w-full rounded-lg  bg-gray-100 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  </div>
  </div>
  );
}

export default Field;
