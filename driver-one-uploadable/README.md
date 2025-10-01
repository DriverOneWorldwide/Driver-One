# Driver One (uploadable project)

## Deploy with Vercel (recommended)
1) Create a new project in **Supabase** → copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Create a public bucket named **media**.
2) In Vercel → New Project → **Import Git Repository** (upload this folder to GitHub first, then import).
3) Add environment variables (see `.env.example`). For now, you can skip Stripe and OpenAI to test.
4) Deploy.

## Local
```bash
npm install
npm run dev
```

Visit `/auth` to sign in (magic link). Go to `/studio` to upload and generate renditions.
