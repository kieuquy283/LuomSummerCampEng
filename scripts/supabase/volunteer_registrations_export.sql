create or replace view public.volunteer_registrations_export as
select
  id,
  created_at,
  submitted_at,
  source,
  full_name,
  email,
  phone,
  facebook_or_zalo,
  array_to_string(selected_activities, ' | ') as selected_activities_text,
  array_to_string(selected_departments, ' | ') as selected_departments_text,

  -- personalInfo
  payload->'personalInfo'->>'dateOfBirth' as date_of_birth,
  payload->'personalInfo'->>'schoolClassMajor' as school_class_major,
  payload->'personalInfo'->>'emergencyContact' as emergency_contact,
  payload->'personalInfo'->>'currentAddress' as current_address,
  payload->'personalInfo'->>'certificates' as certificates,

  -- commitments
  payload->'commitments'->>'readiness' as readiness,
  payload->'commitments'->>'commitment80Percent' as commitment_80_percent,

  -- generalAnswers
  payload->'generalAnswers'->>'knowledgeAboutLuom' as knowledge_about_luom,
  payload->'generalAnswers'->>'motivation' as motivation,
  payload->'generalAnswers'->>'talents' as talents,
  array_to_string(array(select jsonb_array_elements_text(payload->'generalAnswers'->'strengths')), ' | ') as strengths_text,
  payload->'generalAnswers'->>'strengthsOther' as strengths_other,
  payload->'generalAnswers'->>'pastVolunteerExperience' as past_volunteer_experience,

  -- departments
  payload->>'primaryDepartment' as primary_department,
  array_to_string(array(select jsonb_array_elements_text(payload->'additionalDepartments')), ' | ') as additional_departments_text,

  -- techAnswers
  array_to_string(array(select jsonb_array_elements_text(payload->'techAnswers'->'techFocusAreas')), ' | ') as tech_focus_areas_text,
  payload->'techAnswers'->>'techFocusOther' as tech_focus_other,
  payload->'techAnswers'->>'cyberInfoSourcesAndRisks' as cyber_info_sources_and_risks,
  payload->'techAnswers'->>'aiToolsAndComputerSkills' as ai_tools_and_computer_skills,
  payload->'techAnswers'->>'digitalToolsForLessonDesign' as digital_tools_for_lesson_design,
  payload->'techAnswers'->>'cyberSafetyGameIdea' as cyber_safety_game_idea,
  payload->'techAnswers'->>'offlineClassHandling' as offline_class_handling,
  payload->'techAnswers'->>'motorCircuitExperience' as motor_circuit_experience,
  payload->'techAnswers'->>'electricityKnowledgeRating' as electricity_knowledge_rating,
  payload->'techAnswers'->>'handmadeTechnicalSituation' as handmade_technical_situation,

  -- mediaAnswers
  array_to_string(array(select jsonb_array_elements_text(payload->'mediaAnswers'->'mediaPositions')), ' | ') as media_positions_text,
  payload->'mediaAnswers'->>'mediaPositionOther' as media_position_other,
  payload->'mediaAnswers'->>'mediaPortfolioLink' as media_portfolio_link,
  payload->'mediaAnswers'->>'hasCamera' as has_camera,

  -- supportAnswers
  array_to_string(array(select jsonb_array_elements_text(payload->'supportAnswers'->'supportTasks')), ' | ') as support_tasks_text,
  payload->'supportAnswers'->>'supportAvailability' as support_availability,
  payload->'supportAnswers'->>'supportExperience' as support_experience,

  -- final
  payload->>'finalNote' as final_note,
  payload->>'dataConsent' as data_consent,
  payload->>'formName' as form_name,

  -- raw backup
  payload
from public.volunteer_registrations
order by submitted_at desc;
