import { auth } from "../../../auth"
import { redirect } from "next/navigation"
import sql from "../../../lib/db"
import ExpedienteClient from "./expediente-client"

export default async function ExpedientePage() {
  const session = await auth()
  if (!session) redirect("/login")

  const records = await sql`
    SELECT r.*, du.name as doctor_name, d.specialty
    FROM medix_records r
    JOIN medix_doctors d ON r.doctor_id = d.id
    JOIN medix_users du ON d.user_id = du.id
    JOIN medix_patients p ON r.patient_id = p.id
    JOIN medix_users pu ON p.user_id = pu.id
    WHERE pu.email = ${session.user?.email}
    ORDER BY r.created_at DESC
  `.catch(() => [])

  const patient = await sql`
    SELECT p.*, u.name, u.blood_type, u.birth_date, u.phone
    FROM medix_patients p
    JOIN medix_users u ON p.user_id = u.id
    WHERE u.email = ${session.user?.email}
  `.catch(() => []).then(r => r[0] || null)

  return <ExpedienteClient records={records} patient={patient} user={session.user} />
}
