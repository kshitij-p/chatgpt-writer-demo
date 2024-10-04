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
          "border border-gray-200 px-4 pt-[5px] pb-1 rounded-lg disabled:opacity-50",
          className
        )}
        ref={ref}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
