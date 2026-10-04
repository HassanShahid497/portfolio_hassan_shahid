"use client";

import React from "react";
import { StaticDesktopHero } from "./StaticDesktopHero";
import { MobileHero } from "./MobileHero";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full" aria-label="Hero Section">
      {/* Mobile (< md): Previous sleek animated hero tailored for mobile screens */}
      <div className="block md:hidden">
        <MobileHero />
      </div>

      {/* Desktop (>= md): New full-screen Figma 1920x1080 room scene */}
      <div className="hidden md:block">
        <StaticDesktopHero />
      </div>
    </section>
  );
}

