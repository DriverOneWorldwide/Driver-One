import { NextResponse } from 'next/server'
import OpenAI from 'openai'
export async function POST(){
  if(!process.env.OPENAI_API_KEY) return NextResponse.json({ instagram:'New arrival. DM for details!', hashtags:['car','forsale','deal'] })
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const prompt = 'Write a UK-friendly Instagram caption for a used car dealer post with a CTA and 10 short hashtags (no # in output). Return JSON with keys instagram and hashtags (array).'
  const res = await openai.chat.completions.create({ model:'gpt-4o-mini', messages:[{ role:'user', content: prompt }], response_format:{ type:'json_object' } })
  let data:any = {}; try{ data = JSON.parse(res.choices[0]?.message?.content || '{}') }catch{}
  return NextResponse.json(data)
}
