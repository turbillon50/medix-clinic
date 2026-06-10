"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Icon } from "./icons"

const MODES = [
  { label: "Público", href: "/", color: "var(--text2)" },
  { label: "Paciente", href: "/demo?to=/app", color: "var(--teal)" },
  { label: "Admin", href: "/demo?to=/admin", color: "#ff4d6d" },
]

export function DemoSwitcher() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: "fixed", bottom: 24, right: 20, zIndex: 9999 }}>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "8px", marginBottom: 8, boxShadow: "0 20px 60px var(--shadow)" }}>
            {MODES.map(m => (
              <a key={m.href} href={m.href} onClick={() => setOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, color: m.color, whiteSpace: "nowrap", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                {m.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,var(--grad-from),var(--grad-to))", border: "none", borderRadius: 99, padding: "11px 20px", cursor: "pointer", boxShadow: "0 8px 32px var(--shadow)", color: "#fff", fontSize: 13, fontWeight: 700 }}>
        <Icon name="bolt" size={16} /> DEMO
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "inline-block", fontSize: 10 }}>▼</motion.span>
      </motion.button>
    </div>
  )
}
