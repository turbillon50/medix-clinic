import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuth = !!req.auth
  const role = req.auth?.user?.role

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
