import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Barlow_Condensed, Anton, Syne, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const pixelta = localFont({
  src: "./fonts/Pixelta.ttf",
  variable: "--font-pixelta",
  display: "swap",
});

const pixelifySans = localFont({
  src: [
    {
      path: "./fonts/PixelifySans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PixelifySans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pixelify",
  display: "swap",
});

const beauRivage = localFont({
  src: "./fonts/BeauRivage-Regular.ttf",
  variable: "--font-beau-rivage",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

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

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
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
  themeColor: "#fbfbfd",
  colorScheme: "light",
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
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${barlowCondensed.variable} ${anton.variable} ${syne.variable} ${playfair.variable} ${pixelta.variable} ${pixelifySans.variable} ${beauRivage.variable} h-full antialiased selection:bg-zinc-900 selection:text-white`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
