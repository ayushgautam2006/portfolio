import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    noShadow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, noShadow = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-st-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-gray-200",
                    !noShadow && "hover:border-st-red/30 hover:shadow-glow transition-all duration-500",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";

export { Card };
