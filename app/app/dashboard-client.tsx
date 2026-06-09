"use client"
import { motion } from "framer-motion"
import { signOut } from "next-auth/react"

interface Props { user: any; appointments: any[] }

export default function PatientDashboard({ user, appointments }: Props) {
  const name = user?.name || user?.email?.split("@")[0] || "Paciente"

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex"}}>
      {/* SIDEBAR */}
      <aside style={{width:240,background:"var(--bg2)",borderRight:"1px solid var(--border)",padding:"24px 0",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh"}}>
        <div className="font-display gradient-text" style={{fontSize:20,fontWeight:700,padding:"0 24px 24px",borderBottom:"1px solid var(--border)",marginBottom:16}}>MEDIX</div>
        {[["🏠","Inicio",true],["📅","Mis Citas",false],["📋","Expediente",false],["🔬","Resultados",false],["💳","Pagos",false]].map(([icon,label,active])=>(
          <div key={String(label)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 24px",margin:"2px 12px",borderRadius:10,background:active?"linear-gradient(135deg,rgba(0,212,170,0.12),rgba(59,139,235,0.12))":"transparent",color:active?"var(--teal)":"var(--text2)",cursor:"pointer",fontSize:14,fontWeight:500}}>
            <span>{icon}</span>{label}
          </div>
        ))}
        <div style={{flex:1}}/>
        <button onClick={()=>signOut({callbackUrl:"/"})} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 24px",margin:"2px 12px",borderRadius:10,background:"transparent",border:"none",color:"var(--text3)",cursor:"pointer",fontSize:14}}>
          🚪 Cerrar sesión
        </button>
      </aside>

      {/* CONTENT */}
      <main style={{flex:1,padding:32,overflow:"auto"}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
          <h1 className="font-display" style={{fontSize:28,fontWeight:700,marginBottom:4}}>Hola, {name} 👋</h1>
          <p style={{color:"var(--text3)",marginBottom:28}}>Martes 9 de junio, 2026</p>

          {/* KPIs */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:28}}>
            {[["📅","Próxima cita",appointments[0]?.scheduled_at ? new Date(appointments[0].scheduled_at).toLocaleDateString("es-MX",{day:"2-digit",month:"short"}) : "Sin citas","Consulta pendiente"],["📋","Consultas","14","↑ 2 este mes"],["💊","Medicamentos","2","Activos"],["⭐","Satisfacción","4.9","Excelente"]].map(([icon,label,val,sub],i)=>(
              <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:"20px 24px"}}>
                <div style={{fontSize:13,color:"var(--text3)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{icon} {label}</div>
                <div className="font-display gradient-text" style={{fontSize:28,fontWeight:700,marginBottom:4}}>{val}</div>
                <div style={{fontSize:13,color:"var(--teal)"}}>{sub}</div>
              </motion.div>
            ))}
          </div>

          {/* APPOINTMENTS */}
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:24}}>
            <h2 style={{fontSize:16,fontWeight:600,marginBottom:20}}>📅 Citas recientes</h2>
            {appointments.length === 0 ? (
              <div style={{textAlign:"center",padding:40,color:"var(--text3)"}}>
                <div style={{fontSize:40,marginBottom:12}}>📅</div>
                <p>No tienes citas aún.</p>
                <p style={{fontSize:13}}>Agenda tu primera consulta desde la landing.</p>
              </div>
            ) : appointments.map((a,i) => (
              <motion.div key={a.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 16px",borderRadius:10,background:"var(--surface2)",marginBottom:10}}>
                <div style={{textAlign:"center",minWidth:50}}>
                  <div style={{fontFamily:"Space Grotesk",fontSize:18,fontWeight:700,color:"var(--teal)"}}>{new Date(a.scheduled_at).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})}</div>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,marginBottom:2}}>{a.type}</div>
                  <div style={{fontSize:13,color:"var(--text3)"}}>{a.doctor_name} · {a.specialty}</div>
                </div>
                <span style={{padding:"4px 12px",borderRadius:99,fontSize:12,fontWeight:600,background:a.status==="completed"?"rgba(0,212,170,0.12)":"rgba(255,159,67,0.12)",color:a.status==="completed"?"var(--teal)":"var(--orange)"}}>{a.status}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
