"use client";

import React, { useState } from "react";
import { RESUME_DATA } from "@/lib/data";
import { sound } from "@/lib/sound";
import { KineticText } from "@/components/ui/kinetic-text";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, label: string) => {
    sound.playConfirm();
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    sound.playConfirm();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">
            Contact
          </div>
          <KineticText
            text="Get In Touch"
            as="h2"
            className="text-2xl sm:text-3xl font-pixelta text-foreground tracking-wide"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">
          {/* Direct Details */}
          <div className="sm:col-span-5 space-y-4 font-mono text-xs">
            <div className="p-4 rounded-lg bg-card border border-border space-y-1 shadow-xs">
              <div className="text-[10px] text-muted-foreground uppercase">Email</div>
              <div className="text-foreground font-semibold">{RESUME_DATA.profile.email}</div>
              <button
                onClick={() => copyText(RESUME_DATA.profile.email, "email")}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 pt-1 block cursor-pointer"
              >
                {copied === "email" ? "Copied ✓" : "Copy email"}
              </button>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border space-y-1 shadow-xs">
              <div className="text-[10px] text-muted-foreground uppercase">Phone</div>
              <div className="text-foreground font-semibold">{RESUME_DATA.profile.phone}</div>
              <button
                onClick={() => copyText(RESUME_DATA.profile.phone, "phone")}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 pt-1 block cursor-pointer"
              >
                {copied === "phone" ? "Copied ✓" : "Copy phone"}
              </button>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border space-y-1 shadow-xs">
              <div className="text-[10px] text-muted-foreground uppercase">Location</div>
              <div className="text-foreground font-semibold">{RESUME_DATA.profile.location}</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESUME_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href={RESUME_DATA.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={RESUME_DATA.profile.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter/X ↗
              </a>
            </div>
          </div>

          {/* Minimal Form */}
          <div className="sm:col-span-7 p-6 rounded-lg bg-card border border-border shadow-xs">
            {submitted ? (
              <div className="py-10 text-center space-y-2">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">Message Sent ✓</div>
                <p className="text-xs text-muted-foreground font-sans">
                  Thanks for reaching out! I&apos;ll get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-muted-foreground hover:text-foreground pt-2 underline cursor-pointer"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-muted-foreground text-[11px]">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground text-[11px]">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground text-[11px]">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Your message..."
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:border-emerald-500 transition-colors font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-foreground text-background font-semibold rounded hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-black transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
