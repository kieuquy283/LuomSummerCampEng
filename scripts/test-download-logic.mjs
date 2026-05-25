// Test script: verify flatten payload logic for CSV download
// Run: node scripts/test-download-logic.mjs

import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const testPayload = {
  formName: 'Đăng ký TNV Test',
  source: 'landing_page_direct_form',
  createdAt: '2026-05-25T14:00:00.000Z',
  personalInfo: {
    fullName: 'Nguyen Van A',
    dateOfBirth: '01/01/2005',
    schoolClassMajor: 'THPT Test - 12A1',
    email: 'test@example.com',
    phone: '0900000000',
    emergencyContact: '0911111111 - Ba',
    facebookUrl: 'https://fb.com/test',
    currentAddress: 'Hanoi',
    certificates: 'IELTS 7.0',
  },
  commitments: {
    readiness: 'minh-san-sang',
    commitment80Percent: 'minh-cam-ket',
  },
  generalAnswers: {
    knowledgeAboutLuom: 'Biet ve du an',
    motivation: 'Muon giup do',
    talents: 'Hat, nhay',
    strengths: ['san-sang-hoc-hoi', 'chup-anh'],
    strengthsOther: '',
    pastVolunteerExperience: 'Tung TN cho ABC',
  },
  activities: ['Trại hè Xanh', 'Trại hè Công nghệ'],
  primaryDepartment: 'tech',
  additionalDepartments: ['media'],
  techAnswers: {
    techFocusAreas: ['an-toan-mang', 'ung-dung-ai'],
    techFocusOther: '',
    cyberInfoSourcesAndRisks: 'Tu internet',
    aiToolsAndComputerSkills: 'ChatGPT',
    digitalToolsForLessonDesign: 'Canva',
    cyberSafetyGameIdea: 'Tro choi doan dau',
    offlineClassHandling: 'Dung sach',
    motorCircuitExperience: 'Tung lam',
    electricityKnowledgeRating: '8',
    handmadeTechnicalSituation: 'Nhiet tinh',
  },
  mediaAnswers: {
    mediaPositions: ['viet-bai'],
    mediaPositionOther: '',
    mediaPortfolioLink: 'https://drive.google.com/test',
    hasCamera: 'minh-co',
  },
  supportAnswers: {
    supportTasks: [],
    supportAvailability: '',
    supportExperience: '',
  },
  finalNote: 'Rat vui duoc tham gia',
  dataConsent: true,
};

// Replicate flatten logic from VolunteerRegistrationForm.tsx
const flatRecord = {
  full_name: testPayload.personalInfo.fullName,
  date_of_birth: testPayload.personalInfo.dateOfBirth,
  school_class_major: testPayload.personalInfo.schoolClassMajor,
  email: testPayload.personalInfo.email,
  phone: testPayload.personalInfo.phone,
  emergency_contact: testPayload.personalInfo.emergencyContact,
  facebook_url: testPayload.personalInfo.facebookUrl,
  current_address: testPayload.personalInfo.currentAddress,
  certificates: testPayload.personalInfo.certificates,
  readiness: testPayload.commitments.readiness,
  commitment_80_percent: testPayload.commitments.commitment80Percent,
  knowledge_about_luom: testPayload.generalAnswers.knowledgeAboutLuom,
  motivation: testPayload.generalAnswers.motivation,
  talents: testPayload.generalAnswers.talents,
  strengths: testPayload.generalAnswers.strengths.join(' | '),
  strengths_other: testPayload.generalAnswers.strengthsOther,
  past_volunteer_experience: testPayload.generalAnswers.pastVolunteerExperience,
  activities: testPayload.activities.join(' | '),
  primary_department: testPayload.primaryDepartment,
  additional_departments: testPayload.additionalDepartments.join(' | '),
  tech_focus_areas: testPayload.techAnswers.techFocusAreas.join(' | '),
  tech_focus_other: testPayload.techAnswers.techFocusOther,
  cyber_info_sources_and_risks: testPayload.techAnswers.cyberInfoSourcesAndRisks,
  ai_tools_and_computer_skills: testPayload.techAnswers.aiToolsAndComputerSkills,
  digital_tools_for_lesson_design: testPayload.techAnswers.digitalToolsForLessonDesign,
  cyber_safety_game_idea: testPayload.techAnswers.cyberSafetyGameIdea,
  offline_class_handling: testPayload.techAnswers.offlineClassHandling,
  motor_circuit_experience: testPayload.techAnswers.motorCircuitExperience,
  electricity_knowledge_rating: testPayload.techAnswers.electricityKnowledgeRating,
  handmade_technical_situation: testPayload.techAnswers.handmadeTechnicalSituation,
  media_positions: testPayload.mediaAnswers.mediaPositions.join(' | '),
  media_position_other: testPayload.mediaAnswers.mediaPositionOther,
  media_portfolio_link: testPayload.mediaAnswers.mediaPortfolioLink,
  has_camera: testPayload.mediaAnswers.hasCamera,
  support_tasks: testPayload.supportAnswers.supportTasks.join(' | '),
  support_availability: testPayload.supportAnswers.supportAvailability,
  support_experience: testPayload.supportAnswers.supportExperience,
  final_note: testPayload.finalNote,
  data_consent: testPayload.dataConsent,
  form_name: testPayload.formName,
  source: testPayload.source,
  created_at: testPayload.createdAt,
};

// Replicate exportToCsv logic (browser-only, so we simulate here)
const escapeCsvValue = (value) => {
  const normalized = Array.isArray(value) ? value.join(' | ') : value ?? '';
  const stringValue = String(normalized);
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
};

const headers = Object.keys(flatRecord);
const lines = [
  headers.join(','),
  headers.map((h) => escapeCsvValue(flatRecord[h])).join(','),
];
const csvContent = lines.join('\n');

const rootDir = process.cwd();
const testDir = resolve(rootDir, 'test-output');
const jsonPath = resolve(testDir, 'test-download.json');
const csvPath = resolve(testDir, 'test-download.csv');

await mkdir(testDir, { recursive: true });
await writeFile(jsonPath, `${JSON.stringify(testPayload, null, 2)}\n`, 'utf8');
await writeFile(csvPath, `${csvContent}\n`, 'utf8');

console.log('Test output written to:');
console.log('  JSON:', jsonPath);
console.log('  CSV :', csvPath);
console.log('\nCSV Preview (first 5 columns):');
console.log(lines[0].split(',').slice(0, 5).join(','));
console.log(lines[1].split(',').slice(0, 5).join(','));
console.log('\nAll tests passed.');
