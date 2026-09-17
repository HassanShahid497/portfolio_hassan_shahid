"use client";

import React from "react";
import { RESUME_DATA } from "@/lib/data";
import { KineticText } from "@/components/ui/kinetic-text";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 border-b border-border">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">
            Experience
          </div>
          <KineticText
            text="Work History"
            as="h2"
            className="text-2xl sm:text-3xl font-pixelta text-foreground tracking-wide"
          />
        </div>

        {/* Experience List */}
        <div className="space-y-8">
          {RESUME_DATA.experience.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-card border border-border hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors space-y-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-border text-xs font-mono">
                <span className="font-bold text-foreground text-sm tracking-wide">
                  {item.company}
                </span>
                <span className="text-muted-foreground">{item.period}</span>
              </div>

              <div className="space-y-5">
                {item.roles.map((role, rIdx) => (
                  <div key={rIdx} className="space-y-1">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
                      {role.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                      {role.summary}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-muted border border-border text-[11px] font-mono text-zinc-600 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
