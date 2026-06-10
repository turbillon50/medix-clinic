// Demo dataset — used when the visitor enters via "Explorar demo" (cookie medix_demo=1).
// Lets the whole app navigate end-to-end with zero login and zero DB dependency.

export const demoUser = { name: "María Fernanda López", email: "demo@medix.health", role: "patient" }
export const demoAdminUser = { name: "Dr. Admin MEDIX", email: "admin@medix.health", role: "admin" }

const now = new Date()
const d = (days: number, h = 9, m = 0) => {
  const x = new Date(now); x.setDate(x.getDate() + days); x.setHours(h, m, 0, 0); return x.toISOString()
}

export const demoAppointments = [
  { id: "a1", type: "Consulta de cardiología", status: "confirmed", scheduled_at: d(2, 10, 0), doctor_name: "Dr. Carlos García", specialty: "Cardiología" },
  { id: "a2", type: "Control de hipertensión", status: "pending", scheduled_at: d(9, 12, 0), doctor_name: "Dra. Ana Martínez", specialty: "Medicina interna" },
  { id: "a3", type: "Revisión de laboratorio", status: "confirmed", scheduled_at: d(16, 9, 0), doctor_name: "Dr. Luis Ramírez", specialty: "Pediatría" },
  { id: "a4", type: "Consulta general", status: "confirmed", scheduled_at: d(-12, 11, 0), doctor_name: "Dr. Carlos García", specialty: "Cardiología" },
  { id: "a5", type: "Primera consulta", status: "confirmed", scheduled_at: d(-40, 16, 0), doctor_name: "Dra. Ana Martínez", specialty: "Medicina interna" },
]

export const demoDoctors = [
  { id: "d1", name: "Dr. Carlos García", specialty: "Cardiología" },
  { id: "d2", name: "Dra. Ana Martínez", specialty: "Medicina interna" },
  { id: "d3", name: "Dr. Luis Ramírez", specialty: "Pediatría" },
  { id: "d4", name: "Dra. Sofía Hernández", specialty: "Ginecología" },
]

export const demoPatient = {
  name: "María Fernanda López", blood_type: "O+", birth_date: "1991-04-18",
  phone: "+52 33 1234 5678", folio: "MX-00842", conditions: "Hipertensión controlada",
  allergies: "Penicilina",
}

export const demoRecords = [
  { id: "r1", created_at: d(-12), title: "Consulta de cardiología", description: "Paciente estable. Presión arterial 120/80. Se ajusta dosis de antihipertensivo.", diagnosis: "Hipertensión esencial controlada", doctor_name: "Dr. Carlos García", specialty: "Cardiología" },
  { id: "r2", created_at: d(-40), title: "Primera consulta y evaluación", description: "Historia clínica completa. Solicitud de perfil lipídico y biometría hemática.", diagnosis: "En estudio", doctor_name: "Dra. Ana Martínez", specialty: "Medicina interna" },
  { id: "r3", created_at: d(-95), title: "Estudio de laboratorio", description: "Colesterol total 195 mg/dL. Glucosa en ayuno 92 mg/dL. Resultados dentro de rango.", diagnosis: "Sin hallazgos patológicos", doctor_name: "Dr. Luis Ramírez", specialty: "Laboratorio" },
]

export const demoAdminPatients = [
  { name: "María Fernanda López", email: "maria.lopez@correo.com", blood_type: "O+", conditions: "Hipertensión", created_at: d(-120) },
  { name: "Jorge Alberto Ruiz", email: "jorge.ruiz@correo.com", blood_type: "A+", conditions: "Diabetes tipo 2", created_at: d(-98) },
  { name: "Valeria Gómez", email: "valeria.gomez@correo.com", blood_type: "B-", conditions: "Sin condición", created_at: d(-75) },
  { name: "Andrés Castillo", email: "andres.castillo@correo.com", blood_type: "AB+", conditions: "Asma", created_at: d(-54) },
  { name: "Daniela Torres", email: "daniela.torres@correo.com", blood_type: "O-", conditions: "Sin condición", created_at: d(-33) },
  { name: "Roberto Mendoza", email: "roberto.mendoza@correo.com", blood_type: "A-", conditions: "Hipotiroidismo", created_at: d(-15) },
]

export const demoAdminStats = { patients: 1840, doctors: 12 }
