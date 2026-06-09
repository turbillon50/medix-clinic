import { NextResponse } from "next/server"
import { auth } from "../../../auth"
import sql from "../../../lib/db"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const rows = await sql`
    SELECT p.*, u.name, u.email, u.phone, u.blood_type, u.birth_date
    FROM medix_patients p
    JOIN medix_users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `
  return NextResponse.json(rows)
}
