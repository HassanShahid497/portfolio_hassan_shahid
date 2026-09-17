"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/lib/data";

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
            className={`hidden sm:inline-block transition-colors ${
              scrolled
                ? "hover:text-foreground"
                : "hover:text-white drop-shadow-sm"
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className={`hidden sm:inline-block transition-colors ${
              scrolled
                ? "hover:text-foreground"
                : "hover:text-white drop-shadow-sm"
            }`}
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
            className={`px-3.5 py-1.5 rounded-full transition-colors text-xs font-semibold border ${
              scrolled
                ? "bg-muted hover:bg-foreground hover:text-background text-foreground border-border"
                : "bg-black/60 hover:bg-black/80 text-white border-white/20 backdrop-blur-md shadow-sm"
            }`}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
