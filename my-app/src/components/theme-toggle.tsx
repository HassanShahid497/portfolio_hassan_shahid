"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  AnimatedThemeToggler,
  type TransitionVariant,
} from "@/components/ui/animated-theme-toggler";
import { sound } from "@/lib/sound";

interface ThemeToggleProps {
  className?: string;
  variant?: TransitionVariant;
}

export function ThemeToggle({
  className = "p-2 rounded-lg border border-border bg-card/80 hover:bg-muted text-foreground transition-colors flex items-center justify-center [&_svg]:size-4 cursor-pointer",
  variant = "circle",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`size-8 rounded-lg border border-border bg-card/50 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const currentTheme = (resolvedTheme === "light" ? "light" : "dark") as
    | "light"
    | "dark";

  return (
    <AnimatedThemeToggler
      theme={currentTheme}
      onThemeChange={(nextTheme) => {
        sound.playClick(1500);
        setTheme(nextTheme);
      }}
      variant={variant}
      duration={450}
      className={className}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
    />
  );
}
