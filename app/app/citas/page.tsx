import { auth } from "../../../auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import sql from "../../../lib/db"
import CitasClient from "./citas-client"
import { demoUser, demoAppointments, demoDoctors } from "../../../lib/demo"

export default async function CitasPage() {
  const session = await auth()
  const isDemo = (await cookies()).get("medix_demo")?.value === "1"

  if (!session && !isDemo) redirect("/login")

  if (!session && isDemo) {
    return <CitasClient appointments={demoAppointments} doctors={demoDoctors} user={demoUser} />
  }

  const appointments = await sql`
    SELECT a.*, du.name as doctor_name, d.specialty
    FROM medix_appointments a
    JOIN medix_doctors d ON a.doctor_id = d.id
    JOIN medix_users du ON d.user_id = du.id
    JOIN medix_patients p ON a.patient_id = p.id
    JOIN medix_users pu ON p.user_id = pu.id
    WHERE pu.email = ${session!.user?.email}
    ORDER BY a.scheduled_at DESC
  `.catch(() => [])

  const doctors = await sql`
    SELECT d.id, u.name, d.specialty FROM medix_doctors d
    JOIN medix_users u ON d.user_id = u.id WHERE d.active = true
  `.catch(() => [])

  return <CitasClient
    appointments={(appointments as any[]).length ? appointments : demoAppointments}
    doctors={(doctors as any[]).length ? doctors : demoDoctors}
    user={session!.user} />
}
