import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl =
  process.env.SUPABASE_URL || "https://yqnobghwenvblymjwfkn.supabase.co";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in .env");
}

import WebSocket from "ws";
global.WebSocket = WebSocket;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  global: { WebSocket },
});
