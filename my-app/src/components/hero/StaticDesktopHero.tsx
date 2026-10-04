"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { sound } from "@/lib/sound";

export function StaticDesktopHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic hotspot positioning that tracks the ID card perfectly across any window size
  // In the updated 1920x1080 Figma frame:
  // ID card is at x: 758.79, y: 534.37, width: 348.17, height: 248.63
  const [hotspotStyle, setHotspotStyle] = useState<React.CSSProperties>({
    left: "39.5%",
    top: "49.5%",
    width: "18.1%",
    height: "23%",
  });

  useEffect(() => {
    const updateHotspot = () => {
      if (!containerRef.current) return;
      const { clientWidth: W, clientHeight: H } = containerRef.current;
      if (W === 0 || H === 0) return;

      // Calculate object-cover scale & offset for 1920x1080 design
      const scale = Math.max(W / 1920, H / 1080);
      const imgW = 1920 * scale;
      const imgH = 1080 * scale;
      const offsetX = (W - imgW) / 2;
      const offsetY = (H - imgH) / 2;

      // Exact pixel coordinates of the ID card in updated 1920x1080 Figma frame
      const left = offsetX + 758.79 * scale;
      const top = offsetY + 534.37 * scale;
      const width = 348.17 * scale;
      const height = 248.63 * scale;

      setHotspotStyle({
        left: `${(left / W) * 100}%`,
        top: `${(top / H) * 100}%`,
        width: `${(width / W) * 100}%`,
        height: `${(height / H) * 100}%`,
      });
    };

    updateHotspot();

    const resizeObserver = new ResizeObserver(updateHotspot);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener("resize", updateHotspot);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHotspot);
    };
  }, []);

  const handleIdCardClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    try {
      sound.playClick(950);
    } catch {
      // AudioContext fallback
    }

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#24120e] select-none"
      aria-label="Portfolio Hero Section - Hassan Shahid"
    >
      {/* ========================================================================= */}
      {/* 1. Full-Bleed 1920x1080 Figma Frame (Node 55:808)                          */}
      {/* Covers 100% of viewport dynamically: no rectangles or borders on sides   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <Image
          src="/hero/desktop-hero-1920.webp"
          alt="Hassan Shahid Portfolio - Creative Engineering & AI Automation"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center select-none pointer-events-none"
          draggable={false}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. Interactive Static Hotspot over ID Card (Zero hover movement)          */}
      {/* Perfectly tracked to the ID card position at any window size               */}
      {/* ========================================================================= */}
      <button
        type="button"
        onClick={handleIdCardClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleIdCardClick(e);
          }
        }}
        title="Click to get in touch with Hassan"
        style={hotspotStyle}
        className="absolute z-20 cursor-pointer rounded-md focus:outline-none group"
        aria-label="Contact Hassan Shahid - Jump to contact section"
      >
        {/* Subtle static hover highlight border - no movement or scaling */}
        <div className="absolute inset-0 rounded-md border-2 border-white/40 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-[0_4px_20px_rgba(0,0,0,0.4)]" />

        {/* Static floating tooltip badge on hover - no translation or movement */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3.5 py-1 text-[11px] font-mono tracking-wider uppercase text-white bg-black/90 backdrop-blur-md rounded-full shadow-2xl border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
          Get in Touch
        </span>
      </button>
    </div>
  );
}

export default StaticDesktopHero;
