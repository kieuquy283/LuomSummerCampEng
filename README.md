# React + TypeScript + Vite

This project uses React, TypeScript, and Vite for the volunteer recruitment landing page of the
Summer Campaign 2026.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Registration dashboard

- Visual dashboard page: `/dashboard.html`
- Source: `src/pages/RegistrationDashboardPage.tsx`
- Data source: Supabase table configured by `VITE_SUPABASE_TABLE` (default `volunteer_registrations`)

## Registration note

The direct volunteer registration form on the landing page now prioritizes Supabase for data
storage. If Supabase is not configured, it can still fall back to `VITE_REGISTRATION_ENDPOINT`.

For real deployments, registration data should be stored in a persistent backend such as:

- Google Sheets via Apps Script webhook
- Supabase

In local development, if neither Supabase nor `VITE_REGISTRATION_ENDPOINT` is configured, the form
still works in demo mode, logs payloads in the browser console, and auto-downloads a CSV copy.

## Supabase setup

1. Create a Supabase project.
2. Open the SQL editor and run the script in `scripts/supabase/volunteer_registrations.sql`.
3. Copy your project URL and publishable key from the Supabase dashboard.
4. Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_TABLE=volunteer_registrations
```

5. Restart the dev server with `npm run dev`.

The frontend writes one row per registration into the configured Supabase table and keeps the full
form payload in the `payload` JSONB column for convenient retrieval later.

### Optional export view for BTC

To make data easier to read and export for BTC, you can also run:

`scripts/supabase/volunteer_registrations_export.sql`

This creates a view named `public.volunteer_registrations_export` that flattens the most useful
fields out of the JSON payload into plain columns for filtering and CSV export in Supabase.

## Google Apps Script setup

To mirror direct registrations into Google Sheets while still keeping Supabase as the main store:

1. Create a Google Sheet.
2. Open `Extensions -> Apps Script`.
3. Copy the sample code from `scripts/google-apps-script/Code.gs`.
4. Deploy the script as a Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
5. Copy the Web App URL.
6. Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_TABLE=volunteer_registrations
VITE_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

7. Restart the dev server with `npm run dev`.

The frontend will then:

- save the registration to Supabase first
- send the same payload to Google Sheets through Apps Script for BTC tracking

## Apps Script checklist

- Google Sheet exists and you can edit it.
- `Code.gs` has been pasted into Apps Script.
- Web App is deployed, not just saved.
- Access is set to `Anyone`.
- You copied the `/exec` URL, not an editor URL.
- `.env.local` includes `VITE_GOOGLE_SHEETS_ENDPOINT`.
- After changing `.env.local`, restart `npm run dev`.
- Submit one test record and confirm a new row appears in sheet `VolunteerRegistrations`.
