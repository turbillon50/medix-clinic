"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const fadeUp = { hidden:{opacity:0,y:24}, visible:{opacity:1,y:0} }

export default function Home() {
  const router = useRouter()
  const [counts, setCounts] = useState({ patients:0, consults:0, doctors:0, years:0 })

  useEffect(() => {
    const targets = { patients:1840, consults:342, doctors:12, years:8 }
    const dur = 2000, fps = 60
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const p = Math.min(frame / fps, 1)
      setCounts({
        patients: Math.floor(targets.patients * p),
        consults: Math.floor(targets.consults * p),
        doctors: Math.floor(targets.doctors * p),
        years: Math.floor(targets.years * p),
      })
      if (p >= 1) clearInterval(timer)
    }, dur / fps)
    return () => clearInterval(timer)
  }, [])

  return (
    <main style={{background:"var(--bg)",minHeight:"100vh"}}>
      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(8,15,30,0.85)",borderBottom:"1px solid var(--border)",backdropFilter:"blur(20px)",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div className="font-display gradient-text" style={{fontSize:22,fontWeight:700}}>MEDIX</div>
        <button onClick={()=>router.push("/login")} style={{background:"linear-gradient(135deg,#00d4aa,#3b8beb)",color:"#fff",border:"none",padding:"10px 22px",borderRadius:99,fontWeight:600,cursor:"pointer"}}>
          Iniciar sesión
        </button>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"90vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"80px 24px",position:"relative"}}>
        <div style={{position:"absolute",top:-100,left:"50%",transform:"translateX(-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,170,0.08) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{duration:0.6}} style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,212,170,0.1)",border:"1px solid rgba(0,212,170,0.25)",color:"var(--teal)",borderRadius:99,padding:"8px 18px",fontSize:13,fontWeight:600,marginBottom:32}}>
          <span style={{fontSize:8}}>●</span> Sistema clínico activo
        </motion.div>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{duration:0.6,delay:0.1}} className="font-display" style={{fontSize:"clamp(36px,6vw,72px)",fontWeight:700,letterSpacing:-2,marginBottom:24,lineHeight:1.05}}>
          La clínica que<br/><span className="gradient-text">se adapta a ti</span>
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{duration:0.6,delay:0.2}} style={{fontSize:18,color:"var(--text2)",maxWidth:540,lineHeight:1.6,marginBottom:40}}>
          Agenda consultas, revisa tu expediente y recibe recordatorios automáticos. Atención médica de primer nivel, sin filas.
        </motion.p>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{duration:0.6,delay:0.3}} style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
          <button onClick={()=>router.push("/login")} style={{background:"linear-gradient(135deg,#00d4aa,#3b8beb)",color:"#fff",border:"none",padding:"16px 32px",borderRadius:99,fontSize:15,fontWeight:600,cursor:"pointer"}}>
            Agendar consulta
          </button>
          <button onClick={()=>router.push("/app")} style={{background:"transparent",color:"var(--text2)",border:"1px solid var(--border)",padding:"16px 32px",borderRadius:99,fontSize:15,cursor:"pointer"}}>
            Ver demo paciente →
          </button>
        </motion.div>

        {/* STATS */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{duration:0.6,delay:0.5}} style={{display:"flex",gap:48,marginTop:64,flexWrap:"wrap",justifyContent:"center"}}>
          {[{n:counts.patients.toLocaleString(),l:"Pacientes activos"},{n:counts.consults,l:"Consultas este mes"},{n:counts.doctors,l:"Médicos especialistas"},{n:counts.years,l:"Años de experiencia"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div className="font-display gradient-text" style={{fontSize:36,fontWeight:700,letterSpacing:-1}}>{s.n}</div>
              <div style={{fontSize:13,color:"var(--text3)",marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section style={{background:"var(--bg2)",padding:"80px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <p style={{fontSize:12,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--teal)",marginBottom:16}}>Lo que ofrecemos</p>
          <h2 className="font-display" style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:700,letterSpacing:-1,marginBottom:48}}>Todo en un solo lugar</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
            {[["📋","Expediente Digital","Historial clínico, estudios y recetas siempre disponibles"],["📅","Agenda Inteligente","Citas con recordatorios automáticos por WhatsApp y SMS"],["🔬","Resultados de Lab","Integración directa con laboratorios al expediente"],["💳","Pagos y Facturación","Paga en línea, CFDI automático"],["👨‍⚕️","Equipo Médico","Especialistas verificados con calificaciones reales"],["🔔","Notificaciones","Recordatorios de citas, resultados y medicamentos"]].map(([icon,title,desc],i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:28,cursor:"default"}}>
                <div style={{width:48,height:48,borderRadius:12,background:"linear-gradient(135deg,rgba(0,212,170,0.15),rgba(59,139,235,0.15))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:18}}>{icon}</div>
                <h3 style={{fontSize:17,fontWeight:600,marginBottom:8}}>{title}</h3>
                <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.5}}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid var(--border)",padding:"48px 24px",background:"var(--bg2)",textAlign:"center"}}>
        <div className="font-display gradient-text" style={{fontSize:28,fontWeight:700,marginBottom:12}}>MEDIX</div>
        <p style={{fontSize:14,color:"var(--text3)",marginBottom:24}}>Tu salud, en tus manos.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:24}}>
          {["📘","📸","💬","🎵","▶️"].map((icon,i)=>(
            <div key={i} style={{width:44,height:44,borderRadius:12,background:"var(--surface)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer"}}>{icon}</div>
          ))}
        </div>
        <p style={{fontSize:12,color:"var(--text3)"}}>© 2026 MEDIX · Guadalajara, México</p>
      </footer>
    </main>
  )
}
