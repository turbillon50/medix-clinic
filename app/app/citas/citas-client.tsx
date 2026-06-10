"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { PatientSidebar } from "@/components/PatientSidebar"
import { Icon } from "@/components/icons"

interface Props { appointments: any[]; doctors: any[]; user: any }

export default function CitasClient({ appointments, doctors }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ doctor_id: "", date: "", time: "09:00", type: "Consulta general" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function submitCita(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, scheduled_at: `${form.date}T${form.time}:00`, amount: 450 }) })
    } catch {}
    setSuccess(true); setShowModal(false); setLoading(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  const upcoming = appointments.filter(a => new Date(a.scheduled_at) >= new Date())
  const past = appointments.filter(a => new Date(a.scheduled_at) < new Date())

  const grad = "linear-gradient(135deg,var(--grad-from),var(--grad-to))"
  const fieldStyle = { width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", color: "var(--text)", fontSize: 14, outline: "none" } as React.CSSProperties

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex" }}>
      <PatientSidebar active="/app/citas" />
      <main style={{ flex: 1, padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 className="font-display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Mis Citas</h1>
            <p style={{ color: "var(--text3)", fontSize: 14 }}>{upcoming.length} próximas · {past.length} anteriores</p>
          </div>
          <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: grad, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 99, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
            <Icon name="plus" size={16} /> Nueva cita
          </button>
        </div>

        {success && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: "rgba(0,180,149,0.12)", border: "1px solid var(--teal)", borderRadius: 12, padding: "14px 20px", marginBottom: 20, color: "var(--teal)", fontWeight: 500 }}>
            Cita agendada exitosamente
          </motion.div>
        )}

        {upcoming.length > 0 && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, marginBottom: 20, boxShadow: "0 4px 20px var(--shadow)" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Próximas</h2>
            {upcoming.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 10, background: "var(--surface2)", marginBottom: 10, border: "1px solid var(--border)" }}>
                <div style={{ textAlign: "center", minWidth: 60, fontFamily: "Space Grotesk" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--teal)" }}>{new Date(a.scheduled_at).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>{new Date(a.scheduled_at).toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}</div>
                </div>
                <div style={{ width: 2, height: 48, background: "var(--border)", borderRadius: 99 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{a.type}</div>
                  <div style={{ fontSize: 13, color: "var(--text3)" }}>{a.doctor_name} · {a.specialty}</div>
                </div>
                <span style={{ padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: a.status === "confirmed" ? "rgba(0,180,149,0.14)" : "rgba(232,130,10,0.14)", color: a.status === "confirmed" ? "var(--teal)" : "var(--orange)" }}>{a.status === "confirmed" ? "Confirmada" : "Pendiente"}</span>
              </motion.div>
            ))}
          </div>
        )}

        {past.length > 0 && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px var(--shadow)" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Historial</h2>
            {past.slice(0, 5).map((a) => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 10, marginBottom: 8, opacity: 0.75 }}>
                <div style={{ textAlign: "center", minWidth: 70, fontFamily: "Space Grotesk" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text3)" }}>{new Date(a.scheduled_at).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "2-digit" })}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{a.type}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{a.doctor_name}</div>
                </div>
                <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "rgba(0,180,149,0.10)", color: "var(--text3)" }}>Completada</span>
              </div>
            ))}
          </div>
        )}

        {appointments.length === 0 && (
          <div style={{ textAlign: "center", padding: 64, color: "var(--text3)" }}>
            <p style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Sin citas registradas</p>
            <p style={{ fontSize: 14 }}>Agenda tu primera consulta con uno de nuestros especialistas.</p>
            <button onClick={() => setShowModal(true)} style={{ background: grad, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 99, fontWeight: 600, cursor: "pointer", marginTop: 20 }}>Agendar ahora</button>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: 32, width: "min(480px,100%)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700 }}>Nueva cita</h2>
                <span onClick={() => setShowModal(false)} style={{ cursor: "pointer", fontSize: 22, color: "var(--text3)" }}>×</span>
              </div>
              <form onSubmit={submitCita}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 6 }}>Médico</label>
                    <select value={form.doctor_id} onChange={e => setForm({ ...form, doctor_id: e.target.value })} required style={fieldStyle}>
                      <option value="">Seleccionar...</option>
                      {doctors.map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 6 }}>Tipo</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={fieldStyle}>
                      <option>Consulta general</option><option>Control de enfermedad crónica</option><option>Primera consulta</option><option>Revisión de resultados</option><option>Urgencia</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 6 }}>Fecha</label>
                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required min={new Date().toISOString().split("T")[0]} style={fieldStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text2)", display: "block", marginBottom: 6 }}>Hora</label>
                    <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} style={fieldStyle}>
                      {["09:00", "10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={loading} style={{ width: "100%", background: grad, color: "#fff", border: "none", padding: 14, borderRadius: 99, fontWeight: 600, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Agendando..." : "Confirmar cita — $450 MXN"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
