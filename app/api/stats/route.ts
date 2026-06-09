import { NextResponse } from "next/server"
import { auth } from "../../../auth"
import sql from "../../../lib/db"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const [users] = await sql`SELECT count(*)::int as total FROM medix_users WHERE role='patient'`
  const [docs] = await sql`SELECT count(*)::int as total FROM medix_doctors WHERE active=true`
  const [appts] = await sql`SELECT count(*)::int as total FROM medix_appointments WHERE scheduled_at::date = CURRENT_DATE`
  return NextResponse.json({
    patients: users.total,
    doctors: docs.total,
    appointments_today: appts.total,
  })
}
