"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { PortfolioDock } from "@/components/layout/PortfolioDock";
import { RESUME_DATA } from "@/lib/data";

export default function WorkHistoryPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-emerald-500 selection:text-black pb-28 sm:pb-20">
      <Navbar />
      <PortfolioDock />

      <div className="pt-16">
        <ExperienceSection />
      </div>

      <footer className="relative z-10 bg-card/40 py-12 font-mono text-xs text-muted-foreground border-t border-border">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-bold">{RESUME_DATA.profile.name}</span>
            <span className="text-zinc-400 dark:text-zinc-600">/</span>
            <span className="text-muted-foreground">Work History</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-muted-foreground">
            <span>{RESUME_DATA.profile.location}</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
