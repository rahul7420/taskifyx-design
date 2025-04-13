
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://grxowbryhonkovbjperr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeG93YnJ5aG9ua292YmpwZXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Mzg0OTgsImV4cCI6MjA2MDAxNDQ5OH0.RxBCUWKnATpkLd3OpzaHOynfruz6wZYGIQSCmAoqbBI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
