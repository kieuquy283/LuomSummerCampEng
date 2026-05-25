/**
 * Google Apps Script - Lượm Volunteer Registration Sync
 */

// ============================================
// CONFIG
// ============================================
const SPREADSHEET_ID = ''; // Paste Spreadsheet ID here
const SHEET_NAME = 'Form Responses';

const LABEL_MAP = {
  readiness: { 'minh-san-sang': 'Mình sẵn sàng' },
  commitment80Percent: { 'minh-cam-ket': 'Mình cam kết' },
  primaryDepartment: {
    tech: 'Chuyên môn Tin học và Kỹ thuật',
    media: 'Truyền thông',
    support: 'Hỗ trợ',
  },
  department: {
    tech: 'Chuyên môn Tin học và Kỹ thuật',
    media: 'Truyền thông',
    support: 'Hỗ trợ',
  },
  activity: {
    'trai-he-xanh': 'Trại hè Xanh',
    'trai-he-cong-nghe': 'Trại hè Công nghệ',
    'binh-dan-hoc-vu-so': 'Lớp Bình dân học vụ số',
  },
  hasCamera: {
    'minh-co': 'Mình có',
    'dien-thoai-chat-luong': 'Không có máy ảnh cơ, nhưng có thể dùng điện thoại chất lượng tốt',
  },
  supportAvailability: {
    co: 'Có',
    'chua-chac': 'Chưa chắc',
    khong: 'Không',
  },
  strengths: {
    'ho-tro-ky-thuat': 'Hỗ trợ kỹ thuật, máy móc, máy chiếu, kết nối mạng',
    'thiet-ke-hinh-anh-slide': 'Thiết kế hình ảnh, slide',
    'chup-anh-quay-video-media': 'Chụp ảnh, quay video ngắn làm truyền thông (Media)',
    'quan-tro-hoat-nao': 'Quản trò, hoạt náo, tổ chức trò chơi giao lưu',
    'san-sang-hoc-hoi': 'Chưa có kinh nghiệm nhưng sẵn sàng học hỏi',
    khac: 'Khác',
  },
};

// ============================================
// HTTP HANDLER
// ============================================
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'Lượm Volunteer Sync API is running.' }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    let payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter && Object.keys(e.parameter).length > 0) {
      payload = e.parameter;
    } else {
      throw new Error('No payload received');
    }

    const cleanPayload = sanitizePayload(payload);
    const result = writeToSpreadsheet(cleanPayload);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', result })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.message || 'Unknown error' }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// CLEANING HELPERS
// ============================================
function tryFixMojibake(text) {
  if (typeof text !== 'string') return text;
  if (text.indexOf('?') === -1 && text.indexOf('Ã') === -1 && text.indexOf('â€') === -1) return text;

  const exactFix = {
    'Tr?i h? Xanh': 'Trại hè Xanh',
    'Tr?i h? C?ng ngh?': 'Trại hè Công nghệ',
    'L?p B?nh d?n h?c v? s?': 'Lớp Bình dân học vụ số',
    'Chuy?n m?n Tin h?c v? K? thu?t': 'Chuyên môn Tin học và Kỹ thuật',
    'Truy?n th?ng': 'Truyền thông',
    '??ng k? T?nh nguy?n vi?n L??m - Chi?n d?ch m?a h? 2026':
      'Đăng ký Tình nguyện viên Lượm - Chiến dịch mùa hè 2026',
  };
  return exactFix[text] || text;
}

function sanitizeText(value) {
  if (value == null) return '';
  return tryFixMojibake(String(value)).trim();
}

function mapLabel(group, value) {
  if (value == null) return '';
  const raw = sanitizeText(value);
  if (LABEL_MAP[group] && LABEL_MAP[group][raw]) return LABEL_MAP[group][raw];
  return raw;
}

function sanitizePayload(value) {
  if (value == null) return value;
  if (typeof value === 'string') return sanitizeText(value);
  if (Array.isArray(value)) return value.map(sanitizePayload);
  if (typeof value === 'object') {
    const out = {};
    Object.keys(value).forEach((key) => {
      out[key] = sanitizePayload(value[key]);
    });
    return out;
  }
  return value;
}

function joinMapped(values, group) {
  if (!Array.isArray(values)) return '';
  return values.map((item) => mapLabel(group, item)).filter(Boolean).join(' | ');
}

// ============================================
// SPREADSHEET WRITER
// ============================================
function writeToSpreadsheet(payload) {
  if (!SPREADSHEET_ID) throw new Error('SPREADSHEET_ID chưa được cấu hình trong Code.gs');

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = buildHeaders();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#0f172a').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  const row = flattenPayload(payload);
  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  sheet.autoResizeColumns(1, row.length);

  return { rowInserted: nextRow, timestamp: new Date().toISOString() };
}

function buildHeaders() {
  return [
    'Submitted At',
    'Full Name',
    'Date of Birth',
    'School / Class / Major',
    'Email',
    'Phone',
    'Emergency Contact',
    'Facebook/Zalo',
    'Current Address',
    'Certificates',
    'Readiness',
    'Commitment 80%',
    'Knowledge About Luom',
    'Motivation',
    'Talents',
    'Strengths',
    'Strengths Other',
    'Past Volunteer Experience',
    'Activities',
    'Primary Department',
    'Additional Departments',
    'Tech Focus Areas',
    'Tech Focus Other',
    'Cyber Info Sources & Risks',
    'AI Tools & Computer Skills',
    'Digital Tools for Lesson Design',
    'Cyber Safety Game Idea',
    'Offline Class Handling',
    'Motor Circuit Experience',
    'Electricity Knowledge Rating',
    'Handmade Technical Situation',
    'Media Positions',
    'Media Position Other',
    'Media Portfolio Link',
    'Has Camera',
    'Support Tasks',
    'Support Availability',
    'Support Experience',
    'Final Note',
    'Data Consent',
    'Form Name',
    'Source',
    'Created At',
    'Raw JSON',
  ];
}

function flattenPayload(payload) {
  const pi = payload.personalInfo || {};
  const cm = payload.commitments || {};
  const ga = payload.generalAnswers || {};
  const ta = payload.techAnswers || {};
  const ma = payload.mediaAnswers || {};
  const sa = payload.supportAnswers || {};

  const safeStr = (val) => sanitizeText(val);
  const boolText = (val) => (val === true ? 'Có' : val === false ? 'Không' : safeStr(val));

  return [
    new Date().toISOString(),
    safeStr(pi.fullName),
    safeStr(pi.dateOfBirth),
    safeStr(pi.schoolClassMajor),
    safeStr(pi.email),
    safeStr(pi.phone),
    safeStr(pi.emergencyContact),
    safeStr(pi.facebookUrl),
    safeStr(pi.currentAddress),
    safeStr(pi.certificates),
    mapLabel('readiness', cm.readiness),
    mapLabel('commitment80Percent', cm.commitment80Percent),
    safeStr(ga.knowledgeAboutLuom),
    safeStr(ga.motivation),
    safeStr(ga.talents),
    joinMapped(ga.strengths, 'strengths'),
    safeStr(ga.strengthsOther),
    safeStr(ga.pastVolunteerExperience),
    joinMapped(payload.activities, 'activity'),
    mapLabel('primaryDepartment', payload.primaryDepartment),
    joinMapped(payload.additionalDepartments, 'department'),
    joinMapped(ta.techFocusAreas, 'none'),
    safeStr(ta.techFocusOther),
    safeStr(ta.cyberInfoSourcesAndRisks),
    safeStr(ta.aiToolsAndComputerSkills),
    safeStr(ta.digitalToolsForLessonDesign),
    safeStr(ta.cyberSafetyGameIdea),
    safeStr(ta.offlineClassHandling),
    safeStr(ta.motorCircuitExperience),
    safeStr(ta.electricityKnowledgeRating),
    safeStr(ta.handmadeTechnicalSituation),
    joinMapped(ma.mediaPositions, 'none'),
    safeStr(ma.mediaPositionOther),
    safeStr(ma.mediaPortfolioLink),
    mapLabel('hasCamera', ma.hasCamera),
    joinMapped(sa.supportTasks, 'none'),
    mapLabel('supportAvailability', sa.supportAvailability),
    safeStr(sa.supportExperience),
    safeStr(payload.finalNote),
    boolText(payload.dataConsent),
    safeStr(payload.formName),
    safeStr(payload.source),
    safeStr(payload.createdAt),
    JSON.stringify(payload),
  ];
}

// ============================================
// CLEAN OLD ROWS (manual run in Apps Script)
// ============================================
function cleanExistingRows() {
  if (!SPREADSHEET_ID) throw new Error('SPREADSHEET_ID chưa được cấu hình trong Code.gs');

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(`Không tìm thấy sheet: ${SHEET_NAME}`);

  const headers = buildHeaders();
  const totalRows = sheet.getLastRow();
  const totalCols = headers.length;
  if (totalRows <= 1) return { scanned: 0, updated: 0 };

  const range = sheet.getRange(2, 1, totalRows - 1, totalCols);
  const values = range.getValues();

  let updated = 0;

  const idx = (name) => headers.indexOf(name);
  const iActivities = idx('Activities');
  const iPrimaryDepartment = idx('Primary Department');
  const iAdditionalDepartments = idx('Additional Departments');
  const iReadiness = idx('Readiness');
  const iCommitment = idx('Commitment 80%');
  const iHasCamera = idx('Has Camera');
  const iSupportAvailability = idx('Support Availability');
  const iDataConsent = idx('Data Consent');
  const iRawJson = idx('Raw JSON');

  const normalizePipeList = (text, group) =>
    sanitizeText(text)
      .split('|')
      .map((s) => mapLabel(group, s.trim()))
      .filter(Boolean)
      .join(' | ');

  for (let r = 0; r < values.length; r += 1) {
    const row = values[r].slice();
    const original = JSON.stringify(row);

    for (let c = 0; c < row.length; c += 1) {
      if (typeof row[c] === 'string') row[c] = sanitizeText(row[c]);
    }

    row[iActivities] = normalizePipeList(row[iActivities], 'activity');
    row[iPrimaryDepartment] = mapLabel('primaryDepartment', row[iPrimaryDepartment]);
    row[iAdditionalDepartments] = normalizePipeList(row[iAdditionalDepartments], 'department');
    row[iReadiness] = mapLabel('readiness', row[iReadiness]);
    row[iCommitment] = mapLabel('commitment80Percent', row[iCommitment]);
    row[iHasCamera] = mapLabel('hasCamera', row[iHasCamera]);
    row[iSupportAvailability] = mapLabel('supportAvailability', row[iSupportAvailability]);

    if (typeof row[iDataConsent] === 'boolean') {
      row[iDataConsent] = row[iDataConsent] ? 'Có' : 'Không';
    } else {
      const dc = sanitizeText(row[iDataConsent]).toLowerCase();
      if (dc === 'true') row[iDataConsent] = 'Có';
      if (dc === 'false') row[iDataConsent] = 'Không';
    }

    if (row[iRawJson]) {
      try {
        const parsed = JSON.parse(String(row[iRawJson]));
        const cleaned = sanitizePayload(parsed);
        row[iRawJson] = JSON.stringify(cleaned);
      } catch (_e) {
        row[iRawJson] = sanitizeText(row[iRawJson]);
      }
    }

    if (JSON.stringify(row) !== original) {
      values[r] = row;
      updated += 1;
    }
  }

  if (updated > 0) {
    range.setValues(values);
  }

  return { scanned: values.length, updated };
}
