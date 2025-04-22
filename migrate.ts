import { Pool } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './shared/schema';
import { hashPassword } from './server/auth';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // Create a Postgres client for migrations
  const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient, { schema });

  console.log('🔄 Running migrations...');
  await migrate(db, { migrationsFolder: 'migrations' });
  console.log('✅ Migrations completed');

  // Create admin user if it doesn't exist
  const adminUserResult = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.role, 'admin')
  });

  if (!adminUserResult) {
    console.log('👤 Creating default admin user...');
    await db.insert(schema.users).values({
      username: 'admin',
      password: await hashPassword('123456'),
      name: 'Administrador',
      email: 'admin@example.com',
      role: 'admin'
    });
    console.log('✅ Admin user created');
  } else {
    console.log('👤 Admin user already exists');
  }

  await migrationClient.end();
  console.log('🎉 Database setup complete');
}

main().catch((error) => {
  console.error('❌ Migration error:', error);
  process.exit(1);
});