"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await signIn("resend", { email, redirect: false })
    setSent(true)
    setLoading(false)
  }

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:"var(--bg)"}}>
      <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.5}} style={{width:"min(420px,100%)",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:24,padding:40}}>
        <div className="font-display gradient-text" style={{fontSize:28,fontWeight:700,marginBottom:8,textAlign:"center"}}>MEDIX</div>
        <p style={{textAlign:"center",color:"var(--text3)",fontSize:14,marginBottom:32}}>Accede a tu cuenta</p>

        {sent ? (
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:16}}>📩</div>
            <h2 style={{fontWeight:700,marginBottom:8}}>Revisa tu correo</h2>
            <p style={{color:"var(--text2)",fontSize:14}}>Enviamos un enlace mágico a <strong>{email}</strong></p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{fontSize:13,fontWeight:600,color:"var(--text2)",display:"block",marginBottom:8}}>Correo electrónico</label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              style={{width:"100%",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:12,padding:"12px 16px",color:"var(--text)",fontSize:14,outline:"none",marginBottom:20,boxSizing:"border-box"}}
            />
            <button type="submit" disabled={loading} style={{width:"100%",background:"linear-gradient(135deg,#00d4aa,#3b8beb)",color:"#fff",border:"none",padding:"14px",borderRadius:99,fontWeight:600,fontSize:15,cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1}}>
              {loading ? "Enviando..." : "Enviar enlace mágico →"}
            </button>
          </form>
        )}

        <p style={{textAlign:"center",fontSize:12,color:"var(--text3)",marginTop:24}}>
          ¿Primera vez? Tu cuenta se crea automáticamente.
        </p>
      </motion.div>
    </div>
  )
}
