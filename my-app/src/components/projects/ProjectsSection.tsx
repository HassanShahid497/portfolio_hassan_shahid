"use client";

import React from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/lib/data";
import { KineticText } from "@/components/ui/kinetic-text";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 border-b border-border">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">
            Work
          </div>
          <KineticText
            text="Selected Projects"
            as="h2"
            className="text-2xl sm:text-3xl font-mono text-foreground tracking-tight"
          />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {RESUME_DATA.projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-lg bg-card border border-border hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground font-mono">
                    {project.title}
                  </h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub ↗
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                {project.stack.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-muted border border-border text-[10px] font-mono text-zinc-600 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Callout Banner */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-card via-muted/50 to-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5">
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
              Have an idea?
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-mono text-foreground tracking-tight">
              Let&apos;s build an agentic workflow together.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-md leading-relaxed">
              Open for software engineering opportunities, AI automation projects, and technical collaborations.
            </p>
          </div>
          <div className="shrink-0">
            <InteractiveHoverButton
              onClick={(e) => {
                e.preventDefault();
                sound.playClick(1200);
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start a Project
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
    </section>
  );
}
