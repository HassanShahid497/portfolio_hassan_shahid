"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { RESUME_DATA } from "@/lib/data";
import { sound } from "@/lib/sound";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.69-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function HeroParallaxSample() {
  const scrollTo = (id: string) => {
    sound.playClick(1200);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden border-b border-border bg-background pt-20 sm:pt-24 select-none">
      {/* ========================================================================= */}
      {/* 3-LAYER IOS LOCKSCREEN DEPTH EFFECT CONTAINER                             */}
      {/* Layer 1 (Base): Full photo with original background preserved             */}
      {/* Layer 2 (Middle): Giant bold text "HASSAN SHAHID" behind the head          */}
      {/* Layer 3 (Foreground): Pixel-perfect subject cutout overlay                */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Layer 1: Base original photograph (preserves full room background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero-image.png"
            alt="Hassan Shahid"
            fill
            priority
            unoptimized
            className="object-cover object-[52%_22%] sm:object-[51%_18%] scale-110 sm:scale-115 brightness-[0.78] contrast-[1.05]"
          />
          {/* Subtle top/bottom vignettes to ensure seamless blending and contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Layer 2: Giant Bold Typography sandwiched behind the head (iOS 16 style) */}
        <div className="absolute inset-0 flex items-start justify-center pt-10 sm:pt-12 md:pt-14 lg:pt-12 z-10">
          <h1 className="font-[family-name:var(--font-barlow-condensed)] font-black uppercase tracking-tight leading-none text-white text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[130px] xl:text-[155px] text-center drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
            Hassan Shahid
          </h1>
        </div>

        {/* Layer 3: Foreground Subject Cutout (100% pixel-aligned with Layer 1) */}
        <div className="absolute inset-0 w-full h-full z-20">
          <Image
            src="/hero-person.png"
            alt=""
            fill
            priority
            unoptimized
            aria-hidden="true"
            className="object-cover object-[52%_22%] sm:object-[51%_18%] scale-110 sm:scale-115 brightness-[0.98] contrast-[1.05]"
          />
        </div>

        {/* Soft bottom edge gradient blend into page background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent z-25" />
      </div>

      {/* ========================================================================= */}
      {/* FOREGROUND HUD / COMPONENTS (Placed cleanly on top with z-30)             */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 flex flex-col justify-between min-h-[92vh] sm:min-h-screen pointer-events-none">
        {/* UPPER LEFT: Status Badge + Bio Caption + Social Icons (Moved down a notch) */}
        <div className="pt-20 sm:pt-28 lg:pt-32 max-w-sm pointer-events-auto space-y-3.5">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs text-emerald-400 font-mono shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>BS Software Engineering • ITU (CGPA 3.67)</span>
          </div>

          {/* Clean Subtext without box */}
          <p className="text-sm sm:text-base text-zinc-100 font-sans font-normal leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] max-w-xs sm:max-w-sm">
            Building AI automation and agentic workflows to streamline complex software engineering tasks with high precision.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 pt-1">
            <a
              href={RESUME_DATA.profile.twitter}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              aria-label="Twitter / X"
              className="w-9 h-9 rounded-xl bg-black/60 hover:bg-zinc-800 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md backdrop-blur-md"
            >
              <XIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={RESUME_DATA.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-black/60 hover:bg-zinc-800 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md backdrop-blur-md"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={RESUME_DATA.profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              aria-label="GitHub"
              className="w-9 h-9 rounded-xl bg-black/60 hover:bg-zinc-800 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md backdrop-blur-md"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${RESUME_DATA.profile.email}`}
              onClick={() => sound.playClick(1000)}
              aria-label="Email"
              className="w-9 h-9 rounded-xl bg-black/60 hover:bg-zinc-800 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md backdrop-blur-md"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* BOTTOM RIGHT: Value Caption + Action Buttons (Moved up a nudge) */}
        <div className="mt-auto ml-auto max-w-sm pointer-events-auto space-y-3.5 pb-20 sm:pb-24 lg:pb-28 text-left lg:text-right flex flex-col lg:items-end">
          {/* Clean Subtext without box */}
          <p className="text-sm sm:text-base text-zinc-100 font-sans font-normal leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] max-w-xs sm:max-w-sm">
            Merging software engineering rigor with agentic intelligence to architect digital systems that perform effortlessly.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="px-5 py-3 rounded-full bg-black/60 hover:bg-zinc-800 border border-white/20 text-white text-sm font-medium flex items-center gap-2 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
