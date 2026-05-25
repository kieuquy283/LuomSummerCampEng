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
      message: error instanceof Error ? error.message : String(error),
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
  return {
    createdAt: payload.createdAt || '',
    source: payload.source || '',
    readinessConfirmed: payload.readinessConfirmed ? 'true' : 'false',
    participationCommitmentConfirmed: payload.participationCommitmentConfirmed ? 'true' : 'false',
    email: payload.email || '',
    fullName: payload.fullName || '',
    dateOfBirth: payload.dateOfBirth || '',
    schoolInfo: payload.schoolInfo || '',
    phone: payload.phone || '',
    facebookOrZalo: payload.facebookOrZalo || '',
    aboutLuom: payload.aboutLuom || '',
    motivation: payload.motivation || '',
    generalStrengths: joinArray_(payload.generalStrengths),
    generalStrengthsOther: payload.generalStrengthsOther || '',
    previousVolunteerExperience: payload.previousVolunteerExperience || '',
    selectedActivities: joinArray_(payload.selectedActivities),
    selectedDepartments: joinArray_(payload.selectedDepartments),
    techRole: payload.techRole || '',
    techFields: joinArray_(payload.techFields),
    techAiSkills: payload.techAiSkills || '',
    techTeachingTools: payload.techTeachingTools || '',
    mediaPositions: joinArray_(payload.mediaPositions),
    portfolioUrl: payload.portfolioUrl || '',
    mediaWritingChallenge: payload.mediaWritingChallenge || '',
    mediaDesignPortfolioNote: payload.mediaDesignPortfolioNote || '',
    mediaVideoPortfolioNote: payload.mediaVideoPortfolioNote || '',
    mediaHasCamera: payload.mediaHasCamera || '',
    supportTasks: joinArray_(payload.supportTasks),
    availableForGreenCamp: payload.availableForGreenCamp || '',
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
  const headers = sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .filter(Boolean);

  const row = headers.map((header) => rowObject[header] || '');
  sheet.appendRow(row);
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
