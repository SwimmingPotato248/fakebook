import { createClient } from "@supabase/supabase-js";
import { env } from "../env/client.mjs";

const supbaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supbaseUrl, supabaseAnonKey);
