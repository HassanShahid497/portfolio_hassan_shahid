"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

export interface GlowingWaveProps {
  speed?: number;
  swell?: number;
  swellFrequency?: number;
  ripple?: number;
  rippleFrequency?: number;
  chop?: number;
  chopScale?: number;
  waterline?: number;
  edgeSoftness?: number;
  depth?: number;
  glow?: number;
  glowWidth?: number;
  halo?: number;
  haloWidth?: number;
  richness?: number;
  colorFrequency?: number;
  saturation?: number;
  spread?: number;
  swirl?: number;
  swirlScale?: number;
  grain?: number;
  grainSize?: number;
  color?: string;
  hotColor?: string;
  backgroundColor?: string;
  opacity?: number;
  cursorInteraction?: boolean;
  cursorLift?: number;
  cursorReach?: number;
  paused?: boolean;
  adaptiveQuality?: boolean;
  targetFps?: number;
  dpr?: number;
  className?: string;
  children?: React.ReactNode;
}

const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uSwell;
uniform float uSwellFrequency;
uniform float uRipple;
uniform float uRippleFrequency;
uniform float uChop;
uniform float uChopScale;
uniform float uWaterline;
uniform float uEdgeSoftness;
uniform float uDepth;
uniform float uGlow;
uniform float uGlowWidth;
uniform float uHalo;
uniform float uHaloWidth;
uniform float uRichness;
uniform float uColorFrequency;
uniform float uSaturation;
uniform float uSpread;
uniform float uSwirl;
uniform float uSwirlScale;
uniform float uGrain;
uniform float uGrainSize;
uniform vec3 uColor;
uniform vec3 uHotColor;
uniform vec3 uBackgroundColor;
uniform float uHasBg;
uniform float uOpacity;
uniform vec2 uCursor;
uniform float uCursorActive;
uniform float uCursorLift;
uniform float uCursorReach;

in vec2 vUv;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.2831853 * (c * t + d));
}

void main() {
  vec2 uv = vUv;
  float t = uTime * uSpeed;

  // Primary wave swell
  float swell = sin(uv.x * uSwellFrequency * 6.2831853 + t * 1.0) * uSwell;
  // Secondary ripple
  float ripple = sin(uv.x * uRippleFrequency * 6.2831853 - t * 1.35 + 1.2) * uRipple;

  // Crest noise chop
  float chop1 = sin(uv.x * uChopScale * 14.0 + t * 2.1);
  float chop2 = cos(uv.x * uChopScale * 27.0 - t * 1.4 + 0.8);
  float chop3 = sin(uv.x * uChopScale * 45.0 + t * 3.2 + 1.6);
  float chop = (chop1 * 0.5 + chop2 * 0.3 + chop3 * 0.2) * uChop;

  // Pointer cursor interaction
  float cursorEffect = 0.0;
  if (uCursorActive > 0.001) {
    float cursorDist = abs(uv.x - uCursor.x);
    float liftFactor = smoothstep(uCursorReach, 0.0, cursorDist);
    cursorEffect = liftFactor * uCursorLift * uCursorActive;
  }

  // Wave crest line (centered around 0.5 + waterline)
  float crestY = 0.5 + uWaterline + swell + ripple + chop + cursorEffect;
  float dist = uv.y - crestY;

  // Luminous crest line & surrounding halo
  float absDist = abs(dist);
  float glowCrest = exp(-absDist / max(0.002, uGlowWidth)) * uGlow;
  float haloGlow = exp(-absDist / max(0.005, uHaloWidth)) * uHalo;
  float totalGlow = glowCrest + haloGlow;

  // Fill gradient below crest
  float fillDepth = clamp(-dist / max(0.01, uDepth), 0.0, 1.0);
  float fillEdge = smoothstep(0.0, -max(0.001, uEdgeSoftness), dist);

  // Swirl noise for iridescence
  float s1 = sin(uv.x * uSwirlScale * 6.0 + fillDepth * 5.0 + t * 0.5);
  float s2 = cos(uv.x * uSwirlScale * 13.0 - fillDepth * 8.0 - t * 0.3);
  float swirlVal = (s1 * 0.6 + s2 * 0.4) * uSwirl;

  float bandPhase = fillDepth * uColorFrequency + swirlVal * 0.15 + t * 0.08;

  vec3 palA = uHotColor;
  vec3 palB = vec3(uSpread * uSaturation);
  vec3 palC = vec3(1.0, 1.0, 1.0);
  vec3 palD = vec3(0.0, 0.33, 0.67);
  vec3 iridescentColor = palette(bandPhase, palA, palB, palC, palD);

  // Blend from hot color at crest down into deep color
  vec3 baseGradient = mix(uHotColor, uColor, fillDepth);
  vec3 waveBody = mix(baseGradient, iridescentColor, uRichness * fillDepth);

  // Film grain
  vec2 grainCoord = floor(gl_FragCoord.xy / max(1.0, uGrainSize));
  float grainNoise = fract(sin(dot(grainCoord, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  vec3 grainOffset = vec3(grainNoise * uGrain);

  vec3 finalColor;
  float finalAlpha;

  if (uHasBg > 0.5) {
    vec3 background = uBackgroundColor;
    vec3 waveCombined = mix(background, waveBody, fillEdge);
    waveCombined += uHotColor * totalGlow;
    waveCombined += grainOffset * fillEdge;
    finalColor = clamp(waveCombined, 0.0, 1.0);
    finalAlpha = uOpacity;
  } else {
    vec3 colorContribution = (waveBody * fillEdge) + (uHotColor * totalGlow);
    colorContribution += grainOffset * fillEdge;
    finalColor = clamp(colorContribution, 0.0, 1.0);
    finalAlpha = clamp(fillEdge * 0.9 + totalGlow * 1.25, 0.0, 1.0) * uOpacity;
  }

  fragColor = vec4(finalColor, finalAlpha);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const num = parseInt(h, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

export function GlowingWave({
  speed = 1,
  swell = 0.15,
  swellFrequency = 3,
  ripple = 0.08,
  rippleFrequency = 6,
  chop = 0.04,
  chopScale = 2,
  waterline = 0,
  edgeSoftness = 0.1,
  depth = 0.6,
  glow = 0.6,
  glowWidth = 0.05,
  halo = 0.35,
  haloWidth = 0.2,
  richness = 0.35,
  colorFrequency = 2,
  saturation = 0.9,
  spread = 0.04,
  swirl = 1,
  swirlScale = 1.5,
  grain = 0.05,
  grainSize = 2,
  color = "#0f172a",
  hotColor = "#c7d2fe",
  backgroundColor = "transparent",
  opacity = 1,
  cursorInteraction = true,
  cursorLift = 0.12,
  cursorReach = 0.25,
  paused = false,
  adaptiveQuality = true,
  targetFps = 60,
  dpr = 2,
  className = "",
  children,
}: GlowingWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer | null = null;
    let canvas: HTMLCanvasElement | null = null;
    let program: Program | null = null;
    let mesh: Mesh | null = null;

    try {
      renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, dpr),
        webgl: 2,
      });

      const gl = renderer.gl;
      canvas = gl.canvas;
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      canvas.style.display = "block";
      container.appendChild(canvas);

      const geometry = new Triangle(gl);

      const hasBg = backgroundColor && backgroundColor !== "transparent";
      const bgRgb = hasBg ? hexToRgb(backgroundColor) : [0, 0, 0];

      const uniforms: Record<string, { value: any }> = {
        uTime: { value: 0 },
        uResolution: { value: [canvas.width || 300, canvas.height || 150] },
        uSpeed: { value: speed },
        uSwell: { value: swell },
        uSwellFrequency: { value: swellFrequency },
        uRipple: { value: ripple },
        uRippleFrequency: { value: rippleFrequency },
        uChop: { value: chop },
        uChopScale: { value: chopScale },
        uWaterline: { value: waterline },
        uEdgeSoftness: { value: edgeSoftness },
        uDepth: { value: depth },
        uGlow: { value: glow },
        uGlowWidth: { value: glowWidth },
        uHalo: { value: halo },
        uHaloWidth: { value: haloWidth },
        uRichness: { value: richness },
        uColorFrequency: { value: colorFrequency },
        uSaturation: { value: saturation },
        uSpread: { value: spread },
        uSwirl: { value: swirl },
        uSwirlScale: { value: swirlScale },
        uGrain: { value: grain },
        uGrainSize: { value: grainSize },
        uColor: { value: hexToRgb(color) },
        uHotColor: { value: hexToRgb(hotColor) },
        uBackgroundColor: { value: bgRgb },
        uHasBg: { value: hasBg ? 1.0 : 0.0 },
        uOpacity: { value: opacity },
        uCursor: { value: [0.5, 0.5] },
        uCursorActive: { value: 0.0 },
        uCursorLift: { value: cursorLift },
        uCursorReach: { value: cursorReach },
      };

      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      mesh = new Mesh(gl, { geometry, program });
    } catch (e) {
      console.warn("GlowingWave WebGL initialization error:", e);
      return;
    }

    if (!renderer || !canvas || !mesh || !program) return;

    let animationFrameId = 0;
    let lastTime = performance.now();
    let currentDpr = Math.min(window.devicePixelRatio || 1, dpr);
    let isVisible = true;
    let targetCursorActive = 0;
    let currentCursorActive = 0;
    let targetCursorX = 0.5;
    let currentCursorX = 0.5;

    const resize = () => {
      if (!container || !renderer || !program) return;
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      renderer.dpr = currentDpr;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.uResolution.value = [clientWidth * currentDpr, clientHeight * currentDpr];
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !paused && !animationFrameId) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    });
    intersectionObserver.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      if (!cursorInteraction || !container) return;
      const rect = container.getBoundingClientRect();
      targetCursorX = (e.clientX - rect.left) / rect.width;
      targetCursorActive = 1.0;
    };

    const onPointerLeave = () => {
      targetCursorActive = 0.0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    let frameCount = 0;
    let fpsTimer = performance.now();

    const render = (now: number) => {
      if (!isVisible || paused || !renderer || !mesh || !program) {
        animationFrameId = 0;
        return;
      }

      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (adaptiveQuality) {
        frameCount++;
        if (now - fpsTimer > 1000) {
          const fps = (frameCount * 1000) / (now - fpsTimer);
          if (fps < targetFps * 0.8 && currentDpr > 1) {
            currentDpr = 1;
            resize();
          }
          frameCount = 0;
          fpsTimer = now;
        }
      }

      currentCursorActive += (targetCursorActive - currentCursorActive) * Math.min(delta * 8, 1);
      currentCursorX += (targetCursorX - currentCursorX) * Math.min(delta * 10, 1);

      program.uniforms.uTime.value += delta;
      program.uniforms.uCursor.value = [currentCursorX, 0.5];
      program.uniforms.uCursorActive.value = currentCursorActive;

      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [
    speed,
    swell,
    swellFrequency,
    ripple,
    rippleFrequency,
    chop,
    chopScale,
    waterline,
    edgeSoftness,
    depth,
    glow,
    glowWidth,
    halo,
    haloWidth,
    richness,
    colorFrequency,
    saturation,
    spread,
    swirl,
    swirlScale,
    grain,
    grainSize,
    color,
    hotColor,
    backgroundColor,
    opacity,
    cursorInteraction,
    cursorLift,
    cursorReach,
    paused,
    adaptiveQuality,
    targetFps,
    dpr,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`.trim()}
    >
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
}

export default GlowingWave;
