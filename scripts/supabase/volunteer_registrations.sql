create table if not exists public.volunteer_registrations (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  source text not null,
  submitted_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  facebook_or_zalo text not null,
  selected_activities text[] not null default '{}',
  selected_departments text[] not null default '{}',
  payload jsonb not null
);

alter table public.volunteer_registrations enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on public.volunteer_registrations to anon, authenticated;
grant usage, select on sequence public.volunteer_registrations_id_seq to anon, authenticated;

create policy "public can insert volunteer registrations"
on public.volunteer_registrations
for insert
to anon, authenticated
with check (true);
