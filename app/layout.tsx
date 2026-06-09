import type { Metadata, Viewport } from "next"
import "./globals.css"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: "MEDIX — Tu clínica en tu mano",
  description: "Sistema de gestión clínica premium. Agenda, expediente, laboratorio y más.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "MEDIX" },
  openGraph: { title: "MEDIX", description: "Tu clínica en tu mano", type: "website" },
}

export const viewport: Viewport = {
  themeColor: "#00d4aa",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
