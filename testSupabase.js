const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://yqnobghwenvblymjwfkn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxbm9iZ2h3ZW52Ymx5bWp3ZmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwODcwMzYsImV4cCI6MjEwNjY2MzAzNn0.0Pjt1Dw0Q4HHunpMrzSsGfKOUo99NJ3JA2-XBcax7oM';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test(query) {
  const { data, error } = await supabase.from('demands').select(query).limit(1);
  if (error) {
    console.log('[FAIL]', query, '->', error.message);
  } else {
    console.log('[SUCCESS]', query);
  }
}

async function run() {
  await test('*, users(*)');
  await test('*, users!buyerId(*)');
  await test('*, buyer:users(*)');
  await test('*, buyer:users!buyerId(*)');
  await test('*, buyer:users!demands_buyerId_fkey(*)');
  await test('*, users!demands_buyerId_fkey(*)');
  await test('*, buyer:buyerId(*)');
}
run();
