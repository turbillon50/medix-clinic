import type { Metadata, Viewport } from "next"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { RegisterSW } from "@/components/pwa/RegisterSW"
import { DemoSwitcher } from "@/components/DemoSwitcher"
import { Splash } from "@/components/Splash"

export const metadata: Metadata = {
  title: "MEDIX — Tu clínica en tu mano",
  description: "Sistema de gestión clínica premium. Agenda, expediente, laboratorio y más.",
  applicationName: "MEDIX",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "MEDIX" },
  openGraph: {
    title: "MEDIX — Tu clínica en tu mano",
    description: "Sistema de gestión clínica premium.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#00d4aa",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <Splash />
          {children}
          <DemoSwitcher />
        </SessionProvider>
        <RegisterSW />
      </body>
    </html>
  )
}
