"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"

const MODES = [
  { label: "Público", href: "/", color: "#8ba3c1" },
  { label: "Paciente", href: "/app", color: "#00d4aa" },
  { label: "Admin", href: "/admin", color: "#ff4d6d" },
]

export function DemoSwitcher() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <div style={{position:"fixed",bottom:24,right:20,zIndex:9999}}>
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:8,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:0.95}}
            style={{background:"rgba(13,24,41,0.98)",border:"1px solid rgba(99,179,237,0.15)",borderRadius:16,padding:"8px",marginBottom:8,backdropFilter:"blur(20px)",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
            {MODES.map(m=>(
              <div key={m.href} onClick={()=>{router.push(m.href);setOpen(false)}}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,color:m.color,whiteSpace:"nowrap",transition:"background 0.15s"}}
                onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.05)")}
                onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                <div style={{width:8,height:8,borderRadius:"50%",background:m.color,flexShrink:0}}/>
                {m.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}}
        onClick={()=>setOpen(!open)}
        style={{display:"flex",alignItems:"center",gap:8,background:"rgba(13,24,41,0.95)",border:"1px solid rgba(99,179,237,0.2)",borderRadius:99,padding:"10px 18px",cursor:"pointer",backdropFilter:"blur(20px)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",color:"#e8f0fe",fontSize:13,fontWeight:600}}>
        <span style={{fontSize:16}}>⚡</span> DEMO
        <motion.span animate={{rotate:open?180:0}} transition={{duration:0.2}} style={{display:"inline-block",fontSize:10,color:"#8ba3c1"}}>▼</motion.span>
      </motion.button>
    </div>
  )
}
