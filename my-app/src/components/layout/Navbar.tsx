"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick(1200);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 font-mono text-xs transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border py-3.5 shadow-xs"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-bold tracking-tight transition-colors text-sm ${
            scrolled
              ? "text-foreground hover:text-emerald-500"
              : "text-white hover:text-emerald-400 drop-shadow-sm"
          }`}
        >
          {RESUME_DATA.profile.name}
        </button>

        <nav
          className={`flex items-center gap-4 sm:gap-5 text-xs transition-colors ${
            scrolled ? "text-muted-foreground" : "text-zinc-200"
          }`}
        >
          <button
            onClick={() => scrollTo("experience")}
            className={
              scrolled
                ? "hover:text-foreground transition-colors"
                : "hover:text-white transition-colors drop-shadow-sm"
            }
          >
            Experience
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className={
              scrolled
                ? "hover:text-foreground transition-colors"
                : "hover:text-white transition-colors drop-shadow-sm"
            }
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo("education")}
            className={`hidden sm:inline-block transition-colors ${
              scrolled
                ? "hover:text-foreground"
                : "hover:text-white drop-shadow-sm"
            }`}
          >
            Education
          </button>
          <button
            onClick={() => scrollTo("skills")}
            className={`hidden sm:inline-block transition-colors ${
              scrolled
                ? "hover:text-foreground"
                : "hover:text-white drop-shadow-sm"
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className={`px-3 py-1 rounded transition-colors text-xs border ${
              scrolled
                ? "bg-muted hover:bg-foreground hover:text-background text-foreground border-border"
                : "bg-black/50 hover:bg-black/70 text-white border-white/20 backdrop-blur-md shadow-sm"
            }`}
          >
            Contact
          </button>

          {/* Animated Theme Toggler */}
          <ThemeToggle
            className={`size-8 rounded-lg border transition-colors flex items-center justify-center [&_svg]:size-3.5 cursor-pointer shadow-xs ${
              scrolled
                ? "border-border bg-card/80 hover:bg-muted text-foreground"
                : "border-white/20 bg-black/50 hover:bg-black/70 text-white backdrop-blur-md shadow-sm"
            }`}
          />
        </nav>
      </div>
    </header>
  );
}
