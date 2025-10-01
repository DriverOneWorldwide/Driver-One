import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { v4 as uuid } from 'uuid'
export async function POST(){
  const supabase = createServerClient(); const { data: { user } } = await supabase.auth.getUser()
  if(!user) return NextResponse.json({ error:'Unauthorized' }, { status: 401 })
  const id = uuid(); const path = `originals/${user.id}/${id}.jpg`
  const { data, error } = await supabase.storage.from('media').createSignedUploadUrl(path)
  if(error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ path, url: data.signedUrl, token: data.token })
}
