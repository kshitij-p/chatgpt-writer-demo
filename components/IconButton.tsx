import React from "react";
import { cn } from "@/lib/utils";

const IconButton = React.forwardRef(
  (
    {
      className,
      children,
      type = "button",
      ...rest
    }: React.ComponentPropsWithoutRef<"button">,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        {...rest}
        type={type}
        className={cn(
          "w-[32px] h-[32px] flex items-center justify-center bg-white shadow-md rounded-full text-white hover:bg-[hsl(0,_0%,_96%)] focus-visible:bg-[hsl(0,_0%,_96%)]",
          className
        )}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

export default IconButton;
