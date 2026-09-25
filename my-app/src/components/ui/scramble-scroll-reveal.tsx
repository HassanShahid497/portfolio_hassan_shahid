"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*~<>?/{}[]=+§ΔΩΨЖ";

interface ScrambleWordProps {
  word: string;
  index: number;
  totalWords: number;
  progress: number;
  isAccent?: boolean;
}

function ScrambleWord({
  word,
  index,
  totalWords,
  progress,
  isAccent = false,
}: ScrambleWordProps) {
  // Stagger start and end for each word across scroll 0.05 -> 0.90
  const start = 0.08 + (index / totalWords) * 0.72;
  const end = start + 0.12;

  // Compute normalized progress for this specific word (0 = fully scrambled/submerged, 1 = fully surfaced & resolved)
  const wordProgress = Math.max(0, Math.min(1, (progress - start) / (end - start)));

  // Generate scrambled text
  const [displayText, setDisplayText] = useState(word);

  useEffect(() => {
    if (wordProgress >= 1) {
      setDisplayText(word);
      return;
    }

    if (wordProgress <= 0) {
      // Pre-scroll: scrambled glyphs
      let scramble = "";
      for (let i = 0; i < word.length; i++) {
        // Keep punctuation, scramble letters
        if (/[^a-zA-Z0-9]/.test(word[i])) {
          scramble += word[i];
        } else {
          const charCode = (word.charCodeAt(i) + index * 7) % GLYPHS.length;
          scramble += GLYPHS[charCode];
        }
      }
      setDisplayText(scramble);
      return;
    }

    // Active scrambling transition as progress moves from 0 to 1
    const resolvedCharCount = Math.floor(wordProgress * word.length);
    let current = "";
    for (let i = 0; i < word.length; i++) {
      if (i < resolvedCharCount) {
        current += word[i];
      } else if (/[^a-zA-Z0-9]/.test(word[i])) {
        current += word[i];
      } else {
        const randIndex = Math.floor(Math.random() * GLYPHS.length);
        current += GLYPHS[randIndex];
      }
    }
    setDisplayText(current);
  }, [wordProgress, word, index]);

  // Visual surfacing & rearranging calculations:
  // Submerged state: blur 14px, translate-y 50px, rotate, scale 0.85, opacity 0.15
  // Surfaced state: blur 0px, translate-y 0px, rotate 0deg, scale 1, opacity 1
  const blur = (1 - wordProgress) * 14;
  const translateY = (1 - wordProgress) * 55;
  const rotateX = (1 - wordProgress) * 35;
  const rotateZ = (1 - wordProgress) * (index % 2 === 0 ? 6 : -6);
  const scale = 0.85 + wordProgress * 0.15;
  const opacity = 0.12 + wordProgress * 0.88;

  return (
    <span
      className="inline-block relative px-1 sm:px-2 md:px-3 py-1 select-none will-change-transform"
      style={{
        transform: `perspective(800px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
        filter: `blur(${blur}px)`,
        opacity,
        transition: "transform 0.05s ease-out, filter 0.05s ease-out, opacity 0.05s ease-out",
      }}
    >
      <span
        className={cn(
          "transition-colors duration-300 font-extrabold tracking-tighter uppercase",
          isAccent
            ? wordProgress >= 0.85
              ? "text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              : "text-emerald-600/60 dark:text-emerald-500/60"
            : wordProgress >= 0.85
            ? "text-zinc-950 dark:text-white"
            : "text-zinc-500 dark:text-zinc-500"
        )}
      >
        {displayText}
      </span>
    </span>
  );
}

export interface ScrambleScrollRevealProps {
  text?: string;
  accentWords?: string[];
  eyebrow?: string;
  className?: string;
  containerClassName?: string;
}

export function ScrambleScrollReveal({
  text = "I ARCHITECT AUTONOMOUS AI SYSTEMS & RESILIENT WORKFLOWS THAT BRIDGE INTENT WITH EFFORTLESS AUTOMATION.",
  accentWords = ["AUTONOMOUS", "AI", "SYSTEMS", "WORKFLOWS", "AUTOMATION", "INTENT"],
  eyebrow = "Vision & Ambition",
  className,
  containerClassName,
}: ScrambleScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  const words = text.split(/\s+/).filter(Boolean);
  const normalizedAccents = new Set(
    accentWords.map((w) => w.toUpperCase().replace(/[^A-Z0-9]/g, ""))
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[250vh] w-full", containerClassName)}
    >
      {/* Sticky Fullscreen Presentation Window */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 pointer-events-none select-none">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700 flex items-center justify-center z-0"
          style={{
            opacity: 0.3 + scrollProgress * 0.7,
          }}
        >
          <div className="w-[600px] h-[600px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-[90vw] lg:max-w-[82vw] mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8 pointer-events-auto">
          {/* Eyebrow Tag */}
          {eyebrow && (
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-black/80 border border-zinc-300 dark:border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-widest uppercase shadow-sm transition-all duration-300"
              style={{
                opacity: Math.min(1, 0.4 + scrollProgress * 1.5),
                transform: `translateY(${(1 - Math.min(1, scrollProgress * 2)) * 15}px)`,
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{eyebrow}</span>
            </div>
          )}

          {/* Monumental Giant Words Container Covering ~75%+ of the Screen */}
          <div
            className={cn(
              "w-full flex flex-wrap items-center justify-center text-center font-pixelta text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.2vw] leading-[1.05] sm:leading-[1.02] tracking-tight",
              className
            )}
          >
            {words.map((word, i) => {
              const clean = word.toUpperCase().replace(/[^A-Z0-9]/g, "");
              const isAccent = normalizedAccents.has(clean);

              return (
                <ScrambleWord
                  key={`${word}-${i}`}
                  word={word}
                  index={i}
                  totalWords={words.length}
                  progress={scrollProgress}
                  isAccent={isAccent}
                />
              );
            })}
          </div>

          {/* Bottom Progress Hint */}
          <div
            className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-muted-foreground tracking-widest uppercase transition-opacity duration-300 pt-2"
            style={{
              opacity: scrollProgress > 0.92 ? 0 : 0.6,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-ping" />
            <span>Scroll to decrypt vision</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrambleScrollReveal;
