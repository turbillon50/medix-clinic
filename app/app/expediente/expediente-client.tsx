"use client"
import { motion } from "framer-motion"
import { PatientSidebar } from "@/components/PatientSidebar"
import { Icon } from "@/components/icons"

interface Props { records: any[]; patient: any; user: any }

export default function ExpedienteClient({ records, patient, user }: Props) {
  const name = patient?.name || user?.name || user?.email?.split("@")[0]
  const age = patient?.birth_date ? Math.floor((Date.now() - new Date(patient.birth_date).getTime()) / (365.25 * 24 * 3600 * 1000)) : null

  return (
    <div className="app-shell">
      <PatientSidebar active="/app/expediente" />
      <main className="app-main">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Mi Expediente</h1>
          <p style={{ color: "var(--text3)", marginBottom: 28 }}>Historial clínico completo</p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, marginBottom: 24, display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap", boxShadow: "0 4px 20px var(--shadow)" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,rgba(0,180,149,0.2),rgba(47,111,224,0.2))", border: "2px solid rgba(0,180,149,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontSize: 26, fontWeight: 700, color: "var(--teal)", flexShrink: 0 }}>
              {name?.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{name}</h2>
              <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 12 }}>
                {age ? `${age} años · ` : ""}{patient?.blood_type ? `Tipo ${patient.blood_type} · ` : ""}Folio: {patient?.folio || "Sin asignar"}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {patient?.conditions && <span style={{ padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "rgba(232,130,10,0.14)", color: "var(--orange)" }}>{patient.conditions}</span>}
                {patient?.allergies && <span style={{ padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "rgba(255,77,109,0.14)", color: "#ff4d6d" }}>Alergia: {patient.allergies}</span>}
                <span style={{ padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "rgba(0,180,149,0.14)", color: "var(--teal)" }}>Paciente activo</span>
              </div>
            </div>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px var(--shadow)" }}>
            <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600, marginBottom: 20 }}><Icon name="file" size={18} /> Historial clínico</h2>
            {records.length === 0 ? (
              <div style={{ textAlign: "center", padding: 48, color: "var(--text3)" }}>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Sin registros aún</p>
                <p style={{ fontSize: 13 }}>Tu expediente se irá completando con cada consulta.</p>
              </div>
            ) : records.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} style={{ display: "flex", gap: 20, paddingBottom: 24, position: "relative" }}>
                {i < records.length - 1 && <div style={{ position: "absolute", left: 19, top: 40, bottom: 0, width: 2, background: "var(--border)" }} />}
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,rgba(0,180,149,0.15),rgba(47,111,224,0.15))", border: "2px solid var(--teal)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="stethoscope" size={18} /></div>
                <div style={{ flex: 1, paddingTop: 8 }}>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 4 }}>{new Date(r.created_at).toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>{r.description}</div>
                  {r.diagnosis && <div style={{ fontSize: 13, color: "var(--teal)", marginTop: 6 }}>Dx: {r.diagnosis}</div>}
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{r.doctor_name} · {r.specialty}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
