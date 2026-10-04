"use client";

import React, { useState, useEffect } from "react";
import { RESUME_DATA } from "@/lib/data";
import { sound } from "@/lib/sound";
import { cn } from "@/lib/utils";
import WarpText from "@/components/WarpText";

export function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    service: "",
    email: "",
    newsletter: false,
    projectDescription: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const headingColor = isDark ? "#ffffff" : "#000000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.projectDescription || loading) return;

    setLoading(true);
    setErrorMessage(null);

    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const serviceLabel = form.service || "General Inquiry";

    try {
      const web3FormsKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        "6e01168f-fc97-40c7-8953-8a49552c5cb3";

      let res: Response;
      if (web3FormsKey) {
        // Direct browser submission to Web3Forms for immediate inbox delivery
        res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: fullName,
            email: form.email,
            service: serviceLabel,
            newsletter: form.newsletter ? "Yes" : "No",
            message: form.projectDescription,
            subject: `New Portfolio Inquiry from ${fullName} (${serviceLabel})`,
            from_name: "Portfolio Contact Form",
          }),
        });
      } else {
        // Fallback to internal API route
        res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email: form.email,
            message: `[Service: ${serviceLabel}] [Newsletter: ${
              form.newsletter ? "Yes" : "No"
            }]\n\n${form.projectDescription}`,
          }),
        });
      }

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Unable to send message. Please try again.");
      }

      sound.playConfirm();
      setSubmitted(true);
      setForm({
        firstName: "",
        lastName: "",
        service: "",
        email: "",
        newsletter: false,
        projectDescription: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full pt-16 sm:pt-24 md:pt-28 pb-24 sm:pb-32 bg-background text-foreground transition-colors scroll-mt-20 flex justify-center"
    >
      <div className="w-full max-w-[960px] mx-auto px-6 sm:px-8 md:px-10 flex flex-col items-center">
        {/* Hidden h2 for SEO & Accessibility */}
        <h2 className="sr-only">Contact Me</h2>

        {/* WarpText Heading matching ABOUT ME style, centralized */}
        <div className="w-full flex justify-start mb-10 sm:mb-14 md:mb-16">
          <div className="w-full max-w-[640px]">
            <WarpText
              text="CONTACT ME"
              color={headingColor}
              warpStrength={0.18}
              warpScale={1.8}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.028}
              ripple
              fontSize="clamp(2.8rem, 6.5vw, 5.25rem)"
              fontWeight={800}
              letterSpacing={-0.05}
              lineHeight={1}
              align="left"
              fontFamily="var(--font-anton), var(--font-barlow-condensed), sans-serif"
              className="w-full h-[85px] sm:h-[110px] md:h-[135px] cursor-pointer"
            />
          </div>
        </div>

        {/* Two-Column Layout Centralized */}
        <div className="w-full flex flex-col md:flex-row items-start justify-center gap-10 md:gap-14 lg:gap-16">
          {/* Left Column: Location, Year, Office hours */}
          <div className="w-full md:w-48 lg:w-56 shrink-0 space-y-8 sm:space-y-10 text-[13px] sm:text-sm text-neutral-800 dark:text-neutral-200 pt-1">
            {/* Location & Year */}
            <div className="space-y-0.5 leading-snug">
              <p className="font-normal text-neutral-900 dark:text-neutral-100">
                {RESUME_DATA.profile.location || "Lahore, Pakistan"}
              </p>
              <p className="text-neutral-500 dark:text-neutral-400">
                {new Date().getFullYear()}
              </p>
            </div>

            {/* Office hours */}
            <div className="space-y-0.5 leading-snug">
              <p className="font-normal text-neutral-900 dark:text-neutral-100">
                Office hours
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                Monday - Friday
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                11 AM - 2 PM PKT
              </p>
            </div>
          </div>

          {/* Right Column: Underline Form */}
          <div className="w-full md:flex-1 max-w-xl">
            {submitted ? (
              <div className="py-12 space-y-4">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 dark:text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Message sent successfully.
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  Thank you for reaching out! I&apos;ve received your message and will get back to you shortly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-8 sm:space-y-9 w-full">
                {/* Field 1: Name (required) */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Name (required)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {/* First Name */}
                    <div className="space-y-1">
                      <label
                        htmlFor="first-name"
                        className="block text-xs text-neutral-500 dark:text-neutral-400"
                      >
                        First Name
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-1.5 text-sm sm:text-base text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                      <label
                        htmlFor="last-name"
                        className="block text-xs text-neutral-500 dark:text-neutral-400"
                      >
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-1.5 text-sm sm:text-base text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 2: Service with Underline & Chevron Indicator */}
                <div className="space-y-1">
                  <label
                    htmlFor="service"
                    className="block text-xs text-neutral-500 dark:text-neutral-400"
                  >
                    Service
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className="w-full bg-transparent appearance-none border-b border-neutral-300 dark:border-neutral-700 py-1.5 pr-8 text-sm sm:text-base text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors cursor-pointer"
                    >
                      <option value="" className="bg-white dark:bg-neutral-900 text-neutral-400">
                        Select a service...
                      </option>
                      <option
                        value="AI Automation & Agentic Workflows"
                        className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                      >
                        AI Automation & Agentic Workflows
                      </option>
                      <option
                        value="Full-Stack Web Development"
                        className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                      >
                        Full-Stack Web Development
                      </option>
                      <option
                        value="Discord Bot & Community Architecture"
                        className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                      >
                        Discord Bot & Community Architecture
                      </option>
                      <option
                        value="C++ High Performance Systems"
                        className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                      >
                        C++ High Performance Systems
                      </option>
                      <option
                        value="Technical Consultation"
                        className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                      >
                        Technical Consultation
                      </option>
                    </select>

                    {/* Chevron Icon */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 dark:text-neutral-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Field 3: Email (required) */}
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100"
                  >
                    Email (required)
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-1.5 text-sm sm:text-base text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Field 4: Radio / Checkbox for News and Updates */}
                <div className="pt-0.5">
                  <label className="inline-flex items-center gap-2.5 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={form.newsletter}
                      onChange={(e) =>
                        setForm({ ...form, newsletter: e.target.checked })
                      }
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border transition-all flex items-center justify-center",
                        form.newsletter
                          ? "border-neutral-950 bg-neutral-950 dark:border-white dark:bg-white"
                          : "border-neutral-400 dark:border-neutral-600 group-hover:border-neutral-800 bg-transparent"
                      )}
                    >
                      {form.newsletter && (
                        <span className="w-1 h-1 rounded-full bg-white dark:bg-black" />
                      )}
                    </span>
                    <span className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300">
                      Sign up for news and updates
                    </span>
                  </label>
                </div>

                {/* Field 5: Project description */}
                <div className="space-y-1">
                  <label
                    htmlFor="project-description"
                    className="block text-xs text-neutral-500 dark:text-neutral-400"
                  >
                    Project description
                  </label>
                  <textarea
                    id="project-description"
                    rows={2}
                    required
                    value={form.projectDescription}
                    onChange={(e) =>
                      setForm({ ...form, projectDescription: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-1.5 text-sm sm:text-base text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono space-y-1">
                    <div>{errorMessage}</div>
                    <a
                      href={`mailto:${RESUME_DATA.profile.email}?subject=Portfolio Inquiry from ${encodeURIComponent(
                        `${form.firstName} ${form.lastName}`.trim() || "Visitor"
                      )}&body=${encodeURIComponent(form.projectDescription || "")}`}
                      className="underline font-semibold"
                    >
                      Send email directly via mail client &rarr;
                    </a>
                  </div>
                )}

                {/* Field 6: Pill Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center px-8 py-2 rounded-full bg-black text-white hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all text-xs sm:text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
