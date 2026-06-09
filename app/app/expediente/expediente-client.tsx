"use client"
import { motion } from "framer-motion"
import Link from "next/link"

interface Props { records: any[]; patient: any; user: any }

export default function ExpedienteClient({ records, patient, user }: Props) {
  const name = patient?.name || user?.name || user?.email?.split("@")[0]
  const age = patient?.birth_date ? Math.floor((Date.now() - new Date(patient.birth_date).getTime()) / (365.25*24*3600*1000)) : null

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex"}}>
      <aside style={{width:240,background:"var(--bg2)",borderRight:"1px solid var(--border)",padding:"24px 0",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",flexShrink:0}}>
        <div className="font-display gradient-text" style={{fontSize:20,fontWeight:700,padding:"0 24px 24px",borderBottom:"1px solid var(--border)",marginBottom:16}}>MEDIX</div>
        {[["🏠","Inicio","/app"],["📅","Mis Citas","/app/citas"],["📋","Expediente","/app/expediente"],["🔬","Resultados","/app/resultados"],["💳","Pagos","/app/pagos"]].map(([icon,label,href])=>(
          <Link key={String(href)} href={String(href)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 24px",margin:"2px 12px",borderRadius:10,background:href==="/app/expediente"?"linear-gradient(135deg,rgba(0,212,170,0.12),rgba(59,139,235,0.12))":"transparent",color:href==="/app/expediente"?"var(--teal)":"var(--text2)",fontSize:14,fontWeight:500,textDecoration:"none"}}>
            <span>{icon}</span>{label}
          </Link>
        ))}
      </aside>

      <main style={{flex:1,padding:32,overflow:"auto"}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>
          <h1 className="font-display" style={{fontSize:28,fontWeight:700,marginBottom:4}}>Mi Expediente 📋</h1>
          <p style={{color:"var(--text3)",marginBottom:28}}>Historial clínico completo</p>

          {/* Patient card */}
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:24,marginBottom:24,display:"flex",gap:20,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,rgba(0,212,170,0.2),rgba(59,139,235,0.2))",border:"2px solid rgba(0,212,170,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Space Grotesk",fontSize:26,fontWeight:700,color:"var(--teal)",flexShrink:0}}>
              {name?.split(" ").map((w:string)=>w[0]).join("").slice(0,2)}
            </div>
            <div style={{flex:1}}>
              <h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>{name}</h2>
              <p style={{fontSize:14,color:"var(--text2)",marginBottom:12}}>
                {age ? `${age} años · ` : ""}{patient?.blood_type ? `Tipo ${patient.blood_type} · ` : ""}Folio: {patient?.folio || "Sin asignar"}
              </p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {patient?.conditions && <span style={{padding:"4px 12px",borderRadius:99,fontSize:12,fontWeight:600,background:"rgba(255,159,67,0.12)",color:"var(--orange)"}}>{patient.conditions}</span>}
                {patient?.allergies && <span style={{padding:"4px 12px",borderRadius:99,fontSize:12,fontWeight:600,background:"rgba(255,77,109,0.12)",color:"#ff4d6d"}}>⚠ {patient.allergies}</span>}
                <span style={{padding:"4px 12px",borderRadius:99,fontSize:12,fontWeight:600,background:"rgba(0,212,170,0.12)",color:"var(--teal)"}}>Paciente activo</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:24}}>
            <h2 style={{fontSize:16,fontWeight:600,marginBottom:20}}>🕐 Historial clínico</h2>
            {records.length === 0 ? (
              <div style={{textAlign:"center",padding:48,color:"var(--text3)"}}>
                <div style={{fontSize:48,marginBottom:12}}>📋</div>
                <p style={{fontWeight:600,marginBottom:4}}>Sin registros aún</p>
                <p style={{fontSize:13}}>Tu expediente se irá completando con cada consulta.</p>
              </div>
            ) : records.map((r,i)=>(
              <motion.div key={r.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}} style={{display:"flex",gap:20,paddingBottom:24,position:"relative"}}>
                {i < records.length-1 && <div style={{position:"absolute",left:19,top:40,bottom:0,width:2,background:"var(--border)"}}/>}
                <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,rgba(0,212,170,0.15),rgba(59,139,235,0.15))",border:"2px solid var(--teal)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>🩺</div>
                <div style={{flex:1,paddingTop:8}}>
                  <div style={{fontSize:12,color:"var(--text3)",marginBottom:4}}>{new Date(r.created_at).toLocaleDateString("es-MX",{day:"2-digit",month:"long",year:"numeric"})}</div>
                  <div style={{fontSize:15,fontWeight:600,marginBottom:4}}>{r.title}</div>
                  <div style={{fontSize:13,color:"var(--text2)",lineHeight:1.5}}>{r.description}</div>
                  {r.diagnosis && <div style={{fontSize:13,color:"var(--teal)",marginTop:6}}>Dx: {r.diagnosis}</div>}
                  <div style={{fontSize:12,color:"var(--text3)",marginTop:4}}>{r.doctor_name} · {r.specialty}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
