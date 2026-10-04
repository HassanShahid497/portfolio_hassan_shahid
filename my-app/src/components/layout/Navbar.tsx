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
      className={`fixed top-0 left-0 right-0 z-40 font-mono text-xs transition-all duration-300 ${
        scrolled
          ? "opacity-100 pointer-events-auto translate-y-0 bg-background/85 backdrop-blur-md border-b border-border py-3 shadow-xs"
          : "opacity-0 pointer-events-none -translate-y-2 py-3"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 pl-24 sm:pl-28 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-bold tracking-tight transition-colors text-sm ${
            scrolled
              ? "text-foreground hover:opacity-75"
              : "text-zinc-900 dark:text-white hover:opacity-75 drop-shadow-xs dark:drop-shadow-sm"
          }`}
        >
          {RESUME_DATA.profile.name}
        </button>

        <nav
          className={`flex items-center gap-4 sm:gap-5 text-xs transition-colors ${
            scrolled ? "text-muted-foreground" : "text-zinc-700 dark:text-zinc-200"
          }`}
        >
          <button
            onClick={() => scrollTo("experience")}
            className={`hidden sm:inline-block transition-colors ${
              scrolled
                ? "hover:text-foreground"
                : "hover:text-zinc-950 dark:hover:text-white drop-shadow-xs dark:drop-shadow-sm"
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className={`hidden sm:inline-block transition-colors ${
              scrolled
                ? "hover:text-foreground"
                : "hover:text-zinc-950 dark:hover:text-white drop-shadow-xs dark:drop-shadow-sm"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className={`px-3.5 py-1.5 rounded-full transition-colors text-xs font-semibold border ${
              scrolled
                ? "bg-muted hover:bg-foreground hover:text-background text-foreground border-border"
                : "bg-zinc-900/90 dark:bg-black/60 hover:bg-black dark:hover:bg-black/80 text-white border-zinc-700/80 dark:border-white/20 backdrop-blur-md shadow-sm"
            }`}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
