"use client";

import React from "react";
import WarpText from "@/components/WarpText";
import { HoverImg, ProjectItem } from "@/components/block/hover-img";

const projectsList: ProjectItem[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI Automator",
    label: "Autonomous Multi-Agent Swarms & Tool Calling",
    year: "/25",
    link: "https://github.com/HassanShahid497",
    imageSrc:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "discord-bot",
    title: "Discord Community Bot",
    label: "Real-time Bot API & Moderation Infrastructure",
    year: "/25",
    link: "https://github.com/HassanShahid497",
    imageSrc:
      "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dsa-engine",
    title: "High-Perf C++ DSA",
    label: "Graph Algorithms & Low-Latency Memory Engine",
    year: "/24",
    link: "https://github.com/HassanShahid497",
    imageSrc:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "postgres-engine",
    title: "PostgreSQL Database Engine",
    label: "3NF Relational Database Architecture & Indexing",
    year: "/24",
    link: "https://github.com/HassanShahid497",
    imageSrc:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full min-h-screen bg-[#08080a] text-white px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 flex flex-col justify-center overflow-hidden select-text transition-colors"
    >
      {/* Editorial Header matching "ABOUT ME" WarpText + Reference Metadata */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 sm:pb-8">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-[280px] sm:w-[330px] md:w-[370px]">
            <WarpText
              text="SELECTED WORKS"
              color="#ffffff"
              warpStrength={0.18}
              warpScale={1.8}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.028}
              ripple
              fontSize="clamp(2.1rem, 4vw, 3.4rem)"
              fontWeight={800}
              style={{ height: "62px" }}
              letterSpacing={-0.05}
              lineHeight={1}
              fontFamily="var(--font-anton), var(--font-barlow-condensed), sans-serif"
              align="left"
              className="w-full cursor-pointer"
            />
          </div>
          <span className="text-xs sm:text-sm font-sans font-medium text-neutral-400 self-start mt-2">
            ({projectsList.length})
          </span>
        </div>

        <p className="text-xs sm:text-sm font-sans text-neutral-400 sm:text-right pb-1.5">
          A piece from my selection of favorites
        </p>
      </div>

      {/* Full-width Obsidian UI Hover-Img Showcase */}
      <div className="w-full">
        <HoverImg projects={projectsList} />
      </div>
    </section>
  );
}

export default ProjectsSection;
