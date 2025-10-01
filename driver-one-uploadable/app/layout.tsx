import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { createServerClient } from '@/lib/supabase-server'
export const metadata = { title: 'Driver One', description: 'AI media, pricing & one-click social for dealers.' }
export default async function RootLayout({ children }:{ children: React.ReactNode }){
  const supabase = createServerClient(); const { data: { user } } = await supabase.auth.getUser()
  return (<html lang="en"><body>
    <header className="nav">
      <Link href="/" style={{display:'flex',alignItems:'center',gap:8}}><Image src="/driver-one-logo.svg" alt="Driver One" width={28} height={28} /><b>Driver One</b></Link>
      <nav style={{display:'flex',gap:12}}>
        <Link href="/studio">Studio</Link>
        <Link href="/schedule">Schedule</Link>
        <Link href="/pricing">Pricing</Link>
        {user ? <form action="/auth/signout" method="post"><button className="btn secondary" style={{padding:'8px 12px'}}>Sign out</button></form> : <Link className="btn" href="/auth">Sign in</Link>}
      </nav>
    </header>
    <main>{children}</main><footer><small>© {new Date().getFullYear()} Driver One</small></footer></body></html>)
}
