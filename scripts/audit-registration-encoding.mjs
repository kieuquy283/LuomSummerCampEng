import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const rootDir = process.cwd();
const envPath = resolve(rootDir, '.env.local');

const parseEnv = async (filePath) => {
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

const badTokens = ['Ã', 'â€', 'áº', 'Æ', 'Ä', 'Å', 'Ê', 'Ë', 'Ì', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', '�', '?'];

const isLikelyDamaged = (value) => {
  if (!value || typeof value !== 'string') return false;
  if (/[a-zA-Z]\?[a-zA-Z]/.test(value)) return true;
  return badTokens.some((token) => value.includes(token));
};

const walk = (value, path, out) => {
  if (value == null) return;
  if (typeof value === 'string') {
    if (isLikelyDamaged(value)) out.push({ path, value });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, out));
    return;
  }
  if (typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      walk(nested, `${path}.${key}`, out);
    }
  }
};

const main = async () => {
  const env = await parseEnv(envPath);
  const supabaseUrl = env.VITE_SUPABASE_URL?.trim();
  const publishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
  const tableName = env.VITE_SUPABASE_TABLE?.trim() || 'volunteer_registrations';

  if (!supabaseUrl || !publishableKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env.local');
  }

  const url = `${supabaseUrl}/rest/v1/${tableName}?select=*&order=id.asc`;
  const response = await fetch(url, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Audit query failed: ${response.status} ${errorText}`);
  }

  const rows = await response.json();
  const affected = [];

  for (const row of rows) {
    const hits = [];
    walk(row, 'row', hits);
    if (hits.length > 0) {
      affected.push({
        id: row.id,
        hitCount: hits.length,
        sample: hits.slice(0, 12),
      });
    }
  }

  console.log(
    JSON.stringify(
      {
        scanned: rows.length,
        affectedCount: affected.length,
        affected,
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

