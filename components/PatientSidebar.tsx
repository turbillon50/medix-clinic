"use client"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { Icon } from "./icons"

const NAV: [string, string, string][] = [
  ["home", "Inicio", "/app"],
  ["calendar", "Mis Citas", "/app/citas"],
  ["file", "Expediente", "/app/expediente"],
  ["flask", "Resultados", "/app/resultados"],
  ["card", "Pagos", "/app/pagos"],
]

export function PatientSidebar({ active }: { active: string }) {
  return (
    <aside style={{ width: 240, background: "var(--bg2)", borderRight: "1px solid var(--border)", padding: "24px 0", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
      <div className="font-display gradient-text" style={{ fontSize: 20, fontWeight: 700, padding: "0 24px 24px", borderBottom: "1px solid var(--border)", marginBottom: 16 }}>MEDIX</div>
      {NAV.map(([icon, label, href]) => {
        const on = href === active
        return (
          <Link key={href} href={href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 24px", margin: "2px 12px", borderRadius: 10, background: on ? "linear-gradient(135deg,rgba(0,180,149,0.14),rgba(47,111,224,0.14))" : "transparent", color: on ? "var(--teal)" : "var(--text2)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            <Icon name={icon} size={18} />{label}
          </Link>
        )
      })}
      <div style={{ flex: 1 }} />
      <button onClick={() => signOut({ callbackUrl: "/" })} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 24px", margin: "2px 12px", borderRadius: 10, background: "transparent", border: "none", color: "var(--text3)", cursor: "pointer", fontSize: 14 }}>
        <Icon name="logout" size={18} /> Cerrar sesión
      </button>
    </aside>
  )
}
