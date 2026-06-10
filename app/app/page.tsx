import { auth } from "../../auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import sql from "../../lib/db"
import PatientDashboard from "./dashboard-client"
import { demoUser, demoAppointments } from "../../lib/demo"

export default async function AppPage() {
  const session = await auth()
  const isDemo = (await cookies()).get("medix_demo")?.value === "1"

  if (!session && !isDemo) redirect("/login")

  if (!session && isDemo) {
    return <PatientDashboard user={demoUser} appointments={demoAppointments} />
  }

  const appointments = await sql`
    SELECT a.*, du.name as doctor_name, d.specialty
    FROM medix_appointments a
    JOIN medix_doctors d ON a.doctor_id = d.id
    JOIN medix_users du ON d.user_id = du.id
    JOIN medix_patients p ON a.patient_id = p.id
    JOIN medix_users pu ON p.user_id = pu.id
    WHERE pu.email = ${session!.user?.email}
    ORDER BY a.scheduled_at DESC LIMIT 10
  `.catch(() => [])

  const data = (appointments as any[]).length ? appointments : demoAppointments
  return <PatientDashboard user={session!.user} appointments={data} />
}
