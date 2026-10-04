"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const FONT_STYLES_BY_WORD: Record<string, string> = {
  I: "font-playfair italic font-normal tracking-wide text-zinc-300 dark:text-zinc-200",
  BUILD: "font-anton font-normal uppercase tracking-wider text-zinc-100 dark:text-white",
  AUTONOMOUS: "font-syne font-extrabold uppercase tracking-tight text-emerald-400",
  SYSTEMS: "font-pixelta font-normal uppercase tracking-wide text-emerald-400",
  THAT: "font-barlow font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-300",
  BRIDGE: "font-anton font-normal uppercase tracking-wider text-zinc-200 dark:text-white",
  HUMAN: "font-playfair italic font-normal text-emerald-400",
  INTENT: "font-pixelify font-bold uppercase tracking-widest text-emerald-400",
  WITH: "font-playfair italic font-light text-zinc-400 dark:text-zinc-300",
  AGENTIC: "font-syne font-extrabold uppercase tracking-tight text-emerald-400",
  INTELLIGENCE: "font-mono font-bold uppercase tracking-tighter text-emerald-400",
  AND: "font-barlow font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-300",
  EFFORTLESS: "font-anton font-normal uppercase tracking-wider text-zinc-100 dark:text-white",
  AUTOMATION: "font-pixelta font-normal uppercase tracking-wider text-emerald-400",
};

const INDIE_FONT_CYCLES = [
  "font-playfair italic font-normal",
  "font-anton font-normal uppercase tracking-wider",
  "font-syne font-bold uppercase tracking-tight",
  "font-pixelta font-normal uppercase tracking-wide",
  "font-mono font-semibold uppercase tracking-tight",
  "font-barlow font-bold uppercase tracking-widest",
];

interface ScrambleCharProps {
  char: string;
  charIndex: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
  isAccent?: boolean;
  fontStyle?: string;
}

function ScrambleChar({
  char,
  charIndex,
  totalChars,
  scrollYProgress,
  isAccent = false,
  fontStyle = "font-sans font-light",
}: ScrambleCharProps) {
  // Stagger timing across scroll progress range (0.04 -> 0.62)
  // All letters finish flying into place by ~62% scroll progress for a fast, fluid experience
  const start = 0.04 + (charIndex / totalChars) * 0.44;
  const end = start + 0.14;

  // Wide 3D scatter offsets so letters are completely unarranged & floating like cereals in a bowl before scroll
  const { initialX, initialY, initialRotate, initialRotateX } = useMemo(() => {
    const angle = (charIndex / totalChars) * Math.PI * 6 + (charIndex % 5) * 1.1;
    const radius = 65 + ((charIndex * 31) % 170); // 65px to 235px wide scatter radius
    const initialX = Math.cos(angle) * radius + (charIndex % 2 === 0 ? 30 : -30);
    const initialY = Math.sin(angle) * (radius * 0.6) + (charIndex % 3 === 0 ? -40 : 40);
    const initialRotate = ((charIndex * 19) % 52) - 26; // -26deg to +26deg
    const initialRotateX = ((charIndex * 23) % 36) - 18; // -18deg to +18deg

    return { initialX, initialY, initialRotate, initialRotateX };
  }, [charIndex, totalChars]);

  // Framer Motion transforms mapped with 4 keyframes [0, start, end, 1]
  const x = useTransform(scrollYProgress, [0, start, end, 1], [initialX, initialX, 0, 0]);
  const y = useTransform(scrollYProgress, [0, start, end, 1], [initialY, initialY, 0, 0]);
  const rotate = useTransform(scrollYProgress, [0, start, end, 1], [initialRotate, initialRotate, 0, 0]);
  const rotateX = useTransform(scrollYProgress, [0, start, end, 1], [initialRotateX, initialRotateX, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, start, end, 1], [0.88, 0.88, 1, 1]);

  // Blurry silhouette effect melting into crisp sharp letters
  const opacity = useTransform(scrollYProgress, [0, start, end, 1], [0.35, 0.35, 1, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, start, end, 1],
    ["blur(12px)", "blur(12px)", "blur(0px)", "blur(0px)"]
  );

  const accentGlow = useTransform(
    scrollYProgress,
    [0, start, end, 1],
    [
      "drop-shadow(0px 0px 6px rgba(16,185,129,0.2))",
      "drop-shadow(0px 0px 6px rgba(16,185,129,0.2))",
      "drop-shadow(0px 0px 22px rgba(16,185,129,0.55))",
      "drop-shadow(0px 0px 22px rgba(16,185,129,0.55))",
    ]
  );

  return (
    <motion.span
      style={{
        x,
        y,
        rotate,
        rotateX,
        scale,
        opacity,
        filter,
        perspective: 1000,
      }}
      className="inline-block relative select-none will-change-transform px-[0.03em]"
    >
      <motion.span
        style={isAccent ? { filter: accentGlow } : undefined}
        className={cn(
          "inline-block transition-colors duration-300",
          fontStyle,
          isAccent
            ? "text-emerald-400"
            : "text-zinc-900 dark:text-white"
        )}
      >
        {char}
      </motion.span>
    </motion.span>
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
  eyebrow = "Vision & Core Ambition",
  className,
  containerClassName,
}: ScrambleScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth MotionValues for eyebrow and background radial glow driven directly by scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const eyebrowY = useTransform(scrollYProgress, [0, 0.3], [12, 0]);
  const progressHintOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0.6, 0]);

  const words = text.split(/\s+/).filter(Boolean);
  const normalizedAccents = useMemo(
    () => new Set(accentWords.map((w) => w.toUpperCase().replace(/[^A-Z0-9]/g, ""))),
    [accentWords]
  );

  // Deconstruct sentence into words containing indexed characters with artistic indie fonts
  const { wordsWithCharIndices, totalChars } = useMemo(() => {
    let globalCharCount = 0;
    const wordObjs = words.map((word, wordIdx) => {
      const clean = word.toUpperCase().replace(/[^A-Z0-9]/g, "");
      const isAccent = normalizedAccents.has(clean);
      const fontStyle =
        FONT_STYLES_BY_WORD[clean] || INDIE_FONT_CYCLES[wordIdx % INDIE_FONT_CYCLES.length];

      const chars = word.split("").map((char) => {
        const idx = globalCharCount++;
        return { char, index: idx, isAccent, fontStyle };
      });
      return { word, isAccent, fontStyle, chars };
    });
    return { wordsWithCharIndices: wordObjs, totalChars: globalCharCount };
  }, [words, normalizedAccents]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[200vh] w-full", containerClassName)}
    >
      {/* Sticky Fullscreen Presentation Window */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 pointer-events-none select-none">
        {/* Ambient Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-0"
          style={{ opacity: glowOpacity }}
        >
          <div className="w-[650px] h-[650px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[130px]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[92vw] lg:max-w-[85vw] mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8 pointer-events-auto">
          {/* Eyebrow Tag */}
          {eyebrow && (
            <motion.div
              style={{
                opacity: eyebrowOpacity,
                y: eyebrowY,
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-black/80 border border-zinc-300 dark:border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-widest uppercase shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{eyebrow}</span>
            </motion.div>
          )}

          {/* Letter-by-Letter Words Container with Artistic Indie Fonts */}
          <div
            className={cn(
              "w-full flex flex-wrap items-center justify-center text-center text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.15] sm:leading-[1.1] tracking-tight gap-x-[0.34em] gap-y-[0.12em]",
              className
            )}
          >
            {wordsWithCharIndices.map((wordObj, wordIdx) => (
              <span key={`word-${wordIdx}`} className="inline-flex whitespace-nowrap">
                {wordObj.chars.map((charObj) => (
                  <ScrambleChar
                    key={`char-${charObj.index}`}
                    char={charObj.char}
                    charIndex={charObj.index}
                    totalChars={totalChars}
                    scrollYProgress={scrollYProgress}
                    isAccent={charObj.isAccent}
                    fontStyle={charObj.fontStyle}
                  />
                ))}
              </span>
            ))}
          </div>

          {/* Scroll Progress Hint */}
          <motion.div
            style={{ opacity: progressHintOpacity }}
            className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-muted-foreground tracking-widest uppercase pt-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-ping" />
            <span>Scroll to assemble vision</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ScrambleScrollReveal;




