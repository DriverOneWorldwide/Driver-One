import { NextResponse } from 'next/server'
import { adminClient } from '@/lib/supabase-admin'
import sharp from 'sharp'
const PRESETS: Record<string,{w:number,h:number}> = { instagram_square:{w:1080,h:1080}, facebook_landscape:{w:1200,h:630}, youtube_thumbnail:{w:1280,h:720}, stories:{w:1080,h:1920} }
export async function POST(req: Request){
  const { path } = await req.json() as { path: string }
  if(!path) return NextResponse.json({ error:'Missing path' }, { status: 400 })
  const supa = adminClient(); const dl = await supa.storage.from('media').download(path)
  if(dl.error || !dl.data) return NextResponse.json({ error: dl.error?.message || 'download failed' }, { status: 400 })
  const buf = Buffer.from(await dl.data.arrayBuffer()); const results: Record<string,string> = {}
  for(const [name,size] of Object.entries(PRESETS)){
    const out = await sharp(buf).rotate().resize(size.w, size.h, { fit:'cover', position:'attention' }).jpeg({ quality:85 }).toBuffer()
    const dest = `renditions/${path.split('/').pop()?.replace('.jpg','')}/${name}.jpg`
    await supa.storage.from('media').upload(dest, out, { contentType:'image/jpeg', upsert: true })
    results[name] = dest
  }
  return NextResponse.json({ ok:true, results })
}
