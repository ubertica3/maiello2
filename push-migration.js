#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Pushing schema changes to the database...');

// Leer el esquema actual
const schemaFile = path.join(__dirname, 'shared', 'schema.ts');
const schemaContent = fs.readFileSync(schemaFile, 'utf8');

try {
  // Ejecutar el comando de migración y capturar la salida
  const output = execSync('npx drizzle-kit push').toString();
  console.log('Migration output:', output);
  console.log('✅ Schema successfully pushed to the database!');
} catch (error) {
  console.error('❌ Error pushing schema to the database:', error.message);
  process.exit(1);
}