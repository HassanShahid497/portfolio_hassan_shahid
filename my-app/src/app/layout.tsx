import type { Metadata, Viewport } from "next";
import { Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hassan Shahid | Software Engineering Student @ ITU | AI Automation",
  description:
    "Portfolio of Hassan Shahid, Software Engineering student at Information Technology University (ITU) specializing in AI automation, agentic workflows, and community management.",
  keywords: [
    "Hassan Shahid",
    "Information Technology University",
    "ITU",
    "Software Engineering",
    "AI Automation",
    "Agentic Workflows",
    "Discord Moderator",
    "C++",
    "PostgreSQL",
  ],
  authors: [{ name: "Hassan Shahid" }],
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased selection:bg-emerald-500 selection:text-black`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-mono">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
