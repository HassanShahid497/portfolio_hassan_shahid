"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent?: boolean;
}

function Word({ children, progress, range, isAccent = false }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative inline-block mx-1 my-0.5">
      <span className="opacity-20 text-muted-foreground select-none">
        {children}
      </span>
      <motion.span
        style={{ opacity }}
        className={cn(
          "absolute inset-0 select-none",
          isAccent
            ? "text-emerald-500 dark:text-emerald-400 font-semibold"
            : "text-foreground font-medium"
        )}
      >
        {children}
      </motion.span>
    </span>
  );
}

export interface MotionScrollWordRevealProps {
  text: string;
  accentWords?: string[];
  eyebrow?: string;
  className?: string;
  containerClassName?: string;
}

export function MotionScrollWordReveal({
  text,
  accentWords = [],
  eyebrow = "Vision & Commitment",
  className,
  containerClassName,
}: MotionScrollWordRevealProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const words = text.split(/\s+/).filter(Boolean);
  const normalizedAccents = new Set(
    accentWords.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""))
  );

  return (
    <div
      ref={targetRef}
      className={cn("relative h-[160vh]", containerClassName)}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-6 pointer-events-none">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6 pointer-events-auto">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{eyebrow}</span>
            </div>
          )}

          <p
            className={cn(
              "flex flex-wrap justify-center text-lg sm:text-xl md:text-2xl font-mono leading-relaxed tracking-tight",
              className
            )}
          >
            {words.map((word, i) => {
              const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
              const isAccent = normalizedAccents.has(cleanWord);

              // Calculate staggered scroll reveal range
              const step = 0.82 / words.length;
              const start = 0.05 + i * step;
              const end = Math.min(1, start + step * 1.6);

              return (
                <Word
                  key={`${word}-${i}`}
                  progress={scrollYProgress}
                  range={[start, end]}
                  isAccent={isAccent}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
