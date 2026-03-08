// 1️⃣ Import the Supabase client (agar browser version use kar rahe ho)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2️⃣ Set your Project URL & Publishable API Key
const SUPABASE_URL = 'https://iepuybwrlridnteexrri.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_sDtFbHsckOYzogZ4mk93YQ_jaekvm9u';

// 3️⃣ Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);