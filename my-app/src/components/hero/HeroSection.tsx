"use client";

import React from "react";
import { StaticDesktopHero } from "./StaticDesktopHero";
import { HeroParallaxSample } from "./HeroParallaxSample";

export function HeroSection() {
  return (
    <>
      {/* Mobile: default original HeroParallaxSample */}
      <div className="block sm:hidden">
        <HeroParallaxSample />
      </div>

      {/* Desktop: StaticDesktopHero */}
      <div className="hidden sm:block">
        <StaticDesktopHero />
      </div>
    </>
  );
}
