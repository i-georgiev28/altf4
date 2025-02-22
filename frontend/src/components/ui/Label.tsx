"use client";

import { Label as LabelPrimitive } from 'radix-ui';
import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, required, ...props }: React.ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-foreground text-sm leading-4 font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {props.children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </LabelPrimitive.Root>
  );
}

export { Label };
