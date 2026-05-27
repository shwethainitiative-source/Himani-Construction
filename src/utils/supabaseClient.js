import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('replace-with-your-project-url')) {
  console.warn(
    "Supabase integration credentials are not fully configured yet. " +
    "Please populate VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY inside your .env file to enable live backend synchronization."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
