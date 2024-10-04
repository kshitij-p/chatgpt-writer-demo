import { cn } from "@/lib/utils";
import React from "react";

const Input = React.forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"input">,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        {...rest}
        className={cn(
          "rounded-lg border border-gray-200 px-4 pb-1 pt-[5px] transition-colors hover:border-gray-400 focus:outline-none focus-visible:border-gray-600 disabled:opacity-50",
          className,
        )}
        ref={ref}
      />
    );
  },
);
Input.displayName = "Input";

export default Input;
