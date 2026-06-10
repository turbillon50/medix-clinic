import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Entry point for the sales demo: sets the demo cookie and drops the visitor
// straight into the app — no login, no magic link.
export async function GET(req: NextRequest) {
  const to = req.nextUrl.searchParams.get("to") || "/app"
  const res = NextResponse.redirect(new URL(to, req.url))
  res.cookies.set("medix_demo", "1", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  })
  return res
}
