# Hướng dẫn cấu hình Environment Variables trên Vercel

> Tài liệu này hướng dẫn thêm các biến môi trường cần thiết cho dự án trên Vercel Dashboard.

---

## Các biến môi trường cần thiết

| Biến môi trường | Giá trị mẫu | Môi trường | Ghi chú |
|-----------------|-------------|------------|---------|
| `VITE_SUPABASE_URL` | `https://bmriqmuwskwbeninqado.supabase.co` | Production, Preview | URL project Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` | Production, Preview | Publishable/anon key Supabase |
| `VITE_SUPABASE_TABLE` | `volunteer_registrations` | Production, Preview | Tên bảng lưu đăng ký |
| `VITE_REGISTRATION_ENDPOINT` | *(để trống)* | Production, Preview | Endpoint tùy chỉnh (nếu có) |
| `VITE_REGISTRATION_TRANSPORT` | *(để trống)* | Production, Preview | `google-apps-script` nếu dùng GAS |
| `VITE_GOOGLE_SHEETS_ENDPOINT` | *(để trống)* | Production, Preview | Google Apps Script để đồng bộ Sheet |

> **Lưu ý quan trọng:** Tất cả biến đều bắt đầu bằng `VITE_` để Vite expose ra client-side.

---

## Các bước thêm trên Vercel Dashboard

### Bước 1: Truy cập Project Settings
1. Đăng nhập [vercel.com](https://vercel.com)
2. Chọn project `luom-summer-camp`
3. Tab **Settings** → phần **Environment Variables**

### Bước 2: Thêm từng biến

**VITE_SUPABASE_URL**
```
Key:   VITE_SUPABASE_URL
Value: https://bmriqmuwskwbeninqado.supabase.co
Environment: Production ✓, Preview ✓, Development ☐
```

**VITE_SUPABASE_PUBLISHABLE_KEY**
```
Key:   VITE_SUPABASE_PUBLISHABLE_KEY
Value: sb_publishable_DIOjp6bhVKrQ72t1sp3BKw_S2kCDp-J
Environment: Production ✓, Preview ✓, Development ☐
```

**VITE_SUPABASE_TABLE**
```
Key:   VITE_SUPABASE_TABLE
Value: volunteer_registrations
Environment: Production ✓, Preview ✓, Development ☐
```

**VITE_REGISTRATION_ENDPOINT** *(nếu muốn dùng endpoint tùy chỉnh thay vì Supabase)*
```
Key:   VITE_REGISTRATION_ENDPOINT
Value: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
Environment: Production ✓, Preview ✓, Development ☐
```
> **Khuyến nghị:** Để trống nếu muốn lưu trực tiếp vào Supabase.

**VITE_REGISTRATION_TRANSPORT** *(chỉ cần khi dùng Google Apps Script endpoint)*
```
Key:   VITE_REGISTRATION_TRANSPORT
Value: google-apps-script
Environment: Production ✓, Preview ✓, Development ☐
```

**VITE_GOOGLE_SHEETS_ENDPOINT** *(nếu muốn đồng bộ sang Google Sheet song song với Supabase)*
```
Key:   VITE_GOOGLE_SHEETS_ENDPOINT
Value: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
Environment: Production ✓, Preview ✓, Development ☐
```

### Bước 3: Redeploy
- Sau khi thêm xong tất cả biến, Vercel sẽ tự động trigger rebuild.
- Hoặc bạn có thể vào tab **Deployments** → chọn **Redeploy** để áp dụng ngay.

---

## Luồng hoạt động dựa trên cấu hình

```
IF VITE_REGISTRATION_ENDPOINT tồn tại:
    → Gửi form đến endpoint tùy chỉnh (bỏ qua Supabase)
ELSE IF VITE_SUPABASE_URL và VITE_SUPABASE_PUBLISHABLE_KEY tồn tại:
    → Insert vào bảng Supabase (volunteer_registrations)
    → Nếu VITE_GOOGLE_SHEETS_ENDPOINT tồn tại:
        → Đồng bộ song sang Google Sheet
ELSE IF môi trường dev:
    → Log ra console
ELSE:
    → Báo lỗi "Chưa cấu hình nơi lưu dữ liệu"
```

---

## Khắc phục sự cố thường gặp

| Vấn đề | Nguyên nhân | Cách fix |
|--------|-------------|----------|
| Màn hình trắng sau deploy | Build fail (TypeScript error, env thiếu) | Kiểm tra **Build Logs** trên Vercel |
| Form gửi không lưu vào Supabase | `VITE_REGISTRATION_ENDPOINT` đang có giá trị | Xóa hoặc để trống biến này |
| `import.meta.env` undefined | Biến không có prefix `VITE_` | Đảm bảo tên biến bắt đầu bằng `VITE_` |
| Google Sheets không nhận data | `VITE_GOOGLE_SHEETS_ENDPOINT` sai hoặc thiếu | Kiểm tra URL GAS và quyền truy cập |

---

## Lưu ý bảo mật

- Không bao giờ commit file `.env.local` lên GitHub (đã có trong `.gitignore`)
- `VITE_SUPABASE_PUBLISHABLE_KEY` là **public key**, có thể để trên client
- Không sử dụng `service_role_key` (secret key) cho các biến `VITE_`
- Nếu cần dùng secret key, hãy tạo **Vercel Serverless Function** hoặc **Edge Function**
