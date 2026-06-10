import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req: any) => {
  const { pathname } = req.nextUrl
  const isAuth = !!req.auth
  const role = (req.auth?.user as any)?.role
  const isDemo = req.cookies.get("medix_demo")?.value === "1"

  // Demo visitors (cookie set by /demo) can roam the whole app, no login.
  if (isDemo) return NextResponse.next()

  if (pathname.startsWith("/app") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/app/:path*", "/admin/:path*"],
}
