import { sql } from '@vercel/postgres'

export async function GET() {
  const users = await sql`select * from captain;`

  return new Response(JSON.stringify(users))
}
