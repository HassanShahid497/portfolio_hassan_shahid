import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-full border border-white/20 bg-white text-black px-7 py-3 text-center text-sm font-semibold transition-colors duration-300 hover:bg-emerald-500 hover:border-emerald-400/50",
        className
      )}
      {...props}
    >
      {/* Expanding Green Dot */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-emerald-500 transition-transform duration-500 ease-out group-hover:scale-[45] pointer-events-none"
      />

      {/* Default State: Bullet Dot on Left + Centered Text */}
      <div className="flex items-center justify-center gap-2 pl-3.5 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
        <span className="inline-block whitespace-nowrap">{children}</span>
      </div>

      {/* Hover State: Perfectly Centered Text with Arrow */}
      <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center gap-2 text-black opacity-0 transition-all duration-300 translate-x-6 group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none">
        <span className="whitespace-nowrap font-semibold">{children}</span>
        <ArrowRight className="w-4 h-4 text-black stroke-[2.2]" />
      </div>
    </button>
  );
}
