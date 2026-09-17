"use client";

import React from "react";
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

  return (
    <>
      <div
        className={`flex justify-center items-center py-6 ${className}`}
      >
        <div
          className={`flex justify-center items-center flex-nowrap overflow-x-auto sm:overflow-visible max-w-full px-2 py-4 ${containerClassName}`}
        >
          {cardList.map((item, idx) => {
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
              <div
                key={idx}
                className="group relative w-[265px] sm:w-[280px] lg:w-[290px] h-[395px] m-[20px_8px] sm:m-[25px_10px] md:m-[25px_12px] transition-all duration-500 shrink-0"
              >
                {/* Skewed gradient panels */}
                <span
                  className="absolute top-0 left-[35px] w-[52%] h-full rounded-lg transform skew-x-[14deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[12px] group-hover:w-[calc(100%-50px)]"
                  style={{
                    background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                  }}
                />
                <span
                  className="absolute top-0 left-[35px] w-[52%] h-full rounded-lg transform skew-x-[14deg] blur-[26px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[12px] group-hover:w-[calc(100%-50px)] opacity-85"
                  style={{
                    background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                  }}
                />

                {/* Animated blurs */}
                <span className="pointer-events-none absolute inset-0 z-10">
                  <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.12)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-35px] group-hover:left-[35px] group-hover:w-[75px] group-hover:h-[75px] group-hover:opacity-100" />
                  <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.12)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-35px] group-hover:right-[35px] group-hover:w-[75px] group-hover:h-[75px] group-hover:opacity-100" />
                </span>

                {/* Content Card with high-contrast backing for crystal-clear readability */}
                <div className="relative z-20 left-0 p-5 bg-[#0a0a0f]/95 dark:bg-[#0a0a0f]/95 border border-white/20 backdrop-blur-2xl shadow-2xl rounded-xl text-white transition-all duration-500 group-hover:left-[-14px] group-hover:border-white/40 flex flex-col justify-between h-full">
                  <div>
                    {/* Category & Icon Header */}
                    <div className="flex items-center justify-between mb-2">
                      {category && (
                        <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-black/90 text-white border border-white/20 shadow-xs">
                          {category}
                        </span>
                      )}
                      {icon && <div className="text-white drop-shadow-md">{icon}</div>}
                    </div>

                    {/* Image Preview */}
                    {image && (
                      <div className="relative w-full h-24 mb-2.5 rounded-lg overflow-hidden border border-white/15 bg-black/60 shadow-xs">
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      </div>
                    )}

                    <h2 className="text-base sm:text-lg font-bold font-mono tracking-tight mb-1.5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {title}
                    </h2>
                    <p className="text-[11px] sm:text-xs font-sans leading-relaxed text-zinc-200 line-clamp-3 group-hover:line-clamp-none transition-all duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-white/15 mt-auto">
                    <a
                      href={link || "#"}
                      target={link && link.startsWith("http") ? "_blank" : undefined}
                      rel={link && link.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        sound.playClick(1100);
                        if (onActionClick) {
                          onActionClick(item, idx);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-black bg-white px-3 py-1.5 rounded hover:bg-emerald-400 hover:text-black hover:border-emerald-300 hover:shadow-lg transition-all duration-200 active:scale-95"
                    >
                      <span>{actionText}</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tailwind custom utilities for animation and shadows */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(8px); }
          50% { transform: translate(-8px); }
        }
        .animate-blob { animation: blob 2s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1s; }
        .shadow-\[0_5px_15px_rgba\(0,0,0,0.08\) { box-shadow: 0 5px 15px rgba(0,0,0,0.08); }
      `}</style>
    </>
  );
}
