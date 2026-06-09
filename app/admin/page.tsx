import { auth } from "../../auth"
import { redirect } from "next/navigation"
import sql from "../../lib/db"
import AdminDashboardClient from "./admin-client"

export default async function AdminPage() {
  const session = await auth()
  if (!session || ((session.user as any)?.role !== "admin")) redirect("/login")

  const [patientCount] = await sql`SELECT count(*)::int as total FROM medix_users WHERE role='patient'`.catch(()=>[{total:0}])
  const [doctorCount] = await sql`SELECT count(*)::int as total FROM medix_doctors WHERE active=true`.catch(()=>[{total:0}])
  const patients = await sql`SELECT u.name,u.email,u.blood_type,u.created_at,p.folio,p.conditions FROM medix_users u LEFT JOIN medix_patients p ON p.user_id=u.id WHERE u.role='patient' ORDER BY u.created_at DESC LIMIT 20`.catch(()=>[])

  return <AdminDashboardClient stats={{patients:patientCount.total,doctors:doctorCount.total}} patients={patients} user={session.user} />
}
