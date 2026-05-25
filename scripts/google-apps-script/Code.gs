const SHEET_NAME = 'VolunteerRegistrations';

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const sheet = getOrCreateSheet_();
    const row = flattenPayload_(payload);

    ensureHeader_(sheet, Object.keys(row));
    appendRow_(sheet, row);

    return jsonResponse_({
      ok: true,
      message: 'Registration saved',
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      message: error && error.message ? error.message : String(error),
    });
  }
}

function parsePayload_(e) {
  const rawBody = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
  return JSON.parse(rawBody);
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function flattenPayload_(payload) {
  const personalInfo = payload.personalInfo || {};
  const commitments = payload.commitments || {};
  const generalAnswers = payload.generalAnswers || {};
  const techAnswers = payload.techAnswers || {};
  const mediaAnswers = payload.mediaAnswers || {};
  const supportAnswers = payload.supportAnswers || {};

  return {
    createdAt: payload.createdAt || '',
    source: payload.source || '',
    formName: payload.formName || '',
    fullName: personalInfo.fullName || '',
    dateOfBirth: personalInfo.dateOfBirth || '',
    schoolClassMajor: personalInfo.schoolClassMajor || '',
    email: personalInfo.email || '',
    phone: personalInfo.phone || '',
    emergencyContact: personalInfo.emergencyContact || '',
    facebookUrl: personalInfo.facebookUrl || '',
    currentAddress: personalInfo.currentAddress || '',
    certificates: personalInfo.certificates || '',
    readiness: commitments.readiness || '',
    commitment80Percent: commitments.commitment80Percent || '',
    knowledgeAboutLuom: generalAnswers.knowledgeAboutLuom || '',
    motivation: generalAnswers.motivation || '',
    talents: generalAnswers.talents || '',
    strengths: joinArray_(generalAnswers.strengths),
    strengthsOther: generalAnswers.strengthsOther || '',
    pastVolunteerExperience: generalAnswers.pastVolunteerExperience || '',
    activities: joinArray_(payload.activities),
    primaryDepartment: payload.primaryDepartment || '',
    additionalDepartments: joinArray_(payload.additionalDepartments),
    techFocusAreas: joinArray_(techAnswers.techFocusAreas),
    techFocusOther: techAnswers.techFocusOther || '',
    cyberInfoSourcesAndRisks: techAnswers.cyberInfoSourcesAndRisks || '',
    aiToolsAndComputerSkills: techAnswers.aiToolsAndComputerSkills || '',
    digitalToolsForLessonDesign: techAnswers.digitalToolsForLessonDesign || '',
    cyberSafetyGameIdea: techAnswers.cyberSafetyGameIdea || '',
    offlineClassHandling: techAnswers.offlineClassHandling || '',
    motorCircuitExperience: techAnswers.motorCircuitExperience || '',
    electricityKnowledgeRating: techAnswers.electricityKnowledgeRating || '',
    handmadeTechnicalSituation: techAnswers.handmadeTechnicalSituation || '',
    mediaPositions: joinArray_(mediaAnswers.mediaPositions),
    mediaPositionOther: mediaAnswers.mediaPositionOther || '',
    mediaPortfolioLink: mediaAnswers.mediaPortfolioLink || '',
    hasCamera: mediaAnswers.hasCamera || '',
    supportTasks: joinArray_(supportAnswers.supportTasks),
    supportExperience: supportAnswers.supportExperience || '',
    finalNote: payload.finalNote || '',
    dataConsent: payload.dataConsent ? 'true' : 'false',
    rawPayload: JSON.stringify(payload),
  };
}

function joinArray_(value) {
  return Array.isArray(value) ? value.join(' | ') : '';
}

function ensureHeader_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
}

function appendRow_(sheet, rowObject) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].filter(Boolean);
  const row = headers.map(function (header) {
    return rowObject[header] || '';
  });
  sheet.appendRow(row);
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
