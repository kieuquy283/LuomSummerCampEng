/**
 * Google Apps Script - Lượm Volunteer Registration Sync
 * 
 * Đặt mục đích: Nhận dữ liệu POST từ landing page và ghi vào Google Sheet
 * 
 * Hướng dẫn triển khai:
 * 1. Truy cập https://script.google.com → Tạo project mới
 * 2. Paste toàn bộ code này vào file Code.gs
 * 3. Chọn hàm doPost (hoặc không cần chọn nếu deploy web app)
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy URL deployment, paste vào VITE_GOOGLE_SHEETS_ENDPOINT trên Vercel
 * 6. Tạo Google Sheet với tên "Lượm - Đăng ký TNV 2026" (hoặc tên tùy chọn)
 *    - Copy Spreadsheet ID từ URL: https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
 *    - Paste vào biến SPREADSHEET_ID bên dưới
 * 7. Save & Redeploy
 * 
 * Lưu ý quan trọng:
 * - Frontend gửi với mode: 'no-cors', content-type: 'text/plain'
 * - Do đó Apps Script chỉ nhận raw text, cần JSON.parse thủ công
 * - Apps Script Web App tự động trả về text/plain khi ContentService.createTextOutput
 */

// ============================================
// CONFIG
// ============================================
const SPREADSHEET_ID = ''; // <-- PASTE Spreadsheet ID vào đây (không để trống)
const SHEET_NAME = 'Form Responses';

// ============================================
// CORS HANDLER
// ============================================
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', message: 'Lượm Volunteer Sync API is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  // Log raw request for debugging
  console.log('Raw postData:', e.postData ? e.postData.contents : 'NO POSTDATA');
  console.log('Raw parameters:', JSON.stringify(e.parameter));

  try {
    // Parse JSON payload
    // Frontend gửi với mode=no-cors, content-type=text/plain
    // Nên e.postData.contents là JSON string thuần
    let payload;
    
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter && Object.keys(e.parameter).length > 0) {
      // Fallback cho trường hợp form-data
      payload = e.parameter;
    } else {
      throw new Error('No payload received');
    }

    console.log('Parsed payload:', JSON.stringify(payload).substring(0, 500));

    // Write to spreadsheet
    const result = writeToSpreadsheet(payload);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Error:', error.message);
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// SPREADSHEET WRITER
// ============================================
function writeToSpreadsheet(payload) {
  if (!SPREADSHEET_ID) {
    throw new Error('SPREADSHEET_ID chưa được cấu hình trong Code.gs');
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  // Tạo sheet nếu chưa tồn tại
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Tạo header
    const headers = buildHeaders();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    // Format header: bold, frozen row
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#0f172a')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  // Flatten payload thành 1 dòng
  const row = flattenPayload(payload);
  
  // Append row
  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

  // Auto-resize columns cho dễ đọc
  sheet.autoResizeColumns(1, row.length);

  return { rowInserted: nextRow, timestamp: new Date().toISOString() };
}

// ============================================
// HEADERS (phải khớp với flattenPayload)
// ============================================
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

// ============================================
// FLATTEN PAYLOAD
// ============================================
function flattenPayload(payload) {
  const pi = payload.personalInfo || {};
  const cm = payload.commitments || {};
  const ga = payload.generalAnswers || {};
  const ta = payload.techAnswers || {};
  const ma = payload.mediaAnswers || {};
  const sa = payload.supportAnswers || {};

  const safeJoin = (arr) => Array.isArray(arr) ? arr.join(' | ') : '';
  const safeStr = (val) => (val == null ? '' : String(val));

  return [
    new Date().toISOString(),                        // Submitted At
    safeStr(pi.fullName),                            // Full Name
    safeStr(pi.dateOfBirth),                         // Date of Birth
    safeStr(pi.schoolClassMajor),                      // School / Class / Major
    safeStr(pi.email),                               // Email
    safeStr(pi.phone),                               // Phone
    safeStr(pi.emergencyContact),                      // Emergency Contact
    safeStr(pi.facebookUrl),                         // Facebook/Zalo
    safeStr(pi.currentAddress),                      // Current Address
    safeStr(pi.certificates),                        // Certificates
    safeStr(cm.readiness),                           // Readiness
    safeStr(cm.commitment80Percent),                 // Commitment 80%
    safeStr(ga.knowledgeAboutLuom),                  // Knowledge About Luom
    safeStr(ga.motivation),                          // Motivation
    safeStr(ga.talents),                             // Talents
    safeJoin(ga.strengths),                          // Strengths
    safeStr(ga.strengthsOther),                      // Strengths Other
    safeStr(ga.pastVolunteerExperience),             // Past Volunteer Experience
    safeJoin(payload.activities),                    // Activities
    safeStr(payload.primaryDepartment),              // Primary Department
    safeJoin(payload.additionalDepartments),         // Additional Departments
    safeJoin(ta.techFocusAreas),                     // Tech Focus Areas
    safeStr(ta.techFocusOther),                      // Tech Focus Other
    safeStr(ta.cyberInfoSourcesAndRisks),            // Cyber Info Sources & Risks
    safeStr(ta.aiToolsAndComputerSkills),            // AI Tools & Computer Skills
    safeStr(ta.digitalToolsForLessonDesign),         // Digital Tools for Lesson Design
    safeStr(ta.cyberSafetyGameIdea),                 // Cyber Safety Game Idea
    safeStr(ta.offlineClassHandling),                // Offline Class Handling
    safeStr(ta.motorCircuitExperience),              // Motor Circuit Experience
    safeStr(ta.electricityKnowledgeRating),          // Electricity Knowledge Rating
    safeStr(ta.handmadeTechnicalSituation),          // Handmade Technical Situation
    safeJoin(ma.mediaPositions),                     // Media Positions
    safeStr(ma.mediaPositionOther),                  // Media Position Other
    safeStr(ma.mediaPortfolioLink),                  // Media Portfolio Link
    safeStr(ma.hasCamera),                           // Has Camera
    safeJoin(sa.supportTasks),                       // Support Tasks
    safeStr(sa.supportAvailability),                 // Support Availability
    safeStr(sa.supportExperience),                   // Support Experience
    safeStr(payload.finalNote),                    // Final Note
    safeStr(payload.dataConsent),                    // Data Consent
    safeStr(payload.formName),                     // Form Name
    safeStr(payload.source),                       // Source
    safeStr(payload.createdAt),                    // Created At
    JSON.stringify(payload),                         // Raw JSON (full backup)
  ];
}

// ============================================
// TEST FUNCTION (chạy trong Apps Script editor)
// ============================================
function testWrite() {
  const testPayload = {
    formName: 'Đăng ký TNV Test',
    source: 'landing_page_direct_form',
    createdAt: '2026-05-25T14:00:00.000Z',
    personalInfo: {
      fullName: 'Nguyen Van Test',
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
      knowledgeAboutLuom: 'Biết về dự án Lượm',
      motivation: 'Muốn giúp đỡ',
      talents: 'Hát, nhảy',
      strengths: ['san-sang-hoc-hoi', 'chup-anh'],
      strengthsOther: '',
      pastVolunteerExperience: 'Từng TN cho ABC',
    },
    activities: ['Trại hè Xanh', 'Trại hè Công nghệ'],
    primaryDepartment: 'tech',
    additionalDepartments: ['media'],
    techAnswers: {
      techFocusAreas: ['an-toan-mang', 'ung-dung-ai'],
      techFocusOther: '',
      cyberInfoSourcesAndRisks: 'Từ internet',
      aiToolsAndComputerSkills: 'ChatGPT',
      digitalToolsForLessonDesign: 'Canva',
      cyberSafetyGameIdea: 'Trò chơi đoán đâu',
      offlineClassHandling: 'Dùng sách',
      motorCircuitExperience: 'Từng làm',
      electricityKnowledgeRating: '8',
      handmadeTechnicalSituation: 'Nhiệt tình',
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
    finalNote: 'Rất vui được tham gia',
    dataConsent: true,
  };

  const result = writeToSpreadsheet(testPayload);
  console.log('Test result:', result);
}
