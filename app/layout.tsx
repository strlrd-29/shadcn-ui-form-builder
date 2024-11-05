import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"

import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import "./globals.css"

import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: "Shadcn Form Builder",
    template: "%s - Shadcn Form Builder",
  },
  keywords: ["React", "Shadcn", "React hook form", "Zod"],
  authors: [
    {
      name: "ouassim",
      url: "https://ouassim.tech",
    },
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, fontMono.variable)}>
        <ThemeProvider enableSystem attribute="class">
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
