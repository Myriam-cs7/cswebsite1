"use client"
import type React from "react"
import { SiteConfigProvider } from "@/components/site-config"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <SiteConfigProvider>{children}</SiteConfigProvider>
}
