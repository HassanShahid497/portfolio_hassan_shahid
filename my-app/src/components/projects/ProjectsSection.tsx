"use client";

import React from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { sound } from "@/lib/sound";
import { KineticText } from "@/components/ui/kinetic-text";
import SkewCards, { SkewCardItem } from "@/components/ui/gradient-card-showcase";
import { Bot, Sparkles, Cpu } from "lucide-react";

const flagshipProjects: SkewCardItem[] = [
  {
    title: "Agentic AI Automator",
    category: "Autonomous Systems",
    desc: "Multi-agent execution engine utilizing autonomous tool-calling, step-by-step reasoning, and dynamic task delegation to eliminate repetitive manual workflows.",
    gradientFrom: "#ffbc00",
    gradientTo: "#ff0058",
    actionText: "Explore Agent",
    link: "https://github.com/HassanShahid497",
    icon: <Bot className="w-4 h-4 text-amber-300" />,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Discord Community Bot",
    category: "Real-time Bot API",
    desc: "Automated moderation bot featuring real-time stream filtering, event scheduling, automated member onboarding, and sub-second Discord API handlers.",
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    actionText: "View Source",
    link: "https://github.com/HassanShahid497",
    icon: <Sparkles className="w-4 h-4 text-cyan-300" />,
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "High-Perf DSA & DB Engine",
    category: "C++ & PostgreSQL",
    desc: "Optimized graph algorithms and memory-managed DSA in C++, coupled with a 3NF relational PostgreSQL database with sub-2ms query latency.",
    gradientFrom: "#00e676",
    gradientTo: "#00b4d8",
    actionText: "Inspect Architecture",
    link: "https://github.com/HassanShahid497",
    icon: <Cpu className="w-4 h-4 text-emerald-300" />,
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 border-b border-border overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Section Header with Achievement Introduction */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Engineering Achievements & Work
          </div>
          <KineticText
            text="Selected Projects"
            as="h2"
            className="text-2xl sm:text-3xl font-pixelta text-foreground tracking-wide"
          />
          <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
            Software Engineering student at ITU with a <span className="font-semibold text-foreground">3.67 / 4.00 CGPA</span>, specializing in autonomous AI workflows and resilient system architectures. Previously managed technical communities and organized hackathons at <span className="font-semibold text-foreground">AI Labs</span>, while building production bot infrastructure, memory-optimized C++ libraries, and sub-2ms latency database schemas.
          </p>
        </div>

        {/* 3D Animated Skewed Cards Showcase (clean, borderless, symmetric) */}
        <div className="w-full flex justify-center">
          <SkewCards
            items={flagshipProjects}
            className="py-0 min-h-0 bg-transparent w-full"
            containerClassName="w-full justify-center gap-2"
          />
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
