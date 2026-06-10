"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Icon } from "./icons"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("medix_theme")
    const isDark = saved ? saved === "dark" : document.documentElement.classList.contains("dark")
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("medix_theme", next ? "dark" : "light")
  }

  return (
    <motion.button onClick={toggle} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
      aria-label={dark ? "Activar modo día" : "Activar modo noche"}
      title={dark ? "Modo día" : "Modo noche"}
      style={{
        position: "fixed", bottom: 24, left: 20, zIndex: 9999,
        display: "flex", alignItems: "center", gap: 8,
        background: "var(--surface)", color: "var(--text)",
        border: "1px solid var(--border)", borderRadius: 99,
        padding: "10px 16px", cursor: "pointer",
        boxShadow: "0 8px 28px var(--shadow)", fontSize: 13, fontWeight: 600,
      }}>
      <Icon name={dark ? "sun" : "moon"} size={17} />
      {dark ? "Día" : "Noche"}
    </motion.button>
  )
}
