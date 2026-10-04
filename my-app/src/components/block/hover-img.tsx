"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { sound } from "@/lib/sound";
import "@/components/block/hover-img.css";

export interface ProjectItem {
  id?: string;
  num?: string;
  title: string;
  label?: string;
  year?: string;
  imageSrc: string;
  link?: string;
}

const defaultProjects: ProjectItem[] = [
  {
    title: "Ultra Ooh",
    label: "Web Design, Webflow Development",
    year: "/22",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Alex Becher",
    label: "Web Design, Webflow Development",
    year: "/21",
    imageSrc: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Kordes Invest",
    label: "Web Design, Webflow Development",
    year: "/21",
    imageSrc: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Tribevibe",
    label: "Webflow Development",
    year: "/21",
    imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
  },
];

export interface HoverImgProps {
  projects?: ProjectItem[];
  className?: string;
  isContained?: boolean;
  compact?: boolean;
}

export function HoverImg({
  projects = defaultProjects,
  className,
  isContained = false,
  compact = false,
}: HoverImgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<gsap.QuickToFunc | null>(null);
  const yToRef = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const projectThumbnail = thumbnailRef.current;
    const projectsContainer = containerRef.current?.querySelector(
      ".hover-img-projects"
    ) as HTMLElement | null;

    if (!projectThumbnail || !projectsContainer) return;

    const projectElements = gsap.utils.toArray(
      ".hover-img-project",
      projectsContainer
    ) as HTMLElement[];
    const thumbnails = gsap.utils.toArray(
      ".hover-img-thumbnail",
      projectThumbnail
    ) as HTMLElement[];

    gsap.set(projectThumbnail, { scale: 0, xPercent: -50, yPercent: -50 });

    xToRef.current = gsap.quickTo(projectThumbnail, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    yToRef.current = gsap.quickTo(projectThumbnail, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      if (isContained && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const halfWidth = projectThumbnail.offsetWidth / 2;
        const halfHeight = projectThumbnail.offsetHeight / 2;
        const inset = 16;
        x = Math.max(
          halfWidth + inset,
          Math.min(rect.width - halfWidth - inset, e.clientX - rect.left)
        );
        y = Math.max(
          halfHeight + inset,
          Math.min(rect.height - halfHeight - inset, e.clientY - rect.top)
        );
      }

      xToRef.current?.(x);
      yToRef.current?.(y);
    };

    const handleMouseLeave = () => {
      gsap.to(projectThumbnail, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    projectsContainer.addEventListener("mousemove", handleMouseMove);
    projectsContainer.addEventListener("mouseleave", handleMouseLeave);

    const projectListeners: Array<() => void> = [];

    projectElements.forEach((project, index) => {
      const handleMouseEnter = () => {
        sound.playPing(2200);

        gsap.to(projectThumbnail, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(thumbnails, {
          yPercent: -100 * index,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      project.addEventListener("mouseenter", handleMouseEnter);
      projectListeners.push(() =>
        project.removeEventListener("mouseenter", handleMouseEnter)
      );
    });

    return () => {
      projectsContainer.removeEventListener("mousemove", handleMouseMove);
      projectsContainer.removeEventListener("mouseleave", handleMouseLeave);
      projectListeners.forEach((cleanup) => cleanup());
    };
  }, [projects, isContained]);

  return (
    <div
      className={`hover-img-container ${compact ? "hover-img-compact" : ""} ${className || ""}`}
      ref={containerRef}
    >
      <div className="hover-img-projects">
        {projects.map((project, index) => {
          const Tag = project.link ? "a" : "div";
          const linkProps = project.link
            ? {
                href: project.link,
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: () => sound.playClick(1400),
              }
            : {};

          return (
            <Tag
              key={project.id || index}
              className="hover-img-project"
              {...linkProps}
            >
              <div className="hover-img-project-left">
                <h2 className="hover-img-title font-sans">
                  {project.title}
                </h2>
                {project.label && (
                  <p className="hover-img-label font-sans">
                    {project.label}
                  </p>
                )}
              </div>

              {project.year && (
                <span className="hover-img-year font-sans">
                  {project.year}
                </span>
              )}
            </Tag>
          );
        })}
      </div>

      <div
        className="hover-img-thumbnail-wrapper"
        ref={thumbnailRef}
        style={isContained ? { position: "absolute" } : undefined}
      >
        {projects.map((project, index) => (
          <div className="hover-img-thumbnail" key={project.id || index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.imageSrc} alt={project.title} loading="eager" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HoverImg;
