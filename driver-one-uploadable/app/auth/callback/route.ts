import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
export async function GET(req: Request){
  const supabase = createServerClient(); const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code'); if(code){ await supabase.auth.exchangeCodeForSession(code); return NextResponse.redirect(`${origin}/studio`) }
  return NextResponse.redirect(`${origin}/auth`)
}
