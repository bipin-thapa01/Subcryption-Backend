const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ttocbvxrbkschnfevopk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0b2NidnhyYmtzY2huZmV2b3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NzQwMzQsImV4cCI6MjA3MTE1MDAzNH0.-x4xWT9YXkKhkBQe9r0wRq29rDvzS54nwr1wy8lVF6I';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {supabase};