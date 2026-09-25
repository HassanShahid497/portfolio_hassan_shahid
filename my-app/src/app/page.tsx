"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { EducationSection } from "@/components/education/EducationSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { RESUME_DATA } from "@/lib/data";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { PortfolioDock } from "@/components/layout/PortfolioDock";
import { MotionScrollWordReveal } from "@/components/ui/motion-scroll-word-reveal";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-emerald-500 selection:text-black pb-28 sm:pb-20">
      {/* Global Interactive Flow Motion Dot Pattern */}
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={0.9}
        interactive={true}
        flowRadius={170}
        flowIntensity={1.3}
        waveAnimation={true}
        className={cn(
          "fixed inset-0 h-full w-full pointer-events-none z-0",
        )}
      />

      <SmoothCursor />
      {/* Floating MagicUI Dock Navigation */}
      <PortfolioDock />

      {/* Top Navbar */}
      <Navbar />

      {/* Hero: Identity, ITU Credentials, Bio, and Quick Links */}
      <HeroSection />

      {/* Motion Scroll Word Reveal: Ambition & Deliverables */}
      <section id="vision" className="relative z-10 bg-background/50 backdrop-blur-[1px]">
        <MotionScrollWordReveal
          eyebrow="Vision & Commitment"
          text="I build autonomous systems that bridge human intent with agentic intelligence. My ambition is to architect AI workflows that eliminate complex, repetitive toil—engineering intelligent automations, resilient backend architectures, and self-driving software that empower teams to achieve more with unprecedented speed and precision."
          accentWords={["autonomous", "agentic", "intelligence", "automations", "precision"]}
        />
      </section>

      {/* Experience: AI Labs (Discord Moderator & Twitter/X Manager) */}
      <div className="relative z-10">
        <ExperienceSection />
      </div>

      {/* Projects: Agentic Automator, Discord Bot, C++ DSA, PostgreSQL */}
      <div className="relative z-10">
        <ProjectsSection />
      </div>

      {/* Education: Information Technology University, 3.67 CGPA, Coursework */}
      <div className="relative z-10">
        <EducationSection />
      </div>

      {/* Skills & Hobbies: Technical Matrix and Personal Interests */}
      <div className="relative z-10">
        <SkillsSection />
      </div>

      {/* Contact: Direct Email, Phone, Location & Minimal Form */}
      <div className="relative z-10">
        <ContactSection />
      </div>

      {/* Clean Modern Footer */}
      <footer className="relative z-10 bg-card/40 py-12 font-mono text-xs text-muted-foreground">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-bold">{RESUME_DATA.profile.name}</span>
            <span className="text-zinc-400 dark:text-zinc-600">/</span>
            <span className="text-muted-foreground">Software Engineering @ ITU</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-muted-foreground">
            <span>{RESUME_DATA.profile.location}</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
