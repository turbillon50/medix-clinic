"use client"
import { motion } from "framer-motion"
import { signOut } from "next-auth/react"

interface Props { stats: any; patients: any[]; user: any }

export default function AdminDashboardClient({ stats, patients, user }: Props) {
  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex"}}>
      <aside style={{width:240,background:"var(--bg2)",borderRight:"1px solid var(--border)",padding:"24px 0",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh"}}>
        <div style={{padding:"0 24px 24px",borderBottom:"1px solid var(--border)",marginBottom:16}}>
          <div className="font-display gradient-text" style={{fontSize:20,fontWeight:700}}>MEDIX</div>
          <div style={{fontSize:11,color:"#ff4d6d",fontWeight:600,marginTop:2}}>● Admin Panel</div>
        </div>
        {[["📊","Dashboard",true],["📅","Citas de Hoy",false],["👥","Pacientes",false],["👨‍⚕️","Médicos",false],["💰","Facturación",false],["🔬","Laboratorio",false],["📈","Reportes",false]].map(([icon,label,active])=>(
          <div key={String(label)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 24px",margin:"2px 12px",borderRadius:10,background:active?"linear-gradient(135deg,rgba(0,212,170,0.12),rgba(59,139,235,0.12))":"transparent",color:active?"var(--teal)":"var(--text2)",cursor:"pointer",fontSize:14,fontWeight:500}}>
            <span>{icon}</span>{label}
          </div>
        ))}
        <div style={{flex:1}}/>
        <button onClick={()=>signOut({callbackUrl:"/"})} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 24px",margin:"2px 12px",borderRadius:10,background:"transparent",border:"none",color:"var(--text3)",cursor:"pointer",fontSize:14}}>
          🚪 Salir
        </button>
      </aside>

      <main style={{flex:1,padding:32}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
          <h1 className="font-display" style={{fontSize:28,fontWeight:700,marginBottom:4}}>Dashboard 📊</h1>
          <p style={{color:"var(--text3)",marginBottom:28}}>Martes 9 de junio, 2026 — Vista en tiempo real</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:28}}>
            {[["👥","Pacientes registrados",stats.patients,"Base de datos real"],["👨‍⚕️","Médicos activos",stats.doctors,"En servicio"],["📅","Citas hoy","8","Programadas"],["💰","Ingresos hoy","$6,800","MXN estimado"]].map(([icon,label,val,sub],i)=>(
              <motion.div key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:"20px 24px"}}>
                <div style={{fontSize:12,color:"var(--text3)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{icon} {label}</div>
                <div className="font-display gradient-text" style={{fontSize:32,fontWeight:700,marginBottom:4}}>{val}</div>
                <div style={{fontSize:13,color:"var(--teal)"}}>{sub}</div>
              </motion.div>
            ))}
          </div>

          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h2 style={{fontSize:16,fontWeight:600}}>👥 Pacientes registrados</h2>
              <span style={{fontSize:12,color:"var(--text3)"}}>Datos reales de Neon DB</span>
            </div>
            {patients.length === 0 ? (
              <div style={{textAlign:"center",padding:40,color:"var(--text3)"}}>
                <div style={{fontSize:40,marginBottom:12}}>👥</div>
                <p>No hay pacientes aún.</p>
              </div>
            ) : (
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
                <thead>
                  <tr>
                    {["Paciente","Email","Tipo sangre","Condición","Registro"].map(h=>(
                      <th key={h} style={{textAlign:"left",padding:"12px 16px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text3)",borderBottom:"1px solid var(--border)"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p,i)=>(
                    <tr key={i} style={{borderBottom:"1px solid rgba(99,179,237,0.06)"}}>
                      <td style={{padding:"14px 16px",fontWeight:500}}>{p.name || "—"}</td>
                      <td style={{padding:"14px 16px",color:"var(--text2)",fontSize:13}}>{p.email}</td>
                      <td style={{padding:"14px 16px"}}><span style={{padding:"4px 10px",borderRadius:99,fontSize:12,fontWeight:600,background:"rgba(59,139,235,0.12)",color:"var(--blue)"}}>{p.blood_type || "—"}</span></td>
                      <td style={{padding:"14px 16px",color:"var(--text2)",fontSize:13}}>{p.conditions || "Sin condición"}</td>
                      <td style={{padding:"14px 16px",color:"var(--text3)",fontSize:12}}>{new Date(p.created_at).toLocaleDateString("es-MX")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
