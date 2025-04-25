import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './shared/schema';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  // Create database connection
  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(sql, { schema });

  // Create the ebooks table
  await sql`
    CREATE TABLE IF NOT EXISTS ebooks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      cover_image TEXT NOT NULL,
      price TEXT NOT NULL,
      sale_price TEXT,
      buy_link TEXT NOT NULL,
      features JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;

  console.log('Ebooks table created successfully');
  process.exit(0);
}

main().catch(err => {
  console.error('Error during migration:', err);
  process.exit(1);
});