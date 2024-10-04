import { cn } from "@/lib/utils";
import React from "react";

const Input = React.forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"input">,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        {...rest}
        className={cn(
          "border border-gray-200 px-4 pt-[5px] pb-1 rounded-lg disabled:opacity-50 hover:border-gray-400 focus-visible:border-gray-600 focus-visible:border-2 focus:outline-none transition-colors",
          className
        )}
        ref={ref}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
