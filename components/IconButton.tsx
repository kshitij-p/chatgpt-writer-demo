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
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        {...rest}
        type={type}
        className={cn(
          "flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white text-white shadow-md hover:bg-[hsl(0,_0%,_96%)] focus-visible:bg-[hsl(0,_0%,_96%)]",
          className,
        )}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
IconButton.displayName = "IconButton";

export default IconButton;
