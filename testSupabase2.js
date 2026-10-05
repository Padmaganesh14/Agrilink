const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://yqnobghwenvblymjwfkn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxbm9iZ2h3ZW52Ymx5bWp3ZmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwODcwMzYsImV4cCI6MjEwNjY2MzAzNn0.0Pjt1Dw0Q4HHunpMrzSsGfKOUo99NJ3JA2-XBcax7oM';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('demands').select('*').limit(1);
  console.log('Error:', error);
  console.log('Data:', data);
}
test();
