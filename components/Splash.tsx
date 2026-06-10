"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Icon } from "./icons"

export function Splash() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}
          style={{ position: "fixed", inset: 0, zIndex: 99999, background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--teal)" }}>
            <span style={{ display: "inline-flex", width: 56, height: 56, alignItems: "center", justifyContent: "center", borderRadius: 18, background: "linear-gradient(135deg,var(--grad-from),var(--grad-to))", color: "#fff" }}>
              <Icon name="heart" size={30} />
            </span>
            <span className="font-display gradient-text" style={{ fontSize: 52, fontWeight: 700, letterSpacing: -3 }}>MEDIX</span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontSize: 14, color: "var(--text3)", fontWeight: 500, letterSpacing: "0.05em" }}>
            Tu clínica en tu mano
          </motion.p>
          <motion.div initial={{ width: 0 }} animate={{ width: 200 }} transition={{ delay: 0.4, duration: 1.1, ease: "easeInOut" }}
            style={{ height: 3, background: "linear-gradient(90deg,var(--grad-from),var(--grad-to))", borderRadius: 99, overflow: "hidden" }}>
            <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              style={{ width: "50%", height: "100%", background: "rgba(255,255,255,0.5)" }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
