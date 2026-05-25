import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null | undefined;

export const getSupabaseClient = () => {
  if (supabaseClient !== undefined) {
    return supabaseClient;
  }

  const url = import.meta.env.VITE_SUPABASE_URL?.trim();
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey) {
    supabaseClient = null;
    return supabaseClient;
  }

  supabaseClient = createClient(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return supabaseClient;
};

export const getVolunteerRegistrationsTable = () =>
  import.meta.env.VITE_SUPABASE_TABLE?.trim() || 'volunteer_registrations';
