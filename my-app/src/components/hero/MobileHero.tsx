"use client";

import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { RESUME_DATA } from "@/lib/data";
import { sound } from "@/lib/sound";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

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

export function MobileHero() {
  const scrollTo = (id: string) => {
    try {
      sound.playClick(1200);
    } catch {
      // AudioContext fallback
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dark relative z-30 w-full min-h-[100dvh] flex flex-col justify-between pt-20 pb-7 px-5 overflow-hidden bg-black text-white select-none">
      {/* Layer 0: Background DotPattern & Ambient Overlays (strictly BEHIND the image) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <DotPattern
          width={22}
          height={22}
          cx={1}
          cy={1}
          cr={0.9}
          interactive={true}
          flowRadius={150}
          flowIntensity={1.2}
          waveAnimation={true}
          dotColor="rgba(148, 163, 184, 0.28)"
          glowColor="rgba(52, 211, 153, 0.85)"
          className={cn(
            "[mask-image:radial-gradient(ellipse_65%_75%_at_50%_45%,white,transparent_90%)]",
            "[-webkit-mask-image:radial-gradient(ellipse_65%_75%_at_50%_45%,white,transparent_90%)]"
          )}
        />

        {/* Soft Left Scrim for Text Contrast */}
        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none" />

        {/* Soft Bottom Scrim for Buttons */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none" />
      </div>

      {/* Layer 1: Main Cutout Portrait SVG (IN FRONT of background, strictly NOT inverted, half face crop) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 flex items-end justify-end">
        <img
          src="/hero-person.svg"
          alt="Hassan Shahid"
          className="h-[66vh] max-h-[550px] w-auto object-contain object-bottom select-none translate-x-[64%] xs:translate-x-[24%] scale-[1.4] origin-bottom-right drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] filter contrast-[1.05] pointer-events-none"
        />
      </div>

      {/* Layer 2: Foreground Content (z-20) */}
      <div className="relative z-20 flex flex-col justify-between h-full min-h-[calc(100dvh-110px)] w-full pointer-events-none">
        {/* Top Header: Stacked Giant Name Typography */}
        <div className="w-full text-left pt-2 pointer-events-auto">
          <h1 className="font-pixelta uppercase tracking-wide leading-[0.88] text-white text-[18vw] xs:text-[16vw] select-text drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            HASSAN
            <br />
            SHAHID
          </h1>
        </div>

        {/* Middle-Left Content HUD: Credential Pill + Statement + Value Prop + Socials */}
        <div className="w-full max-w-[215px] xs:max-w-[240px] space-y-3.5 text-left pt-1 pb-4 pointer-events-auto">
          {/* Education Credential Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[10.5px] text-zinc-300 font-[family-name:system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] shadow-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">BS Software Engineering-ITU (3.67)</span>
          </div>

          {/* Primary Headline */}
          <h2 className="text-[15px] xs:text-[16px] font-[family-name:system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] font-bold text-white leading-snug tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Building autonomous AI workflows &amp; resilient systems.
          </h2>

          {/* Secondary Description */}
          <p className="text-[11px] xs:text-[11.5px] text-zinc-300/90 font-[family-name:system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Merging software engineering rigor with agentic intelligence to architect digital systems that perform effortlessly.
          </p>

          {/* Social Links Row */}
          <div className="flex items-center gap-2 pt-0.5">
            <a
              href={RESUME_DATA.profile.twitter}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              aria-label="Twitter / X"
              className="w-8.5 h-8.5 rounded-xl bg-black/75 hover:bg-zinc-800 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-md"
            >
              <XIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={RESUME_DATA.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              aria-label="LinkedIn"
              className="w-8.5 h-8.5 rounded-xl bg-black/75 hover:bg-zinc-800 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-md"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={RESUME_DATA.profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1000)}
              aria-label="GitHub"
              className="w-8.5 h-8.5 rounded-xl bg-black/75 hover:bg-zinc-800 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-md"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${RESUME_DATA.profile.email}`}
              onClick={() => sound.playClick(1000)}
              aria-label="Email"
              className="w-8.5 h-8.5 rounded-xl bg-black/75 hover:bg-zinc-800 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md backdrop-blur-md"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Action Buttons: Side-by-side Dual Pills */}
        <div className="w-full flex items-center gap-2.5 pt-1 pb-1 font-[family-name:system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] pointer-events-auto">
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="h-11 px-3.5 flex-1 rounded-full bg-white hover:bg-zinc-100 text-black text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-black/40 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-black shrink-0" />
            <span>Get in Touch</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className="h-11 px-3.5 flex-1 rounded-full bg-black/80 hover:bg-zinc-800 border border-white/20 text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg shadow-black/40 whitespace-nowrap"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileHero;
