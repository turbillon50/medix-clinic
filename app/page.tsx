"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const fadeUp = { hidden:{opacity:0,y:32}, visible:{opacity:1,y:0,transition:{duration:0.6}} }
const stagger = { visible:{transition:{staggerChildren:0.1}} }

function NumberCounter({ end, suffix="" }: { end:number; suffix?:string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let s = 0; const dur = 1800; const fps = 60
        const inc = end / (dur/fps*fps/fps)
        const t = setInterval(() => { s = Math.min(s+inc,end); setVal(Math.floor(s)); if(s>=end) clearInterval(t) }, dur/fps)
      }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  },[end])
  return <div ref={ref}>{val.toLocaleString()}{suffix}</div>
}

export default function Home() {
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] })
  const heroY = useTransform(scrollYProgress,[0,1],["0%","30%"])
  const heroOpacity = useTransform(scrollYProgress,[0,0.8],[1,0])

  return (
    <main style={{background:"#080f1e",minHeight:"100vh",overflowX:"hidden"}}>

      {/* NAV */}
      <motion.nav initial={{y:-60,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5,delay:2.3}}
        style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:"rgba(8,15,30,0.85)",borderBottom:"1px solid rgba(99,179,237,0.1)",backdropFilter:"blur(20px)",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div style={{fontFamily:"Space Grotesk,sans-serif",fontSize:22,fontWeight:700,letterSpacing:-1,background:"linear-gradient(135deg,#00d4aa,#3b8beb)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          MEDIX
        </div>
        <div style={{display:"flex",gap:28,alignItems:"center"}}>
          {["Servicios","Médicos","Precios"].map(l=>(
            <span key={l} style={{color:"#8ba3c1",fontSize:14,fontWeight:500,cursor:"pointer"}}>{l}</span>
          ))}
          <motion.button whileHover={{scale:1.04,boxShadow:"0 8px 24px rgba(0,212,170,0.3)"}} whileTap={{scale:0.97}}
            onClick={()=>router.push("/login")}
            style={{background:"linear-gradient(135deg,#00d4aa,#3b8beb)",color:"#fff",border:"none",padding:"10px 22px",borderRadius:99,fontWeight:600,cursor:"pointer",fontSize:13}}>
            Iniciar sesión
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO */}
      <div ref={heroRef} style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",paddingTop:64}}>
        {/* BG Image parallax */}
        <motion.div style={{position:"absolute",inset:0,y:heroY,opacity:heroOpacity}}>
          <Image src="/images/hero-bg.jpg" alt="MEDIX clinic" fill style={{objectFit:"cover",objectPosition:"center top"}} priority quality={85}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(8,15,30,0.6) 0%,rgba(8,15,30,0.85) 60%,#080f1e 100%)"}}/>
        </motion.div>

        {/* Glow */}
        <div style={{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,170,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>

        <div style={{position:"relative",textAlign:"center",padding:"0 24px",maxWidth:800}}>
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:2.4,duration:0.6}}
            style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,212,170,0.1)",border:"1px solid rgba(0,212,170,0.25)",color:"#00d4aa",borderRadius:99,padding:"8px 18px",fontSize:13,fontWeight:600,marginBottom:32}}>
            <motion.span animate={{opacity:[1,0.2,1]}} transition={{repeat:Infinity,duration:1.5}} style={{fontSize:8}}>●</motion.span>
            Sistema clínico activo · 8 médicos disponibles
          </motion.div>

          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:2.5,duration:0.7}}
            style={{fontFamily:"Space Grotesk,sans-serif",fontSize:"clamp(40px,7vw,80px)",fontWeight:700,lineHeight:1.02,letterSpacing:-3,marginBottom:24}}>
            Tu clínica,<br/>
            <span style={{background:"linear-gradient(135deg,#00d4aa,#3b8beb,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              en tu mano
            </span>
          </motion.h1>

          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:2.6,duration:0.6}}
            style={{fontSize:18,color:"#8ba3c1",maxWidth:520,margin:"0 auto 40px",lineHeight:1.65}}>
            Agenda consultas, consulta tu expediente y recibe recordatorios automáticos. Atención médica de primer nivel.
          </motion.p>

          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:2.7,duration:0.6}}
            style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <motion.button whileHover={{scale:1.04,y:-2,boxShadow:"0 16px 40px rgba(0,212,170,0.4)"}} whileTap={{scale:0.97}}
              onClick={()=>router.push("/login")}
              style={{background:"linear-gradient(135deg,#00d4aa,#3b8beb)",color:"#fff",border:"none",padding:"16px 36px",borderRadius:99,fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:-0.3}}>
              Agendar consulta
            </motion.button>
            <motion.button whileHover={{scale:1.02,borderColor:"#00d4aa"}} whileTap={{scale:0.97}}
              onClick={()=>router.push("/app")}
              style={{background:"transparent",color:"#8ba3c1",border:"1px solid rgba(99,179,237,0.2)",padding:"16px 32px",borderRadius:99,fontSize:15,fontWeight:500,cursor:"pointer",transition:"border-color 0.2s"}}>
              Ver demo de paciente →
            </motion.button>
          </motion.div>

          {/* STATS */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:2.9,duration:0.6}}
            style={{display:"flex",gap:48,justifyContent:"center",marginTop:72,flexWrap:"wrap"}}>
            {[{end:1840,label:"Pacientes activos"},{end:342,label:"Consultas este mes"},{end:12,label:"Especialistas"},{end:8,label:"Años de experiencia"}].map((s,i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontFamily:"Space Grotesk,sans-serif",fontSize:38,fontWeight:700,letterSpacing:-2,background:"linear-gradient(135deg,#00d4aa,#3b8beb)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                  <NumberCounter end={s.end}/>
                </div>
                <div style={{fontSize:13,color:"#4d6b8a",marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* SERVICES with HF images */}
      <section style={{padding:"100px 24px",maxWidth:1200,margin:"0 auto"}}>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true,margin:"-80px"}} variants={stagger}>
          <motion.p variants={fadeUp} style={{fontSize:12,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#00d4aa",marginBottom:16}}>Nuestros servicios</motion.p>
          <motion.h2 variants={fadeUp} style={{fontFamily:"Space Grotesk,sans-serif",fontSize:"clamp(28px,4vw,52px)",fontWeight:700,letterSpacing:-2,marginBottom:16,lineHeight:1.05}}>
            Todo lo que tu clínica necesita
          </motion.h2>
          <motion.p variants={fadeUp} style={{fontSize:17,color:"#8ba3c1",maxWidth:560,lineHeight:1.65,marginBottom:64}}>
            Desde la agenda hasta resultados de laboratorio. Gestiona tu salud con herramientas diseñadas para el mundo real.
          </motion.p>
        </motion.div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:24}}>
          {[
            {img:"/images/consult.jpg",title:"Consulta médica",desc:"Especialistas certificados listos para atenderte. Agenda en segundos, sin filas.",tag:"Disponible hoy"},
            {img:"/images/lab.jpg",title:"Laboratorio clínico",desc:"Resultados integrados directamente a tu expediente en tiempo real.",tag:"Integrado"},
            {img:"/images/reception.jpg",title:"Clínica premium",desc:"Instalaciones de primer nivel con tecnología de vanguardia para tu comodidad.",tag:"Guadalajara"},
          ].map((card,i)=>(
            <motion.div key={i} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
              whileHover={{y:-6,boxShadow:"0 24px 64px rgba(0,0,0,0.4)"}}
              style={{background:"#162033",border:"1px solid rgba(99,179,237,0.1)",borderRadius:24,overflow:"hidden",cursor:"pointer"}}>
              <div style={{position:"relative",height:240,overflow:"hidden"}}>
                <Image src={card.img} alt={card.title} fill style={{objectFit:"cover",transition:"transform 0.6s"}}
                  onMouseEnter={e=>((e.target as HTMLElement).style.transform="scale(1.05)")}
                  onMouseLeave={e=>((e.target as HTMLElement).style.transform="scale(1)")}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 50%,rgba(22,32,51,0.9) 100%)"}}/>
                <div style={{position:"absolute",top:16,left:16,background:"rgba(0,212,170,0.15)",border:"1px solid rgba(0,212,170,0.3)",color:"#00d4aa",padding:"4px 12px",borderRadius:99,fontSize:11,fontWeight:700}}>
                  {card.tag}
                </div>
              </div>
              <div style={{padding:24}}>
                <h3 style={{fontSize:20,fontWeight:700,marginBottom:8}}>{card.title}</h3>
                <p style={{fontSize:14,color:"#8ba3c1",lineHeight:1.55}}>{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM section */}
      <section style={{background:"#0d1829",padding:"100px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",flexWrap:"wrap"}}>
            <motion.div initial={{opacity:0,x:-32}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <p style={{fontSize:12,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#00d4aa",marginBottom:16}}>Nuestro equipo</p>
              <h2 style={{fontFamily:"Space Grotesk,sans-serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:700,letterSpacing:-2,marginBottom:20,lineHeight:1.08}}>
                Médicos certificados,<br/>resultados reales
              </h2>
              <p style={{fontSize:16,color:"#8ba3c1",lineHeight:1.65,marginBottom:32}}>
                Cada especialista en MEDIX es verificado, calificado y comprometido con tu salud. Calificaciones reales de pacientes reales.
              </p>
              {[["Dr. Carlos García","Cardiología","4.9 ⭐","12 años"],["Dra. Ana Martínez","Ginecología","4.8 ⭐","8 años"],["Dr. Luis Ramírez","Pediatría","5.0 ⭐","15 años"]].map(([name,spec,rating,exp],i)=>(
                <motion.div key={i} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                  style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:"1px solid rgba(99,179,237,0.08)"}}>
                  <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,rgba(0,212,170,0.15),rgba(59,139,235,0.15))",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Space Grotesk",fontWeight:700,color:"#00d4aa",fontSize:14,flexShrink:0}}>
                    {name.split(" ").map((w:string)=>w[0]).join("").slice(0,2)}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:14}}>{name}</div>
                    <div style={{fontSize:12,color:"#00d4aa"}}>{spec}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#ff9f43"}}>{rating}</div>
                    <div style={{fontSize:11,color:"#4d6b8a"}}>{exp}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.7}}
              style={{position:"relative",borderRadius:24,overflow:"hidden",aspectRatio:"3/4"}}>
              <Image src="/images/team.jpg" alt="Equipo médico MEDIX" fill style={{objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 60%,rgba(13,24,41,0.8) 100%)"}}/>
              <div style={{position:"absolute",bottom:24,left:24,right:24}}>
                <div style={{background:"rgba(13,24,41,0.9)",border:"1px solid rgba(0,212,170,0.2)",borderRadius:16,padding:"16px 20px",backdropFilter:"blur(12px)"}}>
                  <div style={{fontSize:24,fontWeight:700,fontFamily:"Space Grotesk",background:"linear-gradient(135deg,#00d4aa,#3b8beb)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>+12</div>
                  <div style={{fontSize:13,color:"#8ba3c1"}}>Especialistas certificados</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"100px 24px",maxWidth:1100,margin:"0 auto"}}>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger} style={{textAlign:"center",marginBottom:64}}>
          <motion.p variants={fadeUp} style={{fontSize:12,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#00d4aa",marginBottom:16}}>Cómo funciona</motion.p>
          <motion.h2 variants={fadeUp} style={{fontFamily:"Space Grotesk,sans-serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:700,letterSpacing:-2,marginBottom:16}}>
            En 3 pasos, listo
          </motion.h2>
        </motion.div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24}}>
          {[
            {n:"01",icon:"👤",title:"Crea tu cuenta",desc:"Regístrate en menos de 2 minutos con tu correo. Sin contraseñas, sin complicaciones."},
            {n:"02",icon:"👨‍⚕️",title:"Elige tu especialista",desc:"Filtra por especialidad y horario. Lee calificaciones de pacientes reales."},
            {n:"03",icon:"✅",title:"Asiste a tu cita",desc:"Recibe recordatorio, paga en línea y consulta tu expediente después."},
          ].map((step,i)=>(
            <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.15}}
              whileHover={{y:-4}}
              style={{background:"#162033",border:"1px solid rgba(99,179,237,0.1)",borderRadius:24,padding:32,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:16,right:20,fontFamily:"Space Grotesk",fontSize:48,fontWeight:800,color:"rgba(0,212,170,0.06)",letterSpacing:-2}}>{step.n}</div>
              <div style={{width:52,height:52,borderRadius:16,background:"linear-gradient(135deg,rgba(0,212,170,0.15),rgba(59,139,235,0.15))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:20}}>
                {step.icon}
              </div>
              <h3 style={{fontSize:18,fontWeight:700,marginBottom:10}}>{step.title}</h3>
              <p style={{fontSize:14,color:"#8ba3c1",lineHeight:1.6}}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{background:"#0d1829",padding:"100px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger} style={{textAlign:"center",marginBottom:64}}>
            <motion.p variants={fadeUp} style={{fontSize:12,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#00d4aa",marginBottom:16}}>Planes</motion.p>
            <motion.h2 variants={fadeUp} style={{fontFamily:"Space Grotesk,sans-serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:700,letterSpacing:-2,marginBottom:16}}>
              Precios claros, sin sorpresas
            </motion.h2>
          </motion.div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
            {[
              {plan:"Básico",price:299,period:"por mes",features:["Hasta 3 médicos","Agenda digital","Expediente básico","Notificaciones SMS"],featured:false},
              {plan:"Profesional",price:799,period:"por mes",features:["Hasta 15 médicos","Expediente + Lab","Facturación CFDI","Pagos en línea","Reportes y KPIs","Soporte prioritario"],featured:true},
              {plan:"Enterprise",price:0,period:"a la medida",features:["Médicos ilimitados","Multi-sucursal","API e integraciones","Dominio propio","SLA garantizado","Implementación incluida"],featured:false},
            ].map((p,i)=>(
              <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                whileHover={{y:-4}}
                style={{background:p.featured?"linear-gradient(180deg,rgba(0,212,170,0.06),#162033)":"#162033",border:p.featured?"1px solid rgba(0,212,170,0.4)":"1px solid rgba(99,179,237,0.1)",borderRadius:24,padding:32,position:"relative"}}>
                {p.featured && (
                  <div style={{position:"absolute",top:20,right:20,background:"linear-gradient(135deg,#00d4aa,#3b8beb)",color:"#fff",fontSize:11,fontWeight:700,padding:"4px 14px",borderRadius:99,letterSpacing:"0.05em"}}>
                    POPULAR
                  </div>
                )}
                <div style={{fontSize:13,fontWeight:700,color:"#00d4aa",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{p.plan}</div>
                {p.price > 0 ? (
                  <div style={{fontFamily:"Space Grotesk,sans-serif",fontSize:48,fontWeight:700,letterSpacing:-2,marginBottom:4}}>
                    <span style={{fontSize:22,verticalAlign:"super",fontWeight:500}}>$</span>{p.price}
                  </div>
                ) : (
                  <div style={{fontFamily:"Space Grotesk,sans-serif",fontSize:28,fontWeight:700,marginBottom:4,paddingTop:8}}>A la medida</div>
                )}
                <div style={{fontSize:13,color:"#4d6b8a",marginBottom:24}}>{p.period}</div>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
                  {p.features.map((f:string)=>(
                    <li key={f} style={{fontSize:14,color:"#8ba3c1",display:"flex",alignItems:"center",gap:10}}>
                      <span style={{color:"#00d4aa",fontWeight:700}}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                  onClick={()=>router.push("/login")}
                  style={{width:"100%",background:p.featured?"linear-gradient(135deg,#00d4aa,#3b8beb)":"transparent",color:p.featured?"#fff":"#8ba3c1",border:p.featured?"none":"1px solid rgba(99,179,237,0.2)",padding:14,borderRadius:99,fontWeight:600,fontSize:14,cursor:"pointer"}}>
                  {p.price > 0 ? "Comenzar" : "Hablar con ventas"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{padding:"100px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,170,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}>
          <motion.h2 variants={fadeUp} style={{fontFamily:"Space Grotesk,sans-serif",fontSize:"clamp(28px,5vw,56px)",fontWeight:700,letterSpacing:-2,marginBottom:16,lineHeight:1.05}}>
            Empieza hoy,<br/><span style={{background:"linear-gradient(135deg,#00d4aa,#3b8beb)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>sin costo inicial</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{fontSize:17,color:"#8ba3c1",marginBottom:40,maxWidth:480,margin:"0 auto 40px"}}>
            Prueba MEDIX gratis por 30 días. Sin tarjeta de crédito.
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.button whileHover={{scale:1.04,y:-2,boxShadow:"0 20px 48px rgba(0,212,170,0.4)"}} whileTap={{scale:0.97}}
              onClick={()=>router.push("/login")}
              style={{background:"linear-gradient(135deg,#00d4aa,#3b8beb)",color:"#fff",border:"none",padding:"18px 48px",borderRadius:99,fontSize:17,fontWeight:700,cursor:"pointer",letterSpacing:-0.3}}>
              Crear cuenta gratis →
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid rgba(99,179,237,0.1)",padding:"60px 24px",background:"#0d1829"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24,marginBottom:40}}>
            <div>
              <div style={{fontFamily:"Space Grotesk,sans-serif",fontSize:28,fontWeight:700,background:"linear-gradient(135deg,#00d4aa,#3b8beb)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:8}}>MEDIX</div>
              <p style={{fontSize:14,color:"#4d6b8a",maxWidth:280}}>Tu clínica en tu mano. Guadalajara, México.</p>
            </div>
            <div style={{display:"flex",gap:10}}>
              {[{icon:"📘",label:"Facebook"},{icon:"📸",label:"Instagram"},{icon:"💬",label:"WhatsApp"},{icon:"🎵",label:"TikTok"},{icon:"▶️",label:"YouTube"}].map(s=>(
                <motion.div key={s.label} whileHover={{y:-3,scale:1.1}} style={{width:44,height:44,borderRadius:12,background:"#162033",border:"1px solid rgba(99,179,237,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer"}}>
                  {s.icon}
                </motion.div>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(99,179,237,0.06)",paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <span style={{fontSize:12,color:"#4d6b8a"}}>© 2026 MEDIX · Todos los derechos reservados</span>
            <div style={{display:"flex",gap:20}}>
              {["Privacidad","Términos","Contacto"].map(l=><span key={l} style={{fontSize:12,color:"#4d6b8a",cursor:"pointer"}}>{l}</span>)}
            </div>
          </div>
        </div>
      </footer>

    </main>
  )
}
