"use client";

import React from "react";
import { RESUME_DATA } from "@/lib/data";
import { KineticText } from "@/components/ui/kinetic-text";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 border-b border-border">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">
            Competencies
          </div>
          <KineticText
            text="Skills & Interests"
            as="h2"
            className="text-2xl sm:text-3xl font-pixelta text-foreground tracking-wide"
          />
        </div>

        {/* Skills Cards (All three locked in same row) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
          <div className="p-3.5 sm:p-5 rounded-lg bg-card border border-border space-y-2.5 sm:space-y-3 shadow-xs">
            <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
              Languages
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {RESUME_DATA.skills.languages.map((skill, i) => (
                <span
                  key={i}
                  className="px-1.5 sm:px-2 py-0.5 rounded bg-muted border border-border text-[10px] sm:text-xs font-mono text-zinc-700 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-lg bg-card border border-border space-y-2.5 sm:space-y-3 shadow-xs">
            <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
              Data & Systems
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {RESUME_DATA.skills.databases.map((skill, i) => (
                <span
                  key={i}
                  className="px-1.5 sm:px-2 py-0.5 rounded bg-muted border border-border text-[10px] sm:text-xs font-mono text-zinc-700 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-lg bg-card border border-border space-y-2.5 sm:space-y-3 shadow-xs">
            <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
              AI & Automation
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {RESUME_DATA.skills.automation.map((skill, i) => (
                <span
                  key={i}
                  className="px-1.5 sm:px-2 py-0.5 rounded bg-muted border border-border text-[10px] sm:text-xs font-mono text-zinc-700 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies Bar */}
        <div className="p-4 rounded-lg bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono shadow-xs">
          <span className="text-muted-foreground uppercase tracking-wider">
            Personal Pursuits:
          </span>
          <span className="text-foreground font-semibold">
            {RESUME_DATA.hobbies.join(" • ")}
          </span>
        </div>
      </div>
    </section>
  );
}
