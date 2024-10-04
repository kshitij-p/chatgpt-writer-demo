import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  (
    {
      className,
      children,
      variant = "primary",
      type = "button",
      ...rest
    }: React.ComponentPropsWithoutRef<"button"> & {
      variant?: "primary" | "secondary";
    },
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        {...rest}
        type="button"
        className={cn(
          "h-[53px] rounded-lg inline-flex items-center justify-center shadow-md font-semibold text-2xl px-6 disabled:opacity-50 transition focus-visible:outline-none",
          variant === "primary"
            ? "bg-[hsla(217,_91%,_60%,_1)] text-white hover:bg-[hsl(217,_71%,_53%)] focus-visible:bg-[hsl(217,_71%,_53%)]"
            : "text-gray-500 bg-white border-2 border-gray-500 hover:bg-[hsl(0,_0%,_90%)] focus-visible:bg-[hsl(0,_0%,_90%)]",
          className
        )}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "IconButton";

export default Button;
