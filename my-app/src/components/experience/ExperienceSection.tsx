"use client";

import React from "react";
import Image from "next/image";
import WarpText from "@/components/WarpText";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full bg-white text-black py-12 sm:py-16 md:py-24 flex justify-center items-center overflow-hidden"
    >
      {/* 1200 x 650 Landscape Editorial Canvas - Centralized */}
      <div className="relative w-full max-w-[1180px] mx-auto min-h-[650px] bg-white px-6 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 lg:gap-20 select-text">
        
        {/* ================= LEFT SIDE: Portrait & "ABOUT ME" ================= */}
        <div className="relative w-full md:w-auto flex flex-col items-center justify-center shrink-0 translate-x-[30px]">
          {/* Animated "ABOUT ME" with react-bits WarpText */}
          <div className="w-full max-w-[380px] sm:max-w-[420px] mb-[-95px] sm:mb-[-115px] md:mb-[-125px] z-20 flex justify-center">
            <WarpText
              text="ABOUT ME"
              color="#000000"
              warpStrength={0.18}
              warpScale={1.8}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.028}
              ripple
              fontSize="clamp(3rem, 10vw, 9rem)"
              fontWeight={800}
              style={{ height: '320px' }}
              letterSpacing={-0.08}
              lineHeight={1.14}
              align="center"
              fontFamily="var(--font-anton), var(--font-barlow-condensed), sans-serif"
              className="w-full cursor-pointer"
            />
          </div>

          {/* High-Contrast Halftone Portrait (clean_portrait.png) */}
          <div className="relative w-[300px] sm:w-[340px] md:w-[370px] lg:w-[400px] max-w-full flex justify-center">
            <Image
              src="/clean_portrait.png"
              alt="About Me — Halftone Portrait"
              width={2485}
              height={2855}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-none"
            />
          </div>
        </div>

        {/* ================= RIGHT SIDE: Editorial CV Layout ================= */}
        <div className="relative w-full md:w-[420px] lg:w-[460px] flex flex-col justify-between py-2 space-y-7 md:space-y-8 shrink-0 z-10 translate-x-[100px]">
          
          {/* SECTION 1: EXPERIENCE */}
          <div className="space-y-2">
            <div className="w-full max-w-[360px]">
              <WarpText
                text="EXPERIENCE"
                color="#000000"
                fontSize="clamp(2rem, 3.2vw, 2.75rem)"
                fontWeight={900}
                fontFamily="var(--font-anton), var(--font-barlow-condensed), sans-serif"
                letterSpacing="-0.03em"
                align="left"
                warpStrength={0.1}
                warpScale={2.0}
                speed={0.5}
                pointerInfluence={0.45}
                pointerStrength={0.4}
                className="h-[44px] sm:h-[48px] w-full cursor-pointer"
              />
            </div>
            <div className="font-sans text-[13px] sm:text-[14px] leading-[1.35] text-black space-y-1 tracking-tight font-normal pt-1">
              <p className="hover:translate-x-1.5 transition-transform duration-150 cursor-default">Chetenerrega 2023–2024</p>
              <p className="hover:translate-x-1.5 transition-transform duration-150 cursor-default">Magnolia by Daniela Peña 2024</p>
              <p className="hover:translate-x-1.5 transition-transform duration-150 cursor-default">ShopHowell 2024</p>
              <p className="hover:translate-x-1.5 transition-transform duration-150 cursor-default">Ochodias Studio Julio–Oct 2024</p>
              <p className="hover:translate-x-1.5 transition-transform duration-150 cursor-default">Freelance desde 2022</p>
            </div>
          </div>

          {/* SECTION 2: EDUCATION */}
          <div className="space-y-2">
            <div className="w-full max-w-[360px]">
              <WarpText
                text="EDUCATION"
                color="#000000"
                fontSize="clamp(2rem, 3.2vw, 2.75rem)"
                fontWeight={900}
                fontFamily="var(--font-anton), var(--font-barlow-condensed), sans-serif"
                letterSpacing="-0.03em"
                align="left"
                warpStrength={0.1}
                warpScale={2.0}
                speed={0.5}
                pointerInfluence={0.45}
                pointerStrength={0.4}
                className="h-[44px] sm:h-[48px] w-full cursor-pointer"
              />
            </div>
            <div className="font-sans text-[13px] sm:text-[14px] leading-[1.35] text-black tracking-tight font-normal pt-1">
              <p className="hover:translate-x-1.5 transition-transform duration-150 cursor-default">
                Information Technology University &apos;28
              </p>
            </div>
          </div>

          {/* SECTION 3: PROGRAMS */}
          <div className="space-y-2">
            <div className="w-full max-w-[360px]">
              <WarpText
                text="PROGRAMS"
                color="#000000"
                fontSize="clamp(2rem, 3.2vw, 2.75rem)"
                fontWeight={900}
                fontFamily="var(--font-anton), var(--font-barlow-condensed), sans-serif"
                letterSpacing="-0.03em"
                align="left"
                warpStrength={0.1}
                warpScale={2.0}
                speed={0.5}
                pointerInfluence={0.45}
                pointerStrength={0.4}
                className="h-[44px] sm:h-[48px] w-full cursor-pointer"
              />
            </div>
            <div className="font-sans text-[13px] sm:text-[14px] leading-[1.35] text-black tracking-tight font-normal pt-1">
              <p className="hover:translate-x-1.5 transition-transform duration-150 cursor-default">Figma Intermediate</p>
            </div>
          </div>

          {/* SECTION 4: LANGUAGES */}
          <div className="space-y-2">
            <div className="w-full max-w-[360px]">
              <WarpText
                text="LANGUAGES"
                color="#000000"
                fontSize="clamp(2rem, 3.2vw, 2.75rem)"
                fontWeight={900}
                fontFamily="var(--font-anton), var(--font-barlow-condensed), sans-serif"
                letterSpacing="-0.03em"
                align="left"
                warpStrength={0.1}
                warpScale={2.0}
                speed={0.5}
                pointerInfluence={0.45}
                pointerStrength={0.4}
                className="h-[44px] sm:h-[48px] w-full cursor-pointer"
              />
            </div>
            <div className="font-sans text-[13px] sm:text-[14px] leading-[1.35] text-black space-y-1 tracking-tight font-normal pt-1">
              <p className="hover:translate-x-1.5 transition-transform duration-150 cursor-default">Urdu – Native</p>
              <p className="hover:translate-x-1.5 transition-transform duration-150 cursor-default">English – C1 Advanced</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
