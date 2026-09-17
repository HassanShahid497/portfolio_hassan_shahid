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

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-mono selection:bg-emerald-500 selection:text-black pb-28 sm:pb-20">
      <SmoothCursor />
      {/* Floating MagicUI Dock Navigation */}
      <PortfolioDock />

      {/* Top Navbar */}
      <Navbar />

      {/* Hero: Identity, ITU Credentials, Bio, and Quick Links */}
      <HeroSection />

      {/* Motion Scroll Word Reveal: Ambition & Deliverables */}
      <section id="vision" className="border-b border-border">
        <MotionScrollWordReveal
          eyebrow="Vision & Commitment"
          text="I build autonomous systems that bridge human intent with agentic intelligence. My ambition is to architect AI workflows that eliminate complex, repetitive toil—engineering intelligent automations, resilient backend architectures, and self-driving software that empower teams to achieve more with unprecedented speed and precision."
          accentWords={["autonomous", "agentic", "intelligence", "automations", "precision"]}
        />
      </section>

      {/* Experience: AI Labs (Discord Moderator & Twitter/X Manager) */}
      <ExperienceSection />

      {/* Projects: Agentic Automator, Discord Bot, C++ DSA, PostgreSQL */}
      <ProjectsSection />

      {/* Education: Information Technology University, 3.67 CGPA, Coursework */}
      <EducationSection />

      {/* Skills & Hobbies: Technical Matrix and Personal Interests */}
      <SkillsSection />

      {/* Contact: Direct Email, Phone, Location & Minimal Form */}
      <ContactSection />

      {/* Clean Modern Footer */}
      <footer className="border-t border-border bg-card/60 py-12 font-mono text-xs text-muted-foreground">
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
