"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RESUME_DATA } from "@/lib/data";

function ArrowUpRightIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="4" y1="12" x2="12" y2="4" />
      <polyline points="5 4 12 4 12 11" />
    </svg>
  );
}

export function Footer() {
  const [lahoreTime, setLahoreTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Karachi",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(now);
        setLahoreTime(formatted);
      } catch {
        setLahoreTime("7:30 PM");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative w-full min-h-[580px] sm:min-h-[660px] md:min-h-[720px] overflow-hidden flex flex-col justify-between select-none">
      {/* Landscape Painting Background - Unobscured & Vibrant */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/footer-bg.jpg"
          alt="Pastoral meadow landscape"
          fill
          priority
          className="object-cover object-bottom"
        />
        {/* Smooth progressive fade from the contact section into the sky */}
        <div
          className="absolute inset-x-0 top-0 h-48 sm:h-64 md:h-72 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #fbfbfd 0%, rgba(251, 251, 253, 0.95) 15%, rgba(251, 251, 253, 0.72) 35%, rgba(251, 251, 253, 0.42) 55%, rgba(251, 251, 253, 0.18) 75%, rgba(251, 251, 253, 0.04) 90%, transparent 100%)",
          }}
        />
      </div>

      {/* Top Content Area */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-16 sm:pt-20 md:pt-24 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
          {/* Main Hook & iOS Glass Email Action */}
          <div className="flex flex-col max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-zinc-950 leading-snug">
              Building autonomous systems, agentic workflows, and thoughtful digital craft.
            </h2>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* iOS 27 Liquid See-Through Frosted Glass Email Button */}
              <a
                href={`mailto:${RESUME_DATA.profile.email}`}
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full overflow-hidden bg-black/[0.08] hover:bg-black/[0.14] text-zinc-950 backdrop-blur-2xl border border-black/15 hover:border-black/25 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),0_8px_32px_0_rgba(0,0,0,0.06)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                {/* Specular Liquid Glass Shimmer Sweep on Hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <span className="relative z-10 text-sm sm:text-[15px] font-semibold tracking-tight text-zinc-950">
                  {RESUME_DATA.profile.email}
                </span>

                <span className="relative z-10 w-6 h-6 rounded-full bg-black/10 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                  <ArrowUpRightIcon className="w-3.5 h-3.5 text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>

              {/* Phone Direct */}
              <a
                href={`tel:${RESUME_DATA.profile.phone}`}
                className="inline-flex items-center gap-1.5 text-sm text-zinc-900 hover:text-black transition-colors duration-150 py-2 font-medium"
              >
                <span>{RESUME_DATA.profile.phone}</span>
                <ArrowUpRightIcon className="w-3 h-3 text-zinc-700 group-hover:text-black" />
              </a>
            </div>
          </div>

          {/* Minimalist Navigation & Social Columns - Crisp Typography without Glow */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 text-sm">
            {/* Explore Column */}
            <div className="flex flex-col space-y-3">
              <span className="text-xs uppercase tracking-wider font-mono text-zinc-700 font-semibold">
                Navigation
              </span>
              <a href="#vision" className="text-zinc-800 hover:text-zinc-950 font-medium transition-colors">
                Vision
              </a>
              <a href="#experience" className="text-zinc-800 hover:text-zinc-950 font-medium transition-colors">
                Experience
              </a>
              <a href="#projects" className="text-zinc-800 hover:text-zinc-950 font-medium transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-zinc-800 hover:text-zinc-950 font-medium transition-colors">
                Matrix
              </a>
            </div>

            {/* Socials Column */}
            <div className="flex flex-col space-y-3">
              <span className="text-xs uppercase tracking-wider font-mono text-zinc-700 font-semibold">
                Connect
              </span>
              <a
                href={RESUME_DATA.profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-800 hover:text-zinc-950 font-medium transition-colors inline-flex items-center gap-1"
              >
                <span>X (Twitter)</span>
                <ArrowUpRightIcon className="w-3 h-3 text-zinc-600" />
              </a>
              <a
                href={RESUME_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-800 hover:text-zinc-950 font-medium transition-colors inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRightIcon className="w-3 h-3 text-zinc-600" />
              </a>
              <a
                href={RESUME_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-800 hover:text-zinc-950 font-medium transition-colors inline-flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRightIcon className="w-3 h-3 text-zinc-600" />
              </a>
            </div>

            {/* Status Column */}
            <div className="flex flex-col space-y-3 col-span-2 sm:col-span-1">
              <span className="text-xs uppercase tracking-wider font-mono text-zinc-700 font-semibold">
                Status
              </span>
              <span className="text-xs text-zinc-950 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-pulse" />
                Available for work
              </span>
              <p className="text-xs text-zinc-800 leading-relaxed max-w-[160px]">
                Software Engineering student @ ITU (Grad 2028).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Landscape Space: Open breathing room to view the pastoral painting, cows & figure */}
      <div className="flex-1 min-h-[160px] pointer-events-none" />

      {/* Bottom Bar: Clean floating text without white border or capsule */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pb-8 sm:pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-[13px] text-zinc-900 font-medium">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-tight text-zinc-950">
              Hassan Shahid
            </span>
            <span className="text-zinc-800">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          {/* Right: Location & Live Local Clock */}
          <div className="flex items-center gap-3 text-zinc-900">
            <span>Lahore, PK</span>
            {lahoreTime && (
              <>
                <span className="opacity-50">&middot;</span>
                <span className="font-mono text-zinc-950 font-semibold">{lahoreTime} PKT</span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
