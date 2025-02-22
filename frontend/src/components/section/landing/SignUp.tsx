import { Button } from "@/components/ui/Button";
import { NavButton } from "@/components/ui/nav/NavButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ReactNode, useId } from "react";

interface SignUpProps {
  children?: ReactNode;
}

const SignUp = ({children, ...props}: SignUpProps)  => {
    const id = useId();
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="bg-white">
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <svg
                className="stroke-zinc-800"
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
              <DialogTitle className="sm:text-center">Sign up SunSight</DialogTitle>
              <DialogDescription className="sm:text-center">
                We just need a few details to get you started.
              </DialogDescription>
            </DialogHeader>
          </div>
  
          <form className="space-y-5">
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-name`}>Full name</Label>
                <Input id={`${id}-name`} placeholder="Matt Welsh" type="text" required />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-email`}>Email</Label>
                <Input id={`${id}-email`} placeholder="hi@yourcompany.com" type="email" required />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-password`}>Password</Label>
                <Input
                  id={`${id}-password`}
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
            </div>
            <Button type="button" className="w-full">
              Sign up
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

export default SignUp;