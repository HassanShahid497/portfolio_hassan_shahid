"use client";

import React, { useRef, useState, useCallback } from "react";
import { sound } from "@/lib/sound";

export function TactilePosterHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [phoneRinging, setPhoneRinging] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);

  // Mouse move handler for smooth 3D tilt on the pocket dump collage
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Scroll to contact form when phone is clicked
  const handlePhoneClick = () => {
    sound.playPhonePick();
    setPhoneRinging(true);
    setTimeout(() => setPhoneRinging(false), 1200);

    const targetEl = document.getElementById("contact-form") || document.getElementById("contact");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("first-name");
        if (input) {
          input.focus();
        }
      }, 700);
    }
  };

  const handleCollageClick = () => {
    sound.playClick(900);
  };

  // 3D tilt values with gentle damping
  const tiltX = isHovered ? -mousePos.y * 12 : 0;
  const tiltY = isHovered ? mousePos.x * 12 : 0;
  const transX = isHovered ? mousePos.x * 10 : 0;
  const transY = isHovered ? mousePos.y * 10 : 0;

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[640px] max-h-[1050px] flex flex-col items-center justify-center overflow-hidden bg-[#e5e4de] select-none px-4 sm:px-8 py-6 sm:py-8"
      style={{ perspective: "1200px" }}
    >
      {/* ========================================================================= */}
      {/* 1. LAYER 0: Authentic Crumpled Paper Texture Background from Figma        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img
          src="/figma-hero/white-paper-texture.png"
          alt="White Paper Texture"
          className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.98]"
          loading="eager"
        />
        {/* Soft paper vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.25)_0%,rgba(0,0,0,0.05)_100%)] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. LAYER 1: Interactive Hanging Vintage Telephone Receiver (Top-Right)     */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 right-5 xs:right-8 sm:right-12 md:right-16 lg:right-24 xl:right-32 z-30 flex flex-col items-center cursor-pointer group"
        onClick={handlePhoneClick}
        onMouseEnter={() => setPhoneHovered(true)}
        onMouseLeave={() => setPhoneHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Direct Contact: Click to call or open inquiry form"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePhoneClick();
          }
        }}
      >
        {/* Hanging Telephone Receiver Graphic with Natural Sway Animation */}
        <div
          className={`relative transition-transform duration-300 ease-out origin-top ${
            phoneRinging
              ? "animate-bounce"
              : phoneHovered
              ? "scale-105 rotate-3"
              : "animate-subtle-sway"
          }`}
          style={{
            transformOrigin: "top center",
          }}
        >
          <img
            src="/figma-hero/hanging-phone.png"
            alt="Hanging Phone Receiver"
            className="w-[45px] xs:w-[56px] sm:w-[70px] md:w-[84px] lg:w-[98px] xl:w-[108px] h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] select-none filter contrast-[1.05]"
            draggable={false}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTER CONTENT CONTAINER: Zoomed-out proportional layout               */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center justify-center flex-1 my-auto">
        {/* Title "Portfolio" (Figma Beau Rivage Font) */}
        <div className="w-full text-center pointer-events-none mb-[-2vw] sm:mb-[-1.5vw] md:mb-[-1vw] z-10">
          <h1
            className="font-beau-rivage text-zinc-950 font-normal leading-[0.88] select-none tracking-normal text-[clamp(3.8rem,8.5vw,8.5rem)] drop-shadow-[0_2px_5px_rgba(0,0,0,0.15)]"
            style={{
              fontFamily: "'Beau Rivage', var(--font-beau-rivage), cursive",
            }}
          >
            Portfolio
          </h1>
        </div>

        {/* Central Tactile Pocket Dump Collage with 3D Tilt Parallax */}
        <div className="w-full flex items-center justify-center z-20">
          <div
            onClick={handleCollageClick}
            className="relative cursor-pointer transition-transform duration-200 ease-out will-change-transform max-w-[85vw] sm:max-w-[70vw] md:max-w-[540px] lg:max-w-[620px] xl:max-w-[680px] max-h-[58vh] flex items-center justify-center"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${transX}px, ${transY}px, 0px)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Central Composite Collage: Hassan's ID card, knife, keys, money, earphones, band-aid, receipt */}
            <img
              src="/figma-hero/collage-cluster.png"
              alt="Tactile Pocket Dump: Hassan Shahid ID Card, Keys, Earbuds, Pocket Knife, Bills and Coins"
              className="w-full h-auto max-h-[58vh] object-contain select-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.30)] filter contrast-[1.03] transition-all duration-300 hover:brightness-105 active:scale-[0.98]"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* CSS Keyframe Animation for Phone Sway */}
      <style jsx global>{`
        @keyframes subtleSway {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-1.5deg);
          }
          75% {
            transform: rotate(1.5deg);
          }
        }
        .animate-subtle-sway {
          animation: subtleSway 4.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default TactilePosterHero;
