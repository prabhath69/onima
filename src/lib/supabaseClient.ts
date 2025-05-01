import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ynnowkssmkowcjctcbzz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlubm93a3NzbWtvd2NqY3RjYnp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNDA2OTYsImV4cCI6MjA2MTYxNjY5Nn0.sGIexzNWPIi6kHd8cMSBs7aUZQi4A8SEBouOxhSUkHY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
