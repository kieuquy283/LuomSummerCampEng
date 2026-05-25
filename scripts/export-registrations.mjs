import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const rootDir = process.cwd();
const envPath = resolve(rootDir, '.env.local');

const parseEnv = async (filePath) => {
  const { readFile } = await import('node:fs/promises');
  const content = await readFile(filePath, 'utf8');
  const entries = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const separatorIndex = line.indexOf('=');
      if (separatorIndex === -1) return null;
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      return [key, value];
    })
    .filter(Boolean);

  return Object.fromEntries(entries);
};

const csvEscape = (value) => {
  const text =
    value == null
      ? ''
      : Array.isArray(value)
        ? value.join(' | ')
        : typeof value === 'object'
          ? JSON.stringify(value)
          : String(value);
  const escaped = text.replace(/"/g, '""');
  return `"${escaped}"`;
};

const toCsv = (rows) => {
  const headers = [
    'id',
    'created_at',
    'submitted_at',
    'source',
    'full_name',
    'email',
    'phone',
    'facebook_or_zalo',
    'selected_activities',
    'selected_departments',
    'payload',
  ];

  const lines = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => {
          if (header === 'selected_activities') return csvEscape(row.selected_activities);
          if (header === 'selected_departments') return csvEscape(row.selected_departments);
          return csvEscape(row[header]);
        })
        .join(','),
    ),
  ];

  return lines.join('\n');
};

const main = async () => {
  const env = await parseEnv(envPath);
  const supabaseUrl = env.VITE_SUPABASE_URL?.trim();
  const publishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
  const tableName = env.VITE_SUPABASE_TABLE?.trim() || 'volunteer_registrations';

  if (!supabaseUrl || !publishableKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env.local');
  }

  const url = `${supabaseUrl}/rest/v1/${tableName}?select=*&order=submitted_at.desc`;
  const response = await fetch(url, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase export failed: ${response.status} ${errorText}`);
  }

  const rows = await response.json();
  const timestamp = new Date().toISOString().slice(0, 10);
  const exportDir = resolve(rootDir, 'exports');
  const jsonPath = resolve(exportDir, `volunteer_registrations_${timestamp}.json`);
  const csvPath = resolve(exportDir, `volunteer_registrations_${timestamp}.csv`);

  await mkdir(exportDir, { recursive: true });
  await writeFile(jsonPath, `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
  await writeFile(csvPath, `${toCsv(rows)}\n`, 'utf8');

  console.log(
    JSON.stringify(
      {
        count: rows.length,
        jsonPath,
        csvPath,
      },
      null,
      2,
    ),
  );
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
