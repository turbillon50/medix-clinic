import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { Pool } from "pg"
import PostgresAdapter from "@auth/pg-adapter"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "MEDIX <no-reply@vmomentums.info>",
    }),
  ],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      // Fetch role from medix_users
      try {
        const res = await pool.query(
          "SELECT role FROM medix_users WHERE email = $1",
          [user?.email ?? session.user?.email]
        )
        if (res.rows[0]) {
          (session.user as any).role = res.rows[0].role
        }
      } catch {}
      return session
    },
  },
  pages: { signIn: "/login" },
})
