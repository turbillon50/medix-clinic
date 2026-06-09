import { NextResponse } from "next/server"
import { auth } from "../../../auth"
import sql from "../../../lib/db"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const rows = await sql`
    SELECT a.*, 
      p.folio as patient_folio,
      pu.name as patient_name,
      du.name as doctor_name,
      d.specialty
    FROM medix_appointments a
    JOIN medix_patients p ON a.patient_id = p.id
    JOIN medix_users pu ON p.user_id = pu.id
    JOIN medix_doctors d ON a.doctor_id = d.id
    JOIN medix_users du ON d.user_id = du.id
    ORDER BY a.scheduled_at DESC LIMIT 50
  `
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const rows = await sql`
    INSERT INTO medix_appointments (patient_id, doctor_id, scheduled_at, type, status, amount)
    VALUES (${body.patient_id}, ${body.doctor_id}, ${body.scheduled_at}, ${body.type}, 'pending', ${body.amount || 450})
    RETURNING *
  `
  return NextResponse.json(rows[0])
}
