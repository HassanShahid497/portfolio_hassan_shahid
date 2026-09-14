"use client";

import React, { useState, useEffect } from "react";
import { Dock, DockIcon } from "@/components/ui/dock";
import { RESUME_DATA } from "@/lib/data";
import { sound } from "@/lib/sound";
import {
  Home,
  Mail,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// Inline SVG Icons for Github, Linkedin, X
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.69-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// X (Twitter) SVG Icon
function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function PortfolioDock() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());

    const sectionIds = ["contact"];
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick(1200);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      }
    }
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playPing(1600);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[95vw]">
      <Dock
        direction="middle"
        className="bg-card/85 dark:bg-[#0b0b0e]/85 border border-border dark:border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl px-2.5 py-1.5 rounded-2xl h-[56px] gap-1.5 sm:gap-2"
        iconSize={38}
        iconMagnification={54}
        iconDistance={110}
      >
        {/* Navigation Items */}
        <DockIcon
          onClick={() => scrollTo("home")}
          className="group relative rounded-xl bg-muted/60 dark:bg-white/[0.04] hover:bg-muted dark:hover:bg-white/[0.1] border border-border dark:border-white/[0.06] hover:border-emerald-500/40 transition-colors"
          aria-label="Home"
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-card dark:bg-[#111114] border border-border dark:border-white/[0.12] text-[10px] font-mono text-foreground dark:text-zinc-200 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 whitespace-nowrap z-50">
            Home
          </span>
          <Home className="w-4 h-4 text-zinc-600 dark:text-zinc-300 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.5)] transition-all" />
          {activeSection === "home" && (
            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          )}
        </DockIcon>



        <DockIcon
          onClick={() => scrollTo("contact")}
          className="group relative rounded-xl bg-muted/60 dark:bg-white/[0.04] hover:bg-muted dark:hover:bg-white/[0.1] border border-border dark:border-white/[0.06] hover:border-emerald-500/40 transition-colors"
          aria-label="Contact"
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-card dark:bg-[#111114] border border-border dark:border-white/[0.12] text-[10px] font-mono text-foreground dark:text-zinc-200 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 whitespace-nowrap z-50">
            Contact
          </span>
          <Mail className="w-4 h-4 text-zinc-600 dark:text-zinc-300 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.5)] transition-all" />
          {activeSection === "contact" && (
            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          )}
        </DockIcon>

        {/* Separator */}
        <div className="h-5 w-[1px] bg-border dark:bg-white/[0.1] mx-0.5 self-center shrink-0" />

        {/* Social Links */}
        <DockIcon
          onClick={() => {
            sound.playClick(1400);
            window.open(RESUME_DATA.profile.github, "_blank", "noreferrer");
          }}
          className="group relative rounded-xl bg-muted/60 dark:bg-white/[0.04] hover:bg-muted dark:hover:bg-white/[0.1] border border-border dark:border-white/[0.06] hover:border-emerald-500/40 transition-colors"
          aria-label="GitHub Profile"
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-card dark:bg-[#111114] border border-border dark:border-white/[0.12] text-[10px] font-mono text-foreground dark:text-zinc-200 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 whitespace-nowrap z-50">
            GitHub
          </span>
          <GithubIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-300 group-hover:text-foreground dark:group-hover:text-white transition-colors" />
        </DockIcon>

        <DockIcon
          onClick={() => {
            sound.playClick(1400);
            window.open(RESUME_DATA.profile.linkedin, "_blank", "noreferrer");
          }}
          className="group relative rounded-xl bg-muted/60 dark:bg-white/[0.04] hover:bg-muted dark:hover:bg-white/[0.1] border border-border dark:border-white/[0.06] hover:border-emerald-500/40 transition-colors"
          aria-label="LinkedIn Profile"
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-card dark:bg-[#111114] border border-border dark:border-white/[0.12] text-[10px] font-mono text-foreground dark:text-zinc-200 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 whitespace-nowrap z-50">
            LinkedIn
          </span>
          <LinkedinIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-300 group-hover:text-sky-500 transition-colors" />
        </DockIcon>

        <DockIcon
          onClick={() => {
            sound.playClick(1400);
            window.open(RESUME_DATA.profile.twitter, "_blank", "noreferrer");
          }}
          className="group relative rounded-xl bg-muted/60 dark:bg-white/[0.04] hover:bg-muted dark:hover:bg-white/[0.1] border border-border dark:border-white/[0.06] hover:border-emerald-500/40 transition-colors"
          aria-label="X / Twitter"
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-card dark:bg-[#111114] border border-border dark:border-white/[0.12] text-[10px] font-mono text-foreground dark:text-zinc-200 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 whitespace-nowrap z-50">
            X (Twitter)
          </span>
          <XIcon className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300 group-hover:text-foreground dark:group-hover:text-white transition-colors" />
        </DockIcon>

        {/* Separator */}
        <div className="h-5 w-[1px] bg-border dark:bg-white/[0.1] mx-0.5 self-center shrink-0" />

        {/* Tactile Audio Switch */}
        <DockIcon
          onClick={toggleSound}
          className="group relative rounded-xl bg-muted/60 dark:bg-white/[0.04] hover:bg-muted dark:hover:bg-white/[0.1] border border-border dark:border-white/[0.06] hover:border-emerald-500/40 transition-colors"
          aria-label={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-card dark:bg-[#111114] border border-border dark:border-white/[0.12] text-[10px] font-mono text-foreground dark:text-zinc-200 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 whitespace-nowrap z-50">
            {isMuted ? "Sound: Muted" : "Sound: On"}
          </span>
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-zinc-500 group-hover:text-rose-400 transition-colors" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)] transition-colors" />
          )}
        </DockIcon>

        {/* Separator */}
        <div className="h-5 w-[1px] bg-border dark:bg-white/[0.1] mx-0.5 self-center shrink-0" />

        {/* Animated Theme Toggler */}
        <DockIcon
          className="group relative rounded-xl bg-muted/60 dark:bg-white/[0.04] hover:bg-muted dark:hover:bg-white/[0.1] border border-border dark:border-white/[0.06] hover:border-emerald-500/40 transition-colors"
          aria-label="Toggle Theme"
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-card dark:bg-[#111114] border border-border dark:border-white/[0.12] text-[10px] font-mono text-foreground dark:text-zinc-200 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 whitespace-nowrap z-50">
            Theme
          </span>
          <ThemeToggle className="w-full h-full border-0 bg-transparent hover:bg-transparent p-0 flex items-center justify-center text-zinc-600 dark:text-zinc-300 group-hover:text-emerald-500 transition-colors [&_svg]:size-4" />
        </DockIcon>
      </Dock>
    </div>
  );
}
