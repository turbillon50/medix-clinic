"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const MODES = [
  { label: "Público", href: "/", color: "#8ba3c1" },
  { label: "Paciente", href: "/demo?to=/app", color: "#00d4aa" },
  { label: "Admin", href: "/demo?to=/admin", color: "#ff4d6d" },
]

export function DemoSwitcher() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{position:"fixed",bottom:24,right:20,zIndex:9999}}>
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:8,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:0.95}}
            style={{background:"rgba(13,24,41,0.98)",border:"1px solid rgba(0,212,170,0.18)",borderRadius:16,padding:"8px",marginBottom:8,backdropFilter:"blur(20px)",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
            {MODES.map(m=>(
              <a key={m.href} href={m.href} onClick={()=>setOpen(false)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,color:m.color,whiteSpace:"nowrap",textDecoration:"none",transition:"background 0.15s"}}
                onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.05)")}
                onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                <div style={{width:8,height:8,borderRadius:"50%",background:m.color,flexShrink:0}}/>
                {m.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}}
        onClick={()=>setOpen(!open)}
        style={{display:"flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,rgba(0,212,170,0.95),rgba(59,139,235,0.95))",border:"none",borderRadius:99,padding:"11px 20px",cursor:"pointer",backdropFilter:"blur(20px)",boxShadow:"0 8px 32px rgba(0,212,170,0.35)",color:"#04121f",fontSize:13,fontWeight:700}}>
        <span style={{fontSize:16}}>⚡</span> DEMO
        <motion.span animate={{rotate:open?180:0}} transition={{duration:0.2}} style={{display:"inline-block",fontSize:10}}>▼</motion.span>
      </motion.button>
    </div>
  )
}
