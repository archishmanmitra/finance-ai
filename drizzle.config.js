/** @type { import("drizzle-kit").Config } */
export default {
    dialect: 'postgresql',
    schema: './utils/schema.jsx',
    out: './drizzle',
    dbCredentials: {
        url: 'postgresql://financedb_owner:d7xTmqpEfe1c@ep-lucky-hat-a1s4l1hc.ap-southeast-1.aws.neon.tech/financedb?sslmode=require',
        connectionString: process.env.DATABASE_URL
    }
}