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
    fullName: payload.fullName || '',
    dateOfBirth: payload.dateOfBirth || '',
    schoolOrOrganization: payload.schoolOrOrganization || '',
    phone: payload.phone || '',
    email: payload.email || '',
    facebookOrZalo: payload.facebookOrZalo || '',
    applicantType: payload.applicantType || '',
    selectedActivities: joinArray_(payload.selectedActivities),
    selectedDepartments: joinArray_(payload.selectedDepartments),
    techRole: payload.techRole || '',
    techFields: joinArray_(payload.techFields),
    techExperience: payload.techExperience || '',
    mediaSkills: joinArray_(payload.mediaSkills),
    mediaEquipment: joinArray_(payload.mediaEquipment),
    portfolioUrl: payload.portfolioUrl || '',
    supportTasks: joinArray_(payload.supportTasks),
    availableForGreenCamp: payload.availableForGreenCamp || '',
    availabilityPeriods: joinArray_(payload.availabilityPeriods),
    timeSlots: joinArray_(payload.timeSlots),
    busyNote: payload.busyNote || '',
    priority1: payload.priority1 || '',
    priority2: payload.priority2 || '',
    priority3: payload.priority3 || '',
    commitmentConfirmed: payload.commitmentConfirmed ? 'true' : 'false',
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
