import { NextResponse } from "next/server"
import { auth } from "../../../auth"
import sql from "../../../lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const rows = await sql`
    SELECT a.*, du.name as doctor_name, d.specialty
    FROM medix_appointments a
    JOIN medix_doctors d ON a.doctor_id = d.id
    JOIN medix_users du ON d.user_id = du.id
    JOIN medix_patients p ON a.patient_id = p.id
    JOIN medix_users pu ON p.user_id = pu.id
    WHERE pu.email = ${session.user?.email}
    ORDER BY a.scheduled_at DESC LIMIT 50
  `.catch(() => [])
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  // Get patient_id from session email
  const patients = await sql`
    SELECT p.id FROM medix_patients p
    JOIN medix_users u ON p.user_id = u.id
    WHERE u.email = ${session.user?.email}
  `.catch(() => [])
  if (!patients[0]) return NextResponse.json({ error: "Patient not found" }, { status: 404 })
  const row = await sql`
    INSERT INTO medix_appointments (patient_id, doctor_id, scheduled_at, type, status, amount)
    VALUES (${patients[0].id}, ${body.doctor_id}, ${body.scheduled_at}, ${body.type}, 'pending', ${body.amount || 450})
    RETURNING *
  `.catch(e => { throw e })
  return NextResponse.json(row[0])
}
