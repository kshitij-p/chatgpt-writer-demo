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
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        {...rest}
        type="button"
        className={cn(
          "inline-flex h-[53px] items-center justify-center rounded-lg px-4 text-2xl font-semibold shadow-md transition focus-visible:outline-none disabled:opacity-50",
          variant === "primary"
            ? "bg-[hsla(217,_91%,_60%,_1)] text-white hover:bg-[hsl(217,_71%,_53%)] focus-visible:bg-[hsl(217,_71%,_53%)]"
            : "border-2 border-gray-500 bg-white text-gray-500 hover:bg-[hsl(0,_0%,_90%)] focus-visible:bg-[hsl(0,_0%,_90%)]",
          className,
        )}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "IconButton";

export default Button;
