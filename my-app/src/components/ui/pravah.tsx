"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * 3x3 or 4x4 Diamond Grid Icon
 * Pravah role: Visual marker for engineering notes, problem/vision list items, and status indicators
 */
export function DiamondGrid({
  size = 3,
  dotSize = 3,
  color = "currentColor",
  className,
}: {
  size?: 3 | 4;
  dotSize?: number;
  color?: string;
  className?: string;
}) {
  const count = size * size;
  return (
    <div
      className={cn(
        "inline-grid gap-1.5 select-none shrink-0",
        size === 3 ? "grid-cols-3" : "grid-cols-4",
        className
      )}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="rotate-45 block transition-opacity duration-200"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Uppercase Tracked Section Label
 * Pravah role: Section classifications, status tags, and field notes (e.g. WORK HISTORY, DOSSIER, CRITICAL)
 * Spec: 4px radius, 2px 8px padding, 12px uppercase, 0.10em letter-spacing
 */
export function PravahBadge({
  children,
  variant = "light",
  className,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[12px] leading-tight font-[400] uppercase tracking-[0.10em] px-2 py-0.5 rounded-[4px] border select-none transition-colors",
        variant === "light" &&
          "bg-[#ffffff] text-[#181011] border-[#d8d4d4]",
        variant === "dark" &&
          "bg-[#302023] text-[#ffffff] border-[#4a3438]",
        variant === "outline" &&
          "bg-transparent text-[#181011] border-[#181011]",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Pravah Pill CTA Button
 * Spec: 100px radius, 1px Ink Black (#181011) border on transparent fill, padding 8px 20px, 15px text, no fill state
 */
export function PravahPillButton({
  children,
  onClick,
  href,
  target,
  rel,
  className,
  type = "button",
  disabled = false,
  inverse = false,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  inverse?: boolean;
}) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 text-[15px] font-[400] rounded-[100px] border px-5 py-2 transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
    inverse
      ? "text-[#ffffff] border-[#ffffff] hover:bg-[#ffffff] hover:text-[#181011]"
      : "text-[#181011] border-[#181011] hover:bg-[#181011] hover:text-[#ffffff]",
    className
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  );
}

/**
 * Pravah Square Outlined Button
 * Spec: 4px radius, 1px border, 4px 16px padding, 14-15px font-weight 400
 */
export function PravahSquareButton({
  children,
  onClick,
  className,
  disabled = false,
  inverse = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  inverse?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 text-[14px] font-[400] rounded-[4px] border px-4 py-1 transition-colors select-none cursor-pointer disabled:opacity-50",
        inverse
          ? "text-[#ffffff] border-[#ffffff] hover:bg-[#ffffff] hover:text-[#302023]"
          : "text-[#181011] border-[#181011] hover:bg-[#181011] hover:text-[#ffffff]",
        className
      )}
    >
      {children}
    </button>
  );
}

/**
 * Pravah Inset Alert Card
 * Spec: White fill, 4px radius, 1px Bone (#d8d4d4) border, 16px padding. 700 14px heading, 400 12-14px Ash body
 */
export function PravahAlertCard({
  tag,
  title,
  body,
  className,
  inverse = false,
}: {
  tag?: string;
  title: string;
  body: string;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "p-4 rounded-[4px] border space-y-1.5 transition-colors",
        inverse
          ? "bg-[#302023] border-[#4a3438] text-[#ffffff]"
          : "bg-[#ffffff] border-[#d8d4d4] text-[#181011]",
        className
      )}
    >
      {tag && (
        <span
          className={cn(
            "inline-block text-[11px] uppercase tracking-[0.10em] font-[400]",
            inverse ? "text-[#aaaaaa]" : "text-[#666666]"
          )}
        >
          {tag}
        </span>
      )}
      <div className={cn("text-[14px] font-[700] leading-snug")}>{title}</div>
      <p className={cn("text-[13px] font-[400] leading-relaxed", inverse ? "text-[#aaaaaa]" : "text-[#666666]")}>
        {body}
      </p>
    </div>
  );
}

/**
 * Pravah Hairline Divider
 */
export function PravahDivider({
  className,
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full h-px",
        inverse ? "bg-[#ffffff]/20" : "bg-[#d8d4d4]",
        className
      )}
    />
  );
}
