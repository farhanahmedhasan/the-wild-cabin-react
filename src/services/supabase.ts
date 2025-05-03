import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://wnqctejmnsfdymvpaaqh.supabase.co'
export const supabaseCabinImagesBucket = `${supabaseUrl}/storage/v1/object/public/cabin-images//`
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
