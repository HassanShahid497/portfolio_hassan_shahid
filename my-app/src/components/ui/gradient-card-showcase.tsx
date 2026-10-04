"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sound } from "@/lib/sound";

export interface SkewCardItem {
  title: string;
  desc: string;
  gradientFrom: string;
  gradientTo: string;
  link?: string;
  actionText?: string;
  category?: string;
  icon?: React.ReactNode;
  image?: string;
}

const defaultCards: SkewCardItem[] = [
  {
    title: "Card one",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    gradientFrom: "#ffbc00",
    gradientTo: "#ff0058",
    actionText: "Read More",
  },
  {
    title: "Card two",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    actionText: "Read More",
  },
  {
    title: "Card three",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    gradientFrom: "#00e676",
    gradientTo: "#00b4d8",
    actionText: "Read More",
  },
];

export interface SkewCardsProps {
  items?: SkewCardItem[];
  className?: string;
  containerClassName?: string;
  onActionClick?: (item: SkewCardItem, index: number) => void;
}

export default function SkewCards({
  items = defaultCards,
  className = "",
  containerClassName = "",
  onActionClick,
}: SkewCardsProps) {
  const cardList = items && items.length > 0 ? items : defaultCards;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    sound.playClick(1400);
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % cardList.length);
  };

  const handlePrev = () => {
    sound.playClick(1100);
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + cardList.length) % cardList.length);
  };

  const visibleCards = Array.from({ length: visibleCount }).map((_, i) => {
    const idx = (currentIndex + i) % cardList.length;
    return cardList[idx];
  });

  return (
    <div className={`flex flex-col justify-center items-center w-full relative ${className}`}>
      {/* Centered Showcase Row with Symmetrical Angled Navigation Buttons */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 py-4">
        {/* Left Angled Navigation Button */}
        <button
          type="button"
          onClick={handlePrev}
          onMouseEnter={() => sound.playPing(1800)}
          aria-label="Previous Project"
          className="shrink-0 group p-3 sm:p-4 rounded-xl bg-card/90 dark:bg-[#0c0d12]/95 border border-emerald-500/40 hover:border-emerald-400 dark:border-white/10 dark:hover:border-emerald-400/80 backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-300 -skew-x-12 hover:-skew-x-6 hover:scale-105 active:scale-95 cursor-pointer z-30"
        >
          <div className="skew-x-12 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 dark:text-emerald-400 group-hover:-translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Perfectly Centered Cards Flex Row */}
        <div className={`flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 ${containerClassName}`}>
          <AnimatePresence initial={false} mode="popLayout">
            {visibleCards.map((item, idx) => {
              const {
                title,
                desc,
                gradientFrom,
                gradientTo,
                link,
                actionText = "Read More",
                category,
                icon,
                image,
              } = item;

              return (
                <motion.div
                  key={title}
                  layout="position"
                  initial={{
                    opacity: 0,
                    x: direction === "next" ? 45 : -45,
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: direction === "next" ? -45 : 45,
                    scale: 0.94,
                  }}
                  transition={{
                    layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.3, ease: "easeOut" },
                    scale: { duration: 0.3, ease: "easeOut" },
                    x: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="group relative w-[82vw] max-w-[285px] sm:w-[280px] lg:w-[290px] h-[395px] shrink-0"
                >
                  {/* Skewed gradient panels */}
                  <span
                    className="absolute top-0 left-[16px] sm:left-[35px] w-[calc(100%-32px)] sm:w-[52%] h-full rounded-lg transform skew-x-0 sm:skew-x-[14deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[12px] group-hover:w-[calc(100%-50px)]"
                    style={{
                      background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                    }}
                  />
                  <span
                    className="absolute top-0 left-[16px] sm:left-[35px] w-[calc(100%-32px)] sm:w-[52%] h-full rounded-lg transform skew-x-0 sm:skew-x-[14deg] blur-[22px] sm:blur-[26px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[12px] group-hover:w-[calc(100%-50px)] opacity-85"
                    style={{
                      background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                    }}
                  />

                  {/* Animated corner glass blobs */}
                  <span className="pointer-events-none absolute inset-0 z-10">
                    <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-white/40 dark:bg-[rgba(255,255,255,0.12)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-35px] group-hover:left-[35px] group-hover:w-[75px] group-hover:h-[75px] group-hover:opacity-100" />
                    <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-white/40 dark:bg-[rgba(255,255,255,0.12)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-35px] group-hover:right-[35px] group-hover:w-[75px] group-hover:h-[75px] group-hover:opacity-100" />
                  </span>

                  {/* Content Card with high contrast */}
                  <div className="relative z-20 left-0 p-5 bg-card/95 dark:bg-[#0a0a0f]/95 border border-border dark:border-white/20 backdrop-blur-2xl shadow-xl dark:shadow-2xl rounded-xl text-card-foreground dark:text-white transition-all duration-500 group-hover:left-[-14px] group-hover:border-zinc-400/70 dark:group-hover:border-white/40 flex flex-col justify-between h-full">
                    <div>
                      {/* Category & Icon Header */}
                      <div className="flex items-center justify-between mb-2">
                        {category && (
                          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-black/90 text-zinc-800 dark:text-white border border-zinc-200/80 dark:border-white/20 shadow-xs">
                            {category}
                          </span>
                        )}
                        {icon && <div className="text-zinc-800 dark:text-white drop-shadow-xs dark:drop-shadow-md">{icon}</div>}
                      </div>

                      {/* Image Preview */}
                      {image && (
                        <div className="relative w-full h-24 mb-2.5 rounded-lg overflow-hidden border border-zinc-200/80 dark:border-white/15 bg-zinc-100 dark:bg-black/60 shadow-xs">
                          <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/85 dark:via-black/25 dark:to-transparent" />
                        </div>
                      )}

                      <h2 className="text-base sm:text-lg font-bold font-mono tracking-tight mb-1.5 text-zinc-900 dark:text-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {title}
                      </h2>
                      <p className="text-[11px] sm:text-xs font-sans leading-relaxed text-zinc-600 dark:text-zinc-300 line-clamp-3 group-hover:line-clamp-none transition-all duration-300 dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-zinc-200/80 dark:border-white/15 mt-auto">
                      <a
                        href={link || "#"}
                        target={link && link.startsWith("http") ? "_blank" : undefined}
                        rel={link && link.startsWith("http") ? "noopener noreferrer" : undefined}
                        onClick={() => {
                          sound.playClick(1100);
                          if (onActionClick) {
                            onActionClick(item, idx);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-white dark:text-black bg-zinc-900 dark:bg-white px-3 py-1.5 rounded hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-black hover:shadow-lg transition-all duration-200 active:scale-95"
                      >
                        <span>{actionText}</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Angled Navigation Button */}
        <button
          type="button"
          onClick={handleNext}
          onMouseEnter={() => sound.playPing(2200)}
          aria-label="Next Project"
          className="shrink-0 group p-3 sm:p-4 rounded-xl bg-card/90 dark:bg-[#0c0d12]/95 border border-emerald-500/40 hover:border-emerald-400 dark:border-white/10 dark:hover:border-emerald-400/80 backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-300 skew-x-12 hover:skew-x-6 hover:scale-105 active:scale-95 cursor-pointer z-30"
        >
          <div className="-skew-x-12 flex items-center justify-center">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {cardList.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to project ${i + 1}`}
            onClick={() => {
              sound.playClick(1200);
              setDirection(i > currentIndex ? "next" : "prev");
              setCurrentIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === i
                ? "w-8 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>

      {/* Custom utilities */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(8px); }
          50% { transform: translate(-8px); }
        }
        .animate-blob { animation: blob 2s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1s; }
      `}</style>
    </div>
  );
}
