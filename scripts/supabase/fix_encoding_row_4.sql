begin;

update public.volunteer_registrations
set
  selected_activities = array[
    'Trại hè Xanh',
    'Trại hè Công nghệ',
    'Lớp Bình dân học vụ số'
  ],
  selected_departments = array[
    'Chuyên môn Tin học và Kỹ thuật',
    'Truyền thông'
  ],
  payload = jsonb_set(
    jsonb_set(
      payload,
      '{formName}',
      to_jsonb('Đăng ký Tình nguyện viên Lượm - Chiến dịch mùa hè 2026'::text),
      true
    ),
    '{activities}',
    to_jsonb(array[
      'Trại hè Xanh',
      'Trại hè Công nghệ',
      'Lớp Bình dân học vụ số'
    ]::text[]),
    true
  )
where id = 4;

-- Verify
select
  id,
  selected_activities,
  selected_departments,
  payload ->> 'formName' as form_name,
  payload -> 'activities' as payload_activities
from public.volunteer_registrations
where id = 4;

commit;
