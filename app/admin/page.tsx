import { auth } from "../../auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import sql from "../../lib/db"
import AdminDashboardClient from "./admin-client"
import { demoAdminUser, demoAdminStats, demoAdminPatients } from "../../lib/demo"

export default async function AdminPage() {
  const session = await auth()
  const isDemo = (await cookies()).get("medix_demo")?.value === "1"
  const isAdmin = (session?.user as any)?.role === "admin"

  if (!session && !isDemo) redirect("/login")

  if (!isAdmin && isDemo) {
    return <AdminDashboardClient stats={demoAdminStats} patients={demoAdminPatients} user={demoAdminUser} />
  }
  if (!isAdmin) redirect("/login")

  const [patientCount] = await sql`SELECT count(*)::int as total FROM medix_users WHERE role='patient'`.catch(()=>[{total:0}]) as any[]
  const [doctorCount] = await sql`SELECT count(*)::int as total FROM medix_doctors WHERE active=true`.catch(()=>[{total:0}]) as any[]
  const patients = await sql`SELECT u.name,u.email,u.blood_type,u.created_at,p.folio,p.conditions FROM medix_users u LEFT JOIN medix_patients p ON p.user_id=u.id WHERE u.role='patient' ORDER BY u.created_at DESC LIMIT 20`.catch(()=>[])

  return <AdminDashboardClient
    stats={{patients:patientCount?.total||demoAdminStats.patients, doctors:doctorCount?.total||demoAdminStats.doctors}}
    patients={(patients as any[]).length ? patients : demoAdminPatients}
    user={session!.user} />
}
