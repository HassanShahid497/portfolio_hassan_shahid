"use client";

import React from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { RESUME_DATA } from "@/lib/data";
import { sound } from "@/lib/sound";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { KineticText } from "@/components/ui/kinetic-text";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const scrollTo = (id: string) => {
    sound.playClick(1200);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-36 pb-24 border-b border-border overflow-hidden">
      {/* Interactive Grid Pattern Background (Minimal Subtle Opacity) */}
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "opacity-20 border-none"
        )}
        width={40}
        height={40}
        squares={[60, 24]}
        squaresClassName="stroke-zinc-400/20 dark:stroke-white/[0.08] hover:fill-emerald-500/15"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8 pointer-events-none">
        {/* Status Badge */}
        <div className="pointer-events-auto inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>BS Software Engineering • ITU (CGPA 3.67)</span>
        </div>

        {/* Hero Title & Punchy Bio */}
        <div className="space-y-4">
          <KineticText
            text={RESUME_DATA.profile.name}
            as="h1"
            className="text-4xl sm:text-6xl tracking-tight text-foreground font-mono uppercase pointer-events-auto cursor-default"
          />
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed max-w-xl pointer-events-auto">
            Building AI automation and agentic workflows to streamline complex tasks.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
          <InteractiveHoverButton
            onClick={(e) => {
              e.preventDefault();
              scrollTo("contact");
            }}
          >
            Get in Touch
          </InteractiveHoverButton>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("projects");
            }}
            className="px-4 py-2 border border-border rounded text-muted-foreground hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer"
          >
            View Projects ↗
          </button>
        </div>
      </div>
    </section>
  );
}
