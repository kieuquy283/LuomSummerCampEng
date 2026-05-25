# Google Apps Script - Đồng bộ đăng ký TNV vào Google Sheet

## Mục đích

Nhận dữ liệu POST từ landing page (sau khi lưu vào Supabase thành công) và ghi vào Google Sheet để BTC dễ theo dõi, lọc, xuất danh sách.

---

## Cấu trúc dữ liệu

Frontend gửi JSON payload có cấu trúc:

```json
{
  "formName": "...",
  "source": "landing_page_direct_form",
  "createdAt": "...",
  "personalInfo": { "fullName", "dateOfBirth", "schoolClassMajor", "email", "phone", ... },
  "commitments": { "readiness", "commitment80Percent" },
  "generalAnswers": { "knowledgeAboutLuom", "motivation", "talents", "strengths", ... },
  "activities": ["..."],
  "primaryDepartment": "...",
  "additionalDepartments": ["..."],
  "techAnswers": { "techFocusAreas", "cyberInfoSourcesAndRisks", ... },
  "mediaAnswers": { "mediaPositions", "mediaPortfolioLink", ... },
  "supportAnswers": { "supportTasks", "supportAvailability", ... },
  "finalNote": "...",
  "dataConsent": true
}
```

---

## Hướng dẫn cài đặt (từng bước)

### Bước 1: Tạo Google Sheet

1. Vào [Google Sheets](https://sheets.new)
2. Đặt tên: `Lượm - Đăng ký TNV 2026`
3. Copy **Spreadsheet ID** từ URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

### Bước 2: Tạo Google Apps Script

1. Vào [script.google.com](https://script.google.com)
2. Tạo project mới
3. Xóa code mặc định, paste toàn bộ code từ file `Code.gs` trong thư mục này
4. Tìm dòng `const SPREADSHEET_ID = '';` và paste ID đã copy vào
   ```js
   const SPREADSHEET_ID = '1aBcD...'; // <-- paste here
   ```
5. Save project (Ctrl+S)

### Bước 3: Test trong Apps Script

1. Trong Apps Script editor, chọn hàm `testWrite` ở dropdown phía trên
2. Click **Run** (▶️)
3. Cấp quyền khi được hỏi (có thể cảnh báo "unverified", chọn Advanced → Go to...)
4. Kiểm tra Google Sheet đã có dòng test chưa

### Bước 4: Deploy Web App

1. Trong Apps Script editor: **Deploy → New deployment**
2. Click **Select type → Web app**
3. Cấu hình:
   - Description: `Lượm TNV Registration Sync`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Copy **Web app URL** (dạng `https://script.google.com/macros/s/.../exec`)

### Bước 5: Cấu hình Frontend

1. Vào [Vercel Dashboard](https://vercel.com) → Project Settings → Environment Variables
2. Thêm/cập nhật:
   ```
   Key:   VITE_GOOGLE_SHEETS_ENDPOINT
   Value: https://script.google.com/macros/s/AKfycb.../exec  (URL vừa copy)
   Environment: Production ✓, Preview ✓
   ```
3. Redeploy project

---

## Cách hoạt động

```
User submit form
    ↓
Frontend validate + build payload
    ↓
Insert vào Supabase (primary storage)
    ↓
Nếu VITE_GOOGLE_SHEETS_ENDPOINT có giá trị:
    → POST payload đến Apps Script (mode: no-cors)
    → Apps Script nhận raw JSON → parse → ghi vào Sheet
    → Frontend KHÔNG đọc được response (do no-cors) nhưng request vẫn đến
    ↓
Tải file JSON + CSV về máy user
    ↓
Hiện popup thành công
```

---

## Xử lý sự cố thường gặp

| Vấn đề | Nguyên nhân | Cách fix |
|--------|-------------|----------|
| Sheet không nhận data | `SPREADSHEET_ID` sai hoặc chưa paste | Kiểm tra lại ID trong Code.gs |
| `You do not have permission` | Apps Script chưa được cấp quyền | Chạy `testWrite()` trong editor để cấp quyền |
| Data đến nhưng không parse được | Frontend đổi schema JSON | Cập nhật `flattenPayload()` trong Code.gs |
| Sheet bị duplicate header mỗi lần chạy | Tên sheet bị xóa/đổi | Giữ nguyên tên `Form Responses` hoặc cập nhật `SHEET_NAME` |

---

## Cập nhật Apps Script

Khi sửa code Apps Script, phải **tạo deployment mới** hoặc **Manage deployments → Edit → Save** để URL mới nhận thay đổi.

---

## Lưu ý bảo mật

- Web App để access: **Anyone** → ai cũng có thể POST. Nếu lo ngại spam:
  - Thêm simple token check trong `doPost()`
  - Hoặc chuyển sang **Anyone with Google account** nếu team đều có @gmail.com
- Không nên lưu secret key trong Apps Script nếu share project với nhiều người
