"use client";

import React from "react";
import { RESUME_DATA } from "@/lib/data";
import { KineticText } from "@/components/ui/kinetic-text";

export function EducationSection() {
  return (
    <section id="education" className="py-24 border-b border-border">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">
            Academics
          </div>
          <KineticText
            text="Education"
            as="h2"
            className="text-2xl sm:text-3xl font-pixelta text-foreground tracking-wide"
          />
        </div>

        {/* Education Box */}
        <div className="p-6 rounded-lg bg-card border border-border space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-border text-xs font-mono">
            <div>
              <h3 className="text-base font-bold text-foreground font-sans">
                {RESUME_DATA.education.institution}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                {RESUME_DATA.education.degree}
              </p>
            </div>
            <span className="text-muted-foreground">{RESUME_DATA.education.period}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold">
              CGPA: {RESUME_DATA.education.cgpa}
            </span>
            <span className="px-2.5 py-1 rounded bg-muted border border-border text-zinc-700 dark:text-zinc-300">
              {RESUME_DATA.profile.semester}
            </span>
            <span className="px-2.5 py-1 rounded bg-muted border border-border text-zinc-700 dark:text-zinc-300">
              {RESUME_DATA.education.certification}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              Core Coursework
            </div>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.education.coursework.map((course, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-muted border border-border text-xs text-zinc-700 dark:text-zinc-300 font-sans"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
