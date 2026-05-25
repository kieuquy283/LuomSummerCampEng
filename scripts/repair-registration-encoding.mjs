import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const rootDir = process.cwd();
const envPath = resolve(rootDir, '.env.local');
const isApplyMode = process.argv.includes('--apply');

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

const exactFixMap = {
  'Tr?i h? Xanh': 'Trại hè Xanh',
  'Tr?i h? C?ng ngh?': 'Trại hè Công nghệ',
  'L?p B?nh d?n h?c v? s?': 'Lớp Bình dân học vụ số',
  'Chuy?n m?n Tin h?c v? K? thu?t': 'Chuyên môn Tin học và Kỹ thuật',
  'Truy?n th?ng': 'Truyền thông',
  '??ng k? T?nh nguy?n vi?n L??m - Chi?n d?ch m?a h? 2026':
    'Đăng ký Tình nguyện viên Lượm - Chiến dịch mùa hè 2026',
};

const maybeFixMojibake = (text) => {
  if (typeof text !== 'string') return text;
  if (exactFixMap[text]) return exactFixMap[text];
  if (!/Ã|â€|áº|Æ|Ä|Å/.test(text)) return text;
  try {
    const bytes = Uint8Array.from([...text].map((char) => char.charCodeAt(0) & 0xff));
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return text;
  }
};

const walkAndFix = (value, path = 'row') => {
  if (value == null) return { value, changes: [] };
  if (typeof value === 'string') {
    const fixed = maybeFixMojibake(value);
    if (fixed !== value) {
      return { value: fixed, changes: [{ path, before: value, after: fixed }] };
    }
    return { value, changes: [] };
  }

  if (Array.isArray(value)) {
    const arr = [];
    const changes = [];
    value.forEach((item, index) => {
      const fixed = walkAndFix(item, `${path}[${index}]`);
      arr.push(fixed.value);
      changes.push(...fixed.changes);
    });
    return { value: arr, changes };
  }

  if (typeof value === 'object') {
    const obj = {};
    const changes = [];
    for (const [key, nested] of Object.entries(value)) {
      const fixed = walkAndFix(nested, `${path}.${key}`);
      obj[key] = fixed.value;
      changes.push(...fixed.changes);
    }
    return { value: obj, changes };
  }

  return { value, changes: [] };
};

const patchRow = async ({ supabaseUrl, publishableKey, tableName, id, changes, sourceRow }) => {
  const url = `${supabaseUrl}/rest/v1/${tableName}?id=eq.${id}`;
  const mutablePayload = {};
  const topLevelColumns = new Set([
    'source',
    'submitted_at',
    'full_name',
    'email',
    'phone',
    'facebook_or_zalo',
    'selected_activities',
    'selected_departments',
    'payload',
  ]);

  for (const change of changes) {
    const path = change.path.replace(/^row\./, '');
    const firstKey = path.split(/[.\[]/, 1)[0];
    if (!topLevelColumns.has(firstKey)) continue;
    mutablePayload[firstKey] = sourceRow[firstKey];
  }

  if (Object.keys(mutablePayload).length === 0) return;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(mutablePayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
      throw new Error(`Patch failed for id=${id}: ${response.status} ${errorText}`);
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
    throw new Error(`Repair query failed: ${response.status} ${errorText}`);
  }

  const rows = await response.json();
  const candidates = [];

  for (const row of rows) {
    const { value: fixedRow, changes } = walkAndFix(row);
    if (changes.length > 0) {
      candidates.push({
        id: row.id,
        changes,
        fixedRow,
      });
    }
  }

  if (!isApplyMode) {
    console.log(
      JSON.stringify(
        {
          mode: 'dry-run',
          candidateCount: candidates.length,
          candidates: candidates.map((candidate) => ({
            id: candidate.id,
            changeCount: candidate.changes.length,
            sample: candidate.changes.slice(0, 12),
          })),
        },
        null,
        2,
      ),
    );
    return;
  }

  for (const candidate of candidates) {
    await patchRow({
      supabaseUrl,
      publishableKey,
      tableName,
      id: candidate.id,
      changes: candidate.changes,
      sourceRow: candidate.fixedRow,
    });
  }

  console.log(
    JSON.stringify(
      {
        mode: 'apply',
        patchedCount: candidates.length,
        patchedIds: candidates.map((candidate) => candidate.id),
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
