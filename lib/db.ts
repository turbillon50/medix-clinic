import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

// Lazy init: never call neon() at module-load time, otherwise the production
// build ("collect page data") crashes when DATABASE_URL isn't present.
let _sql: NeonQueryFunction<false, false> | null = null
function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL || "postgresql://demo:demo@localhost:5432/demo"
    _sql = neon(url)
  }
  return _sql
}

const sql = ((strings: TemplateStringsArray, ...values: any[]) =>
  (getSql() as any)(strings, ...values)) as unknown as NeonQueryFunction<false, false>

export default sql
