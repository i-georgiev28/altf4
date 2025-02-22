import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { CreditCardIcon, StoreIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

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
import api from "@/lib/api";

function Fields() {
  return (
    <>
      <TopBar />
      <main className="flex flex-col mx-auto px-4 my-20 h-screen max-w-5xl">
        <CreateNewField />
        <ArraysTable />
      </main>
    </>
  );
}

const CreateNewField = () => {
  const actions = [
    {
      element: <NewGroundMount />,
      disabled: false,
    },
    {
      element: (
        <span className="items-center text-center justify-center justify-items-center line-through">
          Rooftop
          <Badge variant="outline" className="mx-2 no-underline">
            <span
              className="size-1.5 rounded-full bg-amber-500"
              aria-hidden="true"
            ></span>
            WIP
          </Badge>
        </span>
      ),
      disabled: true,
    },
    {
      element: (
        <span className="items-center text-center justify-center justify-items-center line-through">
          Carport
          <Badge variant="outline" className="mx-2 no-underline">
            <span
              className="size-1.5 rounded-full bg-amber-500"
              aria-hidden="true"
            ></span>
            WIP
          </Badge>
        </span>
      ),
      disabled: true,
    },
  ];

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
                  className="w-full flex items-center space-x-2 px-2 py-1 rounded-md transition-colors"
                >
                  {action.element}
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
  );
};

const NewGroundMount = () => {
  const id = useId();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState({ width: 0, height: 0 });
  const [capacity, setCapacity] = useState(0);

  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.post("/fields", {
      name,
      location,
      width: area.width,
      height: area.height,
      capacity,
    });

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-full p-0 hover:px-2 hover:py-1 hover:cursor-pointer rounded-none justify-between font-normal transition-all"
        >
          Ground Mount
          <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              New Ground Mount Solar Array
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Enter the following information to create a new ground mount solar
              array.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-name`} required>Name</Label>
              <Input
                id={`${id}-name`}
                placeholder="Garden"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Location <sup className="text-muted-foreground">(Optional)</sup></Label>
              <Input
                id={`${id}-location`}
                placeholder="Varna, Bulgaria"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-2 justify-between">
            <div className="*:not-first:mt-2">
              <Label required>Area [Units]</Label>
              <div className="flex max-w-36">
                <Input
                  id={`${id}-width`}
                  className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Width"
                  type="number"
                  required
                  value={area.width}
                  onChange={(e) => setArea({ ...area, width: Number(e.target.value) })}
                />
                <Input
                  id={`${id}-height`}
                  className="-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="Height"
                  type="number"
                  required
                  value={area.height}
                  onChange={(e) => setArea({ ...area, height: Number(e.target.value) })}
                />
              </div>
              
            </div>
            <div className="*:not-first:mt-2">
              <Label>Battery capacity [W] <sup className="text-muted-foreground">(Optional)</sup></Label>
              <div className="flex max-w-xs">
                <Input
                  id={`${id}-width`}
                  className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="W"
                  type="number"
                  value={capacity || ''}
                  onChange={(e) => setCapacity(e.target.value ? Number(e.target.value) : 0)}
                />
              </div>
            </div>
            </div>
          </div>
          <input type="submit" className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer" value="Create" />
        </form>

      </DialogContent>
    </Dialog>
  );
};

export { Fields };
