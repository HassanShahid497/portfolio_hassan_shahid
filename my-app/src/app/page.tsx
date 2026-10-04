"use client";

import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { StaggeredMenu } from "@/components/ui/StaggeredMenu";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { RESUME_DATA } from "@/lib/data";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { PortfolioDock } from "@/components/layout/PortfolioDock";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Home", ariaLabel: "Go to hero section", link: "#hero" },
  { label: "Experience", ariaLabel: "View work experience", link: "#experience" },
  { label: "Projects", ariaLabel: "View featured projects", link: "#projects" },
  { label: "Contact", ariaLabel: "Get in touch with Hassan", link: "#contact" },
];

const socialItems = [
  { label: "Twitter", link: RESUME_DATA.profile.twitter },
  { label: "LinkedIn", link: RESUME_DATA.profile.linkedin },
  { label: "GitHub", link: RESUME_DATA.profile.github },
  { label: "Email", link: `mailto:${RESUME_DATA.profile.email}` },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-zinc-900 selection:text-white">

      <SmoothCursor />

      {/* React Bits StaggeredMenu pinned on the top left of the page */}
      <StaggeredMenu
        position="left"
        isFixed={true}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#111"
        openMenuButtonColor="#111"
        changeMenuColorOnOpen={true}
        colors={["#18181b", "#27272a", "#10b981"]}
        accentColor="#10b981"
      />

      {/* Hero: Figma Poster Design with Hanging Phone & Tactile Collage */}
      <HeroSection />

      {/* Experience: AI Labs (Discord Moderator & Twitter/X Manager) */}
      <div className="relative z-10">
        <ExperienceSection />
      </div>

      {/* Projects: Agentic Automator, Discord Bot, C++ DSA, PostgreSQL */}
      <div className="relative z-10">
        <ProjectsSection />
      </div>

      {/* Contact: Direct Email, Phone, Location & Minimal Form */}
      <div className="relative z-10">
        <ContactSection />
      </div>

      {/* Mobbin-style Signature Footer */}
      <Footer />
    </main>
  );
}
