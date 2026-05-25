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

const safeJoin = (arr) => Array.isArray(arr) ? arr.join(' | ') : '';
const safeStr = (val) => (val == null ? '' : String(val));

const flattenPayload = (payload) => {
  const pi = payload?.personalInfo || {};
  const cm = payload?.commitments || {};
  const ga = payload?.generalAnswers || {};
  const ta = payload?.techAnswers || {};
  const ma = payload?.mediaAnswers || {};
  const sa = payload?.supportAnswers || {};

  return {
    date_of_birth: safeStr(pi.dateOfBirth),
    school_class_major: safeStr(pi.schoolClassMajor),
    emergency_contact: safeStr(pi.emergencyContact),
    current_address: safeStr(pi.currentAddress),
    certificates: safeStr(pi.certificates),
    readiness: safeStr(cm.readiness),
    commitment_80_percent: safeStr(cm.commitment80Percent),
    knowledge_about_luom: safeStr(ga.knowledgeAboutLuom),
    motivation: safeStr(ga.motivation),
    talents: safeStr(ga.talents),
    strengths: safeJoin(ga.strengths),
    strengths_other: safeStr(ga.strengthsOther),
    past_volunteer_experience: safeStr(ga.pastVolunteerExperience),
    primary_department: safeStr(payload?.primaryDepartment),
    additional_departments: safeJoin(payload?.additionalDepartments),
    activities: safeJoin(payload?.activities),
    tech_focus_areas: safeJoin(ta.techFocusAreas),
    tech_focus_other: safeStr(ta.techFocusOther),
    cyber_info_sources_and_risks: safeStr(ta.cyberInfoSourcesAndRisks),
    ai_tools_and_computer_skills: safeStr(ta.aiToolsAndComputerSkills),
    digital_tools_for_lesson_design: safeStr(ta.digitalToolsForLessonDesign),
    cyber_safety_game_idea: safeStr(ta.cyberSafetyGameIdea),
    offline_class_handling: safeStr(ta.offlineClassHandling),
    motor_circuit_experience: safeStr(ta.motorCircuitExperience),
    electricity_knowledge_rating: safeStr(ta.electricityKnowledgeRating),
    handmade_technical_situation: safeStr(ta.handmadeTechnicalSituation),
    media_positions: safeJoin(ma.mediaPositions),
    media_position_other: safeStr(ma.mediaPositionOther),
    media_portfolio_link: safeStr(ma.mediaPortfolioLink),
    has_camera: safeStr(ma.hasCamera),
    support_tasks: safeJoin(sa.supportTasks),
    support_availability: safeStr(sa.supportAvailability),
    support_experience: safeStr(sa.supportExperience),
    final_note: safeStr(payload?.finalNote),
    data_consent: safeStr(payload?.dataConsent),
    form_name: safeStr(payload?.formName),
  };
};

const toCsv = (rows) => {
  const baseHeaders = [
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
  ];

  const payloadHeaders = [
    'date_of_birth',
    'school_class_major',
    'emergency_contact',
    'current_address',
    'certificates',
    'readiness',
    'commitment_80_percent',
    'knowledge_about_luom',
    'motivation',
    'talents',
    'strengths',
    'strengths_other',
    'past_volunteer_experience',
    'primary_department',
    'additional_departments',
    'activities',
    'tech_focus_areas',
    'tech_focus_other',
    'cyber_info_sources_and_risks',
    'ai_tools_and_computer_skills',
    'digital_tools_for_lesson_design',
    'cyber_safety_game_idea',
    'offline_class_handling',
    'motor_circuit_experience',
    'electricity_knowledge_rating',
    'handmade_technical_situation',
    'media_positions',
    'media_position_other',
    'media_portfolio_link',
    'has_camera',
    'support_tasks',
    'support_availability',
    'support_experience',
    'final_note',
    'data_consent',
    'form_name',
  ];

  const headers = [...baseHeaders, ...payloadHeaders];

  const lines = [
    headers.join(','),
    ...rows.map((row) => {
      const flat = flattenPayload(row.payload);
      return headers
        .map((header) => {
          if (header === 'selected_activities') return csvEscape(row.selected_activities);
          if (header === 'selected_departments') return csvEscape(row.selected_departments);
          if (baseHeaders.includes(header)) return csvEscape(row[header]);
          return csvEscape(flat[header]);
        })
        .join(',');
    }),
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
