# Deploy Origami AI to Vercel

This guide walks you through deploying the Origami AI site to Vercel and verifying everything works.

---

## Agent vs frontend: two separate deployments

| What | Where to deploy | Purpose |
|------|-----------------|---------|
| **Frontend (Next.js)** | Vercel | Website, contact form, admin, `/demo` pages, LiveKit token/dispatch APIs |
| **LiveKit agent (Python)** | Railway, Render, Fly.io, etc. | Voice “Casey” bot – connects to LiveKit and handles real-time voice (STT/LLM/TTS) |

**Flow:** User opens `/demo/voice` → frontend (Vercel) issues token and dispatches agent → **agent** (separate host) joins the LiveKit room and handles the call.

- **Frontend only:** Contact form, admin, and the rest of the site work. Voice demo page loads but calls won’t connect until the agent is deployed.
- **Agent only:** Not useful alone – it needs the frontend to create rooms and dispatch it.
- **Both deployed:** Full voice demo works.

**Agent deployment:** See [livekit-agent/README.md](./livekit-agent/README.md) for step-by-step instructions to deploy the Python agent to Railway, Render, or Fly.io.

---

## Prerequisites

- [ ] **Git** – code in a Git repo
- [ ] **GitHub** – repo pushed to GitHub (Vercel deploys from Git)
- [ ] **Supabase** – project created; you’ll run the DB migration before deploy
- [ ] **Node.js 18+** – for local `npm run build` checks

---

## 1. Prepare your repo

```bash
git init
git add .
git commit -m "Prepare for Vercel deployment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## 2. Run the Supabase migration

Do this **before** deploying so the contact form and admin work.

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Go to **SQL Editor** → **New query**.
3. Copy the full contents of `supabase/migrations/001_create_contact_submissions.sql`.
4. Paste into the editor and **Run**.
5. Confirm you see something like “Success. No rows returned.”

---

## 3. Deploy on Vercel

### 3.1 Import the project

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub recommended).
2. **Add New…** → **Project**.
3. **Import** your GitHub repo.
4. Vercel will detect Next.js. Keep the default **Framework Preset** and **Root Directory**.
5. **Do not deploy yet** – add environment variables first.

### 3.2 Environment variables

In the project setup, open **Environment Variables**. Add these:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL (e.g. `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key from Project Settings → API |
| `ADMIN_PASSWORD` | Yes | Strong password for `/admin` (Bearer token in request) |
| `NEXT_PUBLIC_LIVEKIT_URL` | No | LiveKit WebSocket URL (e.g. `wss://xxx.livekit.cloud`) – only for voice demo |
| `LIVEKIT_API_KEY` | No | LiveKit API key – only for voice demo |
| `LIVEKIT_API_SECRET` | No | LiveKit API secret – only for voice demo |

- **Required:** Contact form and admin dashboard need Supabase + `ADMIN_PASSWORD`.
- **Optional:** Voice demo at `/demo/voice` needs all three LiveKit variables.

Apply variables to **Production**, **Preview**, and **Development** (or as you prefer).

### 3.3 Deploy

1. Click **Deploy**.
2. Wait for the build to finish (usually 2–4 minutes).
3. Open your deployment URL (e.g. `https://your-project.vercel.app`).

---

## 4. Verify the deployment

- [ ] Homepage loads.
- [ ] **Contact** (`/contact`) – submit the form; check Supabase **Table Editor** for the new row.
- [ ] **Admin** (`/admin`) – log in with `ADMIN_PASSWORD`; you should see submissions.
- [ ] **Demo** (`/demo`) and **Voice demo** (`/demo/voice`) – only fully work if LiveKit env vars are set.

### 4.1 Frontend vs agent: two deployments

The **voice demo** (`/demo/voice`) uses two pieces that deploy separately:

| What | Where it runs | Deploy |
|------|----------------|--------|
| **Frontend** (Next.js site + token/dispatch APIs) | Vercel | This guide (steps 1–4) |
| **LiveKit agent** (Python, “Casey” voice) | Railway, Render, Fly.io, etc. | [`livekit-agent/README.md`](./livekit-agent/README.md) |

- **Frontend only:** Contact form, admin, and the rest of the site work. The voice demo page loads, but calls won’t connect because no agent joins the room.
- **Frontend + agent:** Set LiveKit env vars on Vercel, deploy the agent to a Python host, and ensure both use the same LiveKit project. The voice demo then works end‑to‑end.

See **`livekit-agent/README.md`** for agent setup, env vars, and minimal deploy steps (Railway, Render, Fly.io).

---

## 5. Optional: custom domain

1. Vercel project → **Settings** → **Domains**.
2. Add your domain and follow the DNS instructions.
3. Vercel provisions SSL automatically.

---

## 6. Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Add env vars:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add ADMIN_PASSWORD
# Optional, for voice demo:
vercel env add NEXT_PUBLIC_LIVEKIT_URL
vercel env add LIVEKIT_API_KEY
vercel env add LIVEKIT_API_SECRET
```

Production deploy:

```bash
vercel --prod
```

---

## 7. Local env (reference)

Use `.env.example` as a template. Copy to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Never commit `.env.local`. Required for contact + admin:  
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ADMIN_PASSWORD`.

---

## 8. Troubleshooting

### Build fails

- Run `npm run build` locally and fix TypeScript or build errors.
- In Vercel: **Deployments** → failing deployment → **Building** tab for logs.
- Clear build cache: **Settings** → **General** → **Clear Build Cache**, then redeploy.

### Contact form returns 503

- Supabase env vars set correctly in Vercel.
- Migration was run (see step 2).
- Supabase project is not paused.

### Admin returns 401

- `ADMIN_PASSWORD` is set in Vercel.
- The frontend sends `Authorization: Bearer <ADMIN_PASSWORD>`; ensure it uses the same value.

### Voice demo not working

- All three LiveKit env vars are set in Vercel.
- LiveKit project and agent are configured (see `LIVEKIT_SETUP.md`).

### Changes not visible after deploy

- Confirm the correct branch is deployed (e.g. `main`).
- Check **Deployments** for the latest build; redeploy if needed.

---

## 9. Continuous deployment

- **Production:** typically deploys on push to `main` (or your default branch).
- **Preview:** each push to other branches (or PRs) gets a unique preview URL.

Configure this under **Settings** → **Git** in your Vercel project.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Push code to GitHub |
| 2 | Run Supabase migration |
| 3 | Import repo in Vercel, add env vars, then deploy |
| 4 | Verify homepage, contact, admin (and voice demo if configured) |
| 5 | Optionally add a custom domain |

For more detail:

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- `LIVEKIT_SETUP.md` – Voice demo / LiveKit setup
