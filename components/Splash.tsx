"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function Splash() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{opacity:1}} exit={{opacity:0,transition:{duration:0.5}}}
          style={{position:"fixed",inset:0,zIndex:99999,background:"#080f1e",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20}}>
          <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:300,damping:20}}
            style={{fontFamily:"Space Grotesk, sans-serif",fontSize:56,fontWeight:700,letterSpacing:-3,background:"linear-gradient(135deg,#00d4aa,#3b8beb)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            MEDIX
          </motion.div>
          <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            style={{fontSize:14,color:"#4d6b8a",fontWeight:500,letterSpacing:"0.05em"}}>
            Tu clínica en tu mano
          </motion.p>
          <motion.div initial={{width:0}} animate={{width:200}} transition={{delay:0.4,duration:1.2,ease:"easeInOut"}}
            style={{height:3,background:"linear-gradient(90deg,#00d4aa,#3b8beb)",borderRadius:99,overflow:"hidden"}}>
            <motion.div animate={{x:["-100%","100%"]}} transition={{repeat:Infinity,duration:0.8,ease:"linear"}}
              style={{width:"50%",height:"100%",background:"rgba(255,255,255,0.4)"}}/>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
