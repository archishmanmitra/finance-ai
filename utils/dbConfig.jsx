import { neon } from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://financedb_owner:d7xTmqpEfe1c@ep-lucky-hat-a1s4l1hc.ap-southeast-1.aws.neon.tech/financedb?sslmode=require')

export const db = drizzle(sql, { schema });