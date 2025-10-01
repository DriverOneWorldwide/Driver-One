'use client'
import { useState } from 'react'
export default function Studio(){
  const [file,setFile]=useState<File|null>(null)
  const [status,setStatus]=useState(''); const [renditions,setRenditions]=useState<Record<string,string>>({})
  const [caption,setCaption]=useState('')
  const go = async ()=>{
    if(!file) return
    setStatus('Getting upload URL…')
    const r = await fetch('/api/upload-url',{method:'POST'}); const up = await r.json(); if(!up.url){ setStatus('Auth or storage not configured'); return }
    setStatus('Uploading…'); const put = await fetch(up.url,{method:'PUT', body:file, headers:{'x-upsert':'true'}}); if(!put.ok){ setStatus('Upload failed'); return }
    setStatus('Processing…'); const p = await fetch('/api/process/image',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ path: up.path })}); const out = await p.json()
    if(!out.ok){ setStatus('Processing failed'); return } setRenditions(out.results); setStatus('Generating captions…')
    const c = await fetch('/api/captions',{method:'POST'}); const cj = await c.json(); setCaption((cj.instagram||cj.facebook||'') + '\n\n' + (cj.hashtags||[]).map((h:string)=>'#'+h).join(' '))
    setStatus('Done — ready to post.')
  }
  return <div className="grid">
    <div className="card"><h1>Studio</h1><p>Upload once — we’ll make every size and write your caption.</p>
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>
        <input className="input" type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
      </div>
      <div style={{display:'flex',gap:12,marginTop:12}}><button className="btn" onClick={go} disabled={!file}>Upload & Generate</button><span style={{alignSelf:'center',color:'#475569'}}>{status}</span></div>
    </div>
    {Object.keys(renditions).length>0 && <div className="card"><h2>Renditions</h2><div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))'}}>
      {Object.entries(renditions).map(([name,path])=>(<div key={name} style={{textAlign:'center'}}><img src={`/storage/v1/object/public/media/${path}`} style={{width:'100%',borderRadius:12,border:'1px solid #e5e7eb'}}/><small>{name}</small></div>))}
    </div></div>}
    {Object.keys(renditions).length>0 && <div className="card"><h2>Caption</h2><textarea className="input" rows={5} value={caption} onChange={e=>setCaption(e.target.value)} /></div>}
  </div>
}
