"use client";

import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { RESUME_DATA } from "@/lib/data";
import { sound } from "@/lib/sound";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

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
    <section id="hero" className="relative w-full min-h-[640px] border-b border-border bg-black select-none overflow-hidden">
      {/* ========================================================================= */}
      {/* SHARED BACKGROUND VIDEO & AMBIENT GLOW                                    */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.72] contrast-[1.1]"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* MOBILE-ONLY TAILORED HERO (< sm / phones)                                 */}
      {/* ========================================================================= */}
      <div className="flex sm:hidden relative z-30 w-full min-h-[92vh] max-h-[820px] flex-col justify-between items-center text-center pt-20 pb-7 px-5">
        {/* Mobile Header: Status Pill + Big Name + Subtitle */}
        <div className="space-y-2 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-emerald-500/30 backdrop-blur-md text-[11px] text-emerald-400 font-mono shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>BS Software Engineering • ITU (3.67)</span>
          </div>

          <h1 className="font-pixelta tracking-wider uppercase leading-none text-white text-4xl drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            Hassan Shahid
          </h1>

          <p className="text-[11px] font-mono text-emerald-400 font-medium tracking-wider uppercase">
            AI Automation & Systems Engineering
          </p>
        </div>

        {/* Mobile Centerpiece: High-Impact Framed Portrait */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="w-52 h-64 relative flex items-end justify-center rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] via-emerald-500/[0.04] to-transparent backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Subtle radial aura */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />
            
            {/* Portrait Cutout */}
            <img
              src="/hero-person.svg"
              alt="Hassan Shahid"
              className="h-[92%] w-auto object-contain object-bottom select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] filter contrast-[1.06]"
            />

            {/* Bottom Gradient Fade inside frame */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Mobile Bottom HUD: Bio + Social Links + Action Buttons */}
        <div className="w-full max-w-xs space-y-3.5 flex flex-col items-center">
          {/* Bio copy */}
          <p className="text-xs text-zinc-300 font-sans leading-relaxed text-center drop-shadow-md">
            Building autonomous AI workflows and resilient systems to eliminate complex, repetitive software toil.
          </p>

          {/* Social Icons row */}
          <div className="flex items-center gap-2.5">
            <a
              href={RESUME_DATA.profile.twitter}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              aria-label="Twitter / X"
              className="w-9 h-9 rounded-xl bg-black/70 hover:bg-zinc-800 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-md"
            >
              <XIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={RESUME_DATA.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-black/70 hover:bg-zinc-800 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-md"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={RESUME_DATA.profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              aria-label="GitHub"
              className="w-9 h-9 rounded-xl bg-black/70 hover:bg-zinc-800 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-md"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${RESUME_DATA.profile.email}`}
              onClick={() => sound.playClick(1000)}
              aria-label="Email"
              className="w-9 h-9 rounded-xl bg-black/70 hover:bg-zinc-800 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-md"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex items-center gap-2 w-full pt-0.5">
            <InteractiveHoverButton
              onClick={() => scrollTo("contact")}
              className="h-11 px-4 flex-1 text-xs font-semibold bg-white text-black border border-white/40 shadow-lg shadow-black/20 flex items-center justify-center"
            >
              Get in Touch
            </InteractiveHoverButton>

            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="h-11 px-4 flex-1 rounded-full bg-black/75 hover:bg-zinc-800 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg shadow-black/30"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP / LAPTOP HERO (hidden sm:flex, h-screen min-h-[640px])             */}
      {/* ========================================================================= */}
      <div className="hidden sm:flex relative w-full h-screen max-h-[1000px] flex-col justify-between">
        {/* Layer 2: Giant Bold Name Typography (z-10, right behind head, just below navbar) */}
        <div className="absolute top-[84px] md:top-[88px] lg:top-[84px] inset-x-0 flex justify-center z-10 select-none pointer-events-none">
          <h1 className="font-pixelta tracking-wider uppercase leading-none text-white text-[11vw] md:text-[9.5vw] lg:text-[102px] xl:text-[118px] text-center drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)] whitespace-nowrap">
            Hassan Shahid
          </h1>
        </div>

        {/* Layer 3: Main Cutout Portrait (z-20, in front of name, full body visible) */}
        <div className="relative z-20 flex justify-center items-end h-[74vh] md:h-[78vh] lg:h-[80vh] max-h-[680px] pointer-events-none">
          <img
            src="/hero-person.svg"
            alt="Hassan Shahid"
            className="h-full w-auto object-contain object-bottom select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] filter contrast-[1.05]"
          />
        </div>

        {/* Soft bottom edge blend into page background specifically in dark mode */}
        <div className="absolute inset-x-0 bottom-0 h-28 hidden dark:block bg-gradient-to-t from-background via-background/70 to-transparent z-25 pointer-events-none" />

        {/* Foreground HUD: Diagonal Contrast (Upper-Left vs Bottom-Right, z-30) */}
        <div className="absolute inset-0 z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 h-full flex flex-col justify-between pb-8 sm:pb-10 lg:pb-12 pointer-events-none">
          {/* UPPER-MID LEFT: Status Badge + Bio Caption + Social Icons */}
          <div className="pt-[210px] md:pt-[220px] lg:pt-[225px] max-w-sm pointer-events-auto space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs text-emerald-400 font-mono shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>BS Software Engineering • ITU (3.67)</span>
            </div>

            <p className="text-sm text-zinc-200 font-sans font-normal leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] max-w-sm">
              Building AI automation and agentic workflows to streamline complex software engineering tasks with high precision.
            </p>

            <div className="flex items-center gap-2.5 pt-0.5">
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

          {/* BOTTOM RIGHT: Value Caption + Action Buttons */}
          <div className="mt-auto w-full sm:max-w-sm sm:ml-auto pointer-events-auto space-y-3 text-right flex flex-col items-end">
            <p className="text-sm text-zinc-200 font-sans font-normal leading-relaxed drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] max-w-sm">
              Merging software engineering rigor with agentic intelligence to architect digital systems that perform effortlessly.
            </p>

            <div className="flex flex-row items-center gap-3 pt-0.5 w-auto justify-end">
              <InteractiveHoverButton
                onClick={() => scrollTo("contact")}
                className="h-12 px-7 min-w-[165px] text-sm font-semibold bg-white text-black border border-white/40 shadow-lg shadow-black/20 flex items-center justify-center"
              >
                Get in Touch
              </InteractiveHoverButton>

              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="h-12 px-7 min-w-[165px] rounded-full bg-black/70 hover:bg-zinc-800 border border-white/20 text-white text-sm font-semibold flex items-center justify-center gap-2 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-black/30"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-300 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
