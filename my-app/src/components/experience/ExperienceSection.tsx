"use client";

import React from "react";
import { RESUME_DATA } from "@/lib/data";
import { KineticText } from "@/components/ui/kinetic-text";

// Discord SVG Icon
function DiscordIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// X (Twitter) SVG Icon
function XIcon({ className = "w-3 h-3" }: { className?: string }) {
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

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 border-b border-border">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">
            Experience
          </div>
          <KineticText
            text="Work History"
            as="h2"
            className="text-2xl sm:text-3xl font-pixelta text-foreground tracking-wide"
          />
        </div>

        {/* Experience List */}
        <div className="space-y-8">
          {RESUME_DATA.experience.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-card border border-border hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors space-y-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-border text-xs font-mono">
                <span className="font-bold text-foreground text-sm tracking-wide">
                  {item.company}
                </span>
                <span className="text-muted-foreground">{item.period}</span>
              </div>

              <div className="space-y-5">
                {item.roles.map((role, rIdx) => {
                  const isDiscord = role.title.toLowerCase().includes("discord");
                  const isX =
                    role.title.toLowerCase().includes("twitter") ||
                    role.title.toLowerCase().includes("/ x");

                  return (
                    <div key={rIdx} className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        {isDiscord && (
                          <span
                            className="w-6 h-6 rounded-full bg-[#5865F2]/10 dark:bg-[#5865F2]/20 border border-[#5865F2]/30 text-[#5865F2] flex items-center justify-center shrink-0 shadow-xs"
                            title="Discord"
                          >
                            <DiscordIcon className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {isX && (
                          <span
                            className="w-6 h-6 rounded-full bg-zinc-900/10 dark:bg-white/10 border border-zinc-900/20 dark:border-white/20 text-zinc-900 dark:text-white flex items-center justify-center shrink-0 shadow-xs"
                            title="X (Twitter)"
                          >
                            <XIcon className="w-3 h-3" />
                          </span>
                        )}
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
                          {role.title}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pl-0 sm:pl-8.5">
                        {role.summary}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-muted border border-border text-[11px] font-mono text-zinc-600 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
