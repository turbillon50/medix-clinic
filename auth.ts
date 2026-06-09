import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { neon } from "@neondatabase/serverless"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "MEDIX <no-reply@vmomentums.info>",
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        const sql = neon(process.env.DATABASE_URL!)
        const rows = await sql`
          SELECT role FROM medix_users WHERE email = ${session.user.email}
        `
        if (rows[0]) session.user.role = rows[0].role
      }
      return session
    },
  },
  pages: { signIn: "/login" },
})
