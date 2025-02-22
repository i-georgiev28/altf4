import { Badge }  from "@/components/ui/Badge";

import React from "react";
import { Image as ImageIcon, Paintbrush, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import {
    FloatingPanelBody,
    FloatingPanelButton,
    FloatingPanelCloseButton,
    FloatingPanelContent,
    FloatingPanelFooter,
    FloatingPanelForm,
    FloatingPanelHeader,
    FloatingPanelLabel,
    FloatingPanelRoot,
    FloatingPanelSubmitButton,
    FloatingPanelTextarea,
    FloatingPanelTrigger,
  } from "@/components/ui/floating-panel";
import { ArraysTable } from "@/components/arraysTable";
import { TopBar } from "@/components/topBar";

function Fields() {
    return (
        <>
            <TopBar />
            <main className="flex flex-col mx-auto px-4 my-20 h-screen max-w-5xl">
                <CreateNewField/>
                <ArraysTable />
            </main>
        </>
    );
}

const CreateNewField = () => {
    const actions = [
      {
        icon: <Plus className="w-4 h-4" />,
        label: <span>Ground Mount</span>,
        action: () => console.log("New File"),
        disabled: false,
      },
      {
        icon: <Plus className="w-4 h-4" />,
        label: <span className="items-center text-center justify-center justify-items-center line-through">Rooftop
                <Badge variant="outline" className="mx-2 no-underline">
                  <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true"></span>
                  WIP
                </Badge>
              </span>,
        action: () => console.log("WIP"),
        disabled: true,
      },
      {
        icon: <Plus className="w-4 h-4" />,
        label: <span className="items-center text-center justify-center justify-items-center line-through">Carport
                <Badge variant="outline" className="mx-2 no-underline">
                  <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true"></span>
                  WIP
                </Badge>
              </span>,
          action: () => console.log("WIP"),
          disabled: true,
        },
    ]
   
    return (
      <FloatingPanelRoot>
        <FloatingPanelTrigger
          title="New +"
          className="flex justify-self-end items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
        >
          <span>New +</span>
        </FloatingPanelTrigger>
        <FloatingPanelContent className="w-56">
          <FloatingPanelBody>
            <AnimatePresence>
              {actions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FloatingPanelButton
                    disabled={action.disabled}
                    onClick={action.action}
                    className="w-full flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-muted transition-colors"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </FloatingPanelButton>
                </motion.div>
              ))}
            </AnimatePresence>
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
          </FloatingPanelFooter>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    )
  }

export {Fields}; 