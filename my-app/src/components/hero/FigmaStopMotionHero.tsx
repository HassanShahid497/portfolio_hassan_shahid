"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const HERO_FRAMES = [
  {
    id: 1,
    src: "/hero-frames/frame1.webp",
    alt: "Hassan Shahid Portfolio - Animated Frame 1",
  },
  {
    id: 2,
    src: "/hero-frames/frame2.webp",
    alt: "Hassan Shahid Portfolio - Animated Frame 2",
  },
  {
    id: 3,
    src: "/hero-frames/frame3.webp",
    alt: "Hassan Shahid Portfolio - Animated Frame 3",
  },
  {
    id: 4,
    src: "/hero-frames/frame4.webp",
    alt: "Hassan Shahid Portfolio - Animated Frame 4",
  },
  {
    id: 5,
    src: "/hero-frames/frame5.webp",
    alt: "Hassan Shahid Portfolio - Animated Frame 5",
  },
];

// Frame duration: 220ms gives an authentic kinetic stop-motion movement effect (~4.5 FPS)
const FRAME_DURATION_MS = 220;

export function FigmaStopMotionHero() {
  const [currentFrame, setCurrentFrame] = useState(0);

  // Preload all 5 frames into memory immediately on mount to prevent any flicker
  useEffect(() => {
    HERO_FRAMES.forEach((frame) => {
      const img = new window.Image();
      img.src = frame.src;
    });
  }, []);

  // Continuous stop-motion animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % HERO_FRAMES.length);
    }, FRAME_DURATION_MS);

    return () => clearInterval(interval);
  }, []);

  const handleIdCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1050px] flex items-center justify-center overflow-hidden bg-[#142103] select-none"
      aria-label="Portfolio Hero Section - Stop-Motion Animated Composition"
    >
      {/* Background vignette that seamlessly blends into dark surroundings */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.45)_100%)] z-10" />

      {/* Main Animated Scene - Full Bleed Immersion */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {HERO_FRAMES.map((frame, index) => {
          const isActive = currentFrame === index;
          return (
            <div
              key={frame.id}
              className={`absolute inset-0 w-full h-full pointer-events-none ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                transition: "none", // Instant frame switch for authentic stop-motion movement
              }}
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                priority={index < 2}
                sizes="100vw"
                quality={92}
                className="object-contain md:object-cover object-center select-none"
                draggable={false}
              />
            </div>
          );
        })}

        {/* Interactive Clickable Hotspot over Hassan's ID Card to quickly jump to contact */}
        <button
          type="button"
          onClick={handleIdCardClick}
          title="Click to get in touch with Hassan"
          className="absolute left-[50%] top-[55%] -translate-x-1/2 -translate-y-1/2 w-[34%] h-[32%] z-20 cursor-pointer bg-transparent rounded-xl focus:outline-none"
          aria-label="Contact Hassan Shahid"
        />
      </div>
    </section>
  );
}

export default FigmaStopMotionHero;
