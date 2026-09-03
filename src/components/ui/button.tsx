import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-buttons text-sm font-medium tracking-ui transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#f73b20] text-white hover:bg-[#f84d35] shadow-sm hover:shadow-brand active:scale-[0.98]",
        pill: "bg-[#f73b20] text-white hover:bg-[#f84d35] rounded-pills px-6 py-2.5 shadow-sm hover:shadow-brand active:scale-[0.98]",
        destructive: "bg-[#fb2d54] text-white hover:bg-[#fb2d54]/90",
        outline: "border border-[#f73b20] bg-transparent text-[#f73b20] hover:bg-[#f73b20] hover:text-white",
        outlineNeutral: "border border-[#e7dcdb] bg-transparent text-[#360802] hover:border-[#360802] hover:bg-black/5",
        secondary: "bg-[#fdedea] text-[#360802] hover:bg-[#e7dcdb]",
        ghost: "text-[#360802] hover:bg-black/5 hover:text-[#f73b20]",
        ghostLink: "bg-transparent text-[#f73b20] p-2 rounded-links hover:bg-[#fdedea]",
        whiteGhost: "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 rounded-nav",
        whitePill: "bg-white text-[#360802] hover:bg-white/90 rounded-pills shadow-sm",
        darkPill: "bg-[#360802] text-white hover:bg-black rounded-pills shadow-sm",
        hero: "bg-[#f73b20] text-white rounded-buttons shadow-brand hover:bg-[#f84d35] hover:scale-[1.01] active:scale-[0.99]",
        heroOutline: "border border-current bg-transparent hover:bg-white/10 rounded-buttons",
        accent: "bg-[#f73b20] text-white shadow-brand hover:bg-[#f84d35]",
        teal: "bg-[#34c771] text-white hover:bg-[#34c771]/90",
      },
      size: {
        default: "h-11 px-5 py-2.5 text-sm",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-12 rounded-buttons px-7 text-base font-medium",
        xl: "h-14 rounded-buttons px-9 text-base font-medium",
        pill: "h-10 px-5 text-sm rounded-pills",
        icon: "h-10 w-10 rounded-buttons",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
