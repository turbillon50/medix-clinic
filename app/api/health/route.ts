import { NextResponse } from "next/server"
import sql from "../../../lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const [row] = await sql`SELECT now() as ts, count(*)::int as users FROM medix_users`
    return NextResponse.json({ status: "ok", db: "connected", users: row.users, ts: row.ts })
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e.message }, { status: 500 })
  }
}
