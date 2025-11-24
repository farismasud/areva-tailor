import { createClient } from '@supabase/supabase-js'

// Tambahin "!" di ujung atau "as string" biar TS diem
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)