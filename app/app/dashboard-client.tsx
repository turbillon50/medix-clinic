"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { PatientSidebar } from "@/components/PatientSidebar"
import { Icon } from "@/components/icons"

interface Props { user: any; appointments: any[] }

export default function PatientDashboard({ user, appointments }: Props) {
  const name = user?.name || user?.email?.split("@")[0] || "Paciente"

  return (
    <div className="app-shell">
      <PatientSidebar active="/app" />
      <main className="app-main">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Hola, {name}</h1>
          <p style={{ color: "var(--text3)", marginBottom: 28 }}>{new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 28 }}>
            {[
              ["calendar", "Próxima cita", appointments[0] ? new Date(appointments[0].scheduled_at).toLocaleDateString("es-MX", { day: "2-digit", month: "short" }) : "Sin citas", "Ver todas"],
              ["file", "Consultas totales", String(appointments.length), "Este año"],
              ["pill", "Medicamentos", "2", "Activos"],
              ["star", "Tu médico", "Dr. García", "Cardiología"],
            ].map(([icon, label, val, sub], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px", boxShadow: "0 4px 20px var(--shadow)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}><Icon name={icon as string} size={15} /> {label}</div>
                <div className="font-display gradient-text" style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{val}</div>
                <div style={{ fontSize: 13, color: "var(--teal)" }}>{sub}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px var(--shadow)" }}>
              <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600, marginBottom: 16 }}><Icon name="calendar" size={18} /> Citas recientes</h2>
              {appointments.length === 0 ? (
                <div style={{ textAlign: "center", padding: 32, color: "var(--text3)" }}>
                  <p style={{ fontSize: 13 }}>Sin citas aún</p>
                  <Link href="/app/citas" style={{ display: "inline-block", marginTop: 12, padding: "8px 20px", borderRadius: 99, background: "linear-gradient(135deg,var(--grad-from),var(--grad-to))", color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Agendar</Link>
                </div>
              ) : appointments.slice(0, 3).map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: "var(--surface2)", marginBottom: 8 }}>
                  <div style={{ fontFamily: "Space Grotesk", fontSize: 14, fontWeight: 700, color: "var(--teal)", minWidth: 52, textAlign: "center" }}>{new Date(a.scheduled_at).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{a.type}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{a.doctor_name}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, background: a.status === "confirmed" ? "rgba(0,180,149,0.14)" : "rgba(232,130,10,0.14)", color: a.status === "confirmed" ? "var(--teal)" : "var(--orange)" }}>{a.status === "confirmed" ? "Confirmada" : "Pendiente"}</span>
                </motion.div>
              ))}
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px var(--shadow)" }}>
              <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600, marginBottom: 16 }}><Icon name="bolt" size={18} /> Accesos rápidos</h2>
              {[["file", "Ver expediente", "/app/expediente"], ["calendar", "Agendar cita", "/app/citas"], ["flask", "Resultados lab", "/app/resultados"], ["card", "Historial pagos", "/app/pagos"]].map(([icon, label, href]) => (
                <Link key={String(href)} href={String(href)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: "var(--surface2)", marginBottom: 8, textDecoration: "none", color: "var(--text2)", fontSize: 14, fontWeight: 500 }}>
                  <Icon name={icon as string} size={18} />{label}
                  <span style={{ marginLeft: "auto", color: "var(--text3)", display: "inline-flex" }}><Icon name="arrowRight" size={16} /></span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
