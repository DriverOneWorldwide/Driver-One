'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
export default function AuthPage(){
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [email,setEmail]=useState(''); const [sent,setSent]=useState(false); const [err,setErr]=useState<string|null>(null)
  const go=async(e:any)=>{e.preventDefault(); setErr(null); const { error } = await supabase.auth.signInWithOtp({ email, options:{ emailRedirectTo: `${window.location.origin}/auth/callback`}}); if(error) setErr(error.message); else setSent(true) }
  return <div className="card"><h1>Sign in</h1>{sent? <p>Check your email.</p> : <form onSubmit={go} className="grid"><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/><button className="btn">Send magic link</button>{err&&<p style={{color:'#dc2626'}}>{err}</p>}</form>}</div>
}
