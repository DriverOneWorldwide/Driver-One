import Link from 'next/link'
export default function Home(){ return (<div className="grid">
  <section className="hero"><h1>Upload once. Sell faster.</h1><p>Perfect images in every size, AI captions, pricing, and one‑click social.</p>
  <div style={{display:'flex',gap:12}}><Link className="btn" href="/pricing">Start now</Link><Link className="btn secondary" href="/studio">Open Studio</Link></div></section>
</div>) }
