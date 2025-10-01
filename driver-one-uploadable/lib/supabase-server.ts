import { createServerClient as createSSR } from '@supabase/ssr'
import { cookies } from 'next/headers'
export function createServerClient(){
  const cookieStore = cookies()
  return createSSR({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookies: { get(name:string){ return cookieStore.get(name)?.value } }
  })
}
