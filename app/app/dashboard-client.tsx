"use client"
import { motion } from "framer-motion"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface Props { user: any; appointments: any[] }

export default function PatientDashboard({ user, appointments }: Props) {
  const name = user?.name || user?.email?.split("@")[0] || "Paciente"

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex"}}>
      <aside style={{width:240,background:"var(--bg2)",borderRight:"1px solid var(--border)",padding:"24px 0",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",flexShrink:0}}>
        <div className="font-display gradient-text" style={{fontSize:20,fontWeight:700,padding:"0 24px 24px",borderBottom:"1px solid var(--border)",marginBottom:16}}>MEDIX</div>
        {[["🏠","Inicio","/app"],["📅","Mis Citas","/app/citas"],["📋","Expediente","/app/expediente"],["🔬","Resultados","/app/resultados"],["💳","Pagos","/app/pagos"]].map(([icon,label,href])=>(
          <Link key={String(href)} href={String(href)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 24px",margin:"2px 12px",borderRadius:10,background:href==="/app"?"linear-gradient(135deg,rgba(0,212,170,0.12),rgba(59,139,235,0.12))":"transparent",color:href==="/app"?"var(--teal)":"var(--text2)",fontSize:14,fontWeight:500,textDecoration:"none"}}>
            <span>{icon}</span>{label}
          </Link>
        ))}
        <div style={{flex:1}}/>
        <button onClick={()=>signOut({callbackUrl:"/"})} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 36px",borderRadius:10,background:"transparent",border:"none",color:"var(--text3)",cursor:"pointer",fontSize:14}}>
          🚪 Cerrar sesión
        </button>
      </aside>

      <main style={{flex:1,padding:32,overflow:"auto"}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
          <h1 className="font-display" style={{fontSize:28,fontWeight:700,marginBottom:4}}>Hola, {name} 👋</h1>
          <p style={{color:"var(--text3)",marginBottom:28}}>{new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:28}}>
            {[
              ["📅","Próxima cita",appointments[0] ? new Date(appointments[0].scheduled_at).toLocaleDateString("es-MX",{day:"2-digit",month:"short"}) : "Sin citas","Ver todas →"],
              ["📋","Consultas totales",String(appointments.length),"Este año"],
              ["💊","Medicamentos","2","Activos"],
              ["⭐","Tu médico","Dr. García","Cardiología"]
            ].map(([icon,label,val,sub],i)=>(
              <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:"20px 24px"}}>
                <div style={{fontSize:12,color:"var(--text3)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{icon} {label}</div>
                <div className="font-display gradient-text" style={{fontSize:28,fontWeight:700,marginBottom:4}}>{val}</div>
                <div style={{fontSize:13,color:"var(--teal)"}}>{sub}</div>
              </motion.div>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:24}}>
              <h2 style={{fontSize:16,fontWeight:600,marginBottom:16}}>📅 Citas recientes</h2>
              {appointments.length === 0 ? (
                <div style={{textAlign:"center",padding:32,color:"var(--text3)"}}>
                  <div style={{fontSize:36,marginBottom:8}}>📅</div>
                  <p style={{fontSize:13}}>Sin citas aún</p>
                  <Link href="/app/citas" style={{display:"inline-block",marginTop:12,padding:"8px 20px",borderRadius:99,background:"linear-gradient(135deg,#00d4aa,#3b8beb)",color:"#fff",fontSize:13,fontWeight:600,textDecoration:"none"}}>Agendar</Link>
                </div>
              ) : appointments.slice(0,3).map((a,i)=>(
                <motion.div key={a.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,background:"var(--surface2)",marginBottom:8}}>
                  <div style={{fontFamily:"Space Grotesk",fontSize:14,fontWeight:700,color:"var(--teal)",minWidth:52,textAlign:"center"}}>{new Date(a.scheduled_at).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600}}>{a.type}</div>
                    <div style={{fontSize:11,color:"var(--text3)"}}>{a.doctor_name}</div>
                  </div>
                  <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:99,background:"rgba(255,159,67,0.12)",color:"var(--orange)"}}>{a.status}</span>
                </motion.div>
              ))}
            </div>

            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:24}}>
              <h2 style={{fontSize:16,fontWeight:600,marginBottom:16}}>⚡ Accesos rápidos</h2>
              {[["📋","Ver expediente","/app/expediente"],["📅","Agendar cita","/app/citas"],["🔬","Resultados lab","/app/resultados"],["💳","Historial pagos","/app/pagos"]].map(([icon,label,href])=>(
                <Link key={String(href)} href={String(href)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,background:"var(--surface2)",marginBottom:8,textDecoration:"none",color:"var(--text2)",fontSize:14,fontWeight:500,transition:"all 0.15s"}}>
                  <span style={{fontSize:18}}>{icon}</span>{label}
                  <span style={{marginLeft:"auto",color:"var(--text3)"}}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
