"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary: "bg-st-red text-white hover:bg-red-600 shadow-lg shadow-red-900/20 transition-all duration-300",
            secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all",
            outline: "bg-transparent text-white border border-white/20 hover:border-st-red hover:text-st-red transition-all",
            ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm rounded-md",
            md: "px-6 py-3 text-sm font-medium rounded-lg",
            lg: "px-8 py-4 text-base font-medium rounded-xl",
        };

        return (
            <motion.button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center cursor-pointer",
                    variants[variant],
                    sizes[size],
                    className
                )}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
