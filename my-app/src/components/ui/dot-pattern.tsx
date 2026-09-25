"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface DotPatternProps extends React.HTMLAttributes<HTMLCanvasElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  dotColor?: string;
  glowColor?: string;
  interactive?: boolean;
  flowRadius?: number;
  flowIntensity?: number;
  waveAnimation?: boolean;
  [key: string]: any;
}

export function DotPattern({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 0.5,
  cr = 0.9,
  className,
  dotColor,
  glowColor,
  interactive = true,
  flowRadius = 160,
  flowIntensity = 1.2,
  waveAnimation = true,
  ...props
}: DotPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let widthPx = 0;
    let heightPx = 0;

    // Mouse coordinates (screen-relative)
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      vx: 0,
      vy: 0,
      active: false,
    };

    interface Dot {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }

    let dots: Dot[] = [];

    const isDarkMode = () =>
      document.documentElement.classList.contains("dark");

    const setupDots = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      widthPx = rect.width;
      heightPx = rect.height;

      canvas.width = widthPx * dpr;
      canvas.height = heightPx * dpr;
      ctx.scale(dpr, dpr);

      dots = [];
      const spacingX = Math.max(12, Number(width) || 24);
      const spacingY = Math.max(12, Number(height) || 24);
      const startX = ((Number(x) || 0) % spacingX);
      const startY = ((Number(y) || 0) % spacingY);

      for (let px = startX; px < widthPx + spacingX; px += spacingX) {
        for (let py = startY; py < heightPx + spacingY; py += spacingY) {
          dots.push({
            baseX: px,
            baseY: py,
            x: px,
            y: py,
            vx: 0,
            vy: 0,
            size: Number(cr) || 1,
            opacity: 1,
          });
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      setupDots();
    });
    resizeObserver.observe(canvas);
    setupDots();

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, widthPx, heightPx);

      // Smooth mouse interpolation
      if (mouse.active) {
        const prevX = mouse.x;
        const prevY = mouse.y;
        mouse.x += (mouse.targetX - mouse.x) * 0.18;
        mouse.y += (mouse.targetY - mouse.y) * 0.18;
        mouse.vx = mouse.x - prevX;
        mouse.vy = mouse.y - prevY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
        mouse.vx *= 0.9;
        mouse.vy *= 0.9;
      }

      const dark = isDarkMode();
      const baseFill = dotColor || (dark ? "rgba(148, 163, 184, 0.28)" : "rgba(100, 116, 139, 0.32)");
      const glowFill = glowColor || (dark ? "rgba(52, 211, 153, 0.85)" : "rgba(16, 185, 129, 0.75)");

      const radius = flowRadius;
      const radiusSq = radius * radius;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Ambient fluid wave flow motion
        let waveX = 0;
        let waveY = 0;
        if (waveAnimation) {
          waveX = Math.sin(elapsed * 0.0012 + dot.baseY * 0.02) * 1.8;
          waveY = Math.cos(elapsed * 0.0014 + dot.baseX * 0.02) * 1.8;
        }

        const targetX = dot.baseX + waveX;
        const targetY = dot.baseY + waveY;

        // Interactive cursor flow physics
        if (interactive && mouse.x > -1000 && mouse.y > -1000) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const normX = dx / dist;
            const normY = dy / dist;
            const force = (radius - dist) / radius;

            // Fluid push in cursor moving direction + radial repulsion
            const pushMagnitude = force * force * flowIntensity * 28;
            const velocityInfluence = 0.35;

            dot.vx += (normX * pushMagnitude + mouse.vx * velocityInfluence * force) * 0.12;
            dot.vy += (normY * pushMagnitude + mouse.vy * velocityInfluence * force) * 0.12;
          }
        }

        // Spring physics to return smoothly
        const spring = 0.085;
        const damping = 0.84;

        dot.vx += (targetX - dot.x) * spring;
        dot.vy += (targetY - dot.y) * spring;
        dot.vx *= damping;
        dot.vy *= damping;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Proximity glow calculation
        let isGlowing = false;
        let glowProximity = 0;

        if (interactive && mouse.x > -1000 && mouse.y > -1000) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            glowProximity = (radius - dist) / radius;
            isGlowing = glowProximity > 0.15;
          }
        }

        // Render dot
        ctx.beginPath();
        const renderRadius = isGlowing
          ? dot.size * (1 + glowProximity * 0.9)
          : dot.size;
        ctx.arc(dot.x, dot.y, Math.max(0.2, renderRadius), 0, Math.PI * 2);

        if (isGlowing) {
          ctx.fillStyle = glowFill;
          ctx.globalAlpha = 0.4 + glowProximity * 0.6;
        } else {
          ctx.fillStyle = baseFill;
          ctx.globalAlpha = 1;
        }

        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();
    };
  }, [width, height, x, y, cr, dotColor, glowColor, interactive, flowRadius, flowIntensity, waveAnimation]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      {...props}
    />
  );
}

export default DotPattern;
