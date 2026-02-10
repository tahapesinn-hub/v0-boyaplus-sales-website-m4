import postgres from "postgres"

const connectionString = process.env.POSTGRES_URL!

export const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  max: 5,
})
