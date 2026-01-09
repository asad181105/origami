# Quick Start Guide

Get your Supabase connection and admin dashboard up and running in minutes.

## 1. Create Environment File

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ebemvyipoovemrvsitbw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_MslmEAj6uC6OZUFhnuK4tg_K7YXYxXU
ADMIN_PASSWORD=admin123
```

**⚠️ Change `ADMIN_PASSWORD` to a secure password!**

## 2. Run Database Migration

### Option A: Via Supabase Dashboard (Recommended)

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** → **New Query**
4. Open `supabase/migrations/001_create_contact_submissions.sql`
5. Copy all contents and paste into SQL Editor
6. Click **Run**

### Option B: Via Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (get project ref from dashboard URL)
supabase link --project-ref ebemvyipoovemrvsitbw

# Run migrations
supabase db push
```

## 3. Start Development Server

```bash
npm run dev
```

## 4. Test Everything

1. **Contact Form**: Go to http://localhost:3000/contact and submit a test form
2. **Admin Dashboard**: Go to http://localhost:3000/admin and login with your password
3. **Verify Data**: Check that your submission appears in the admin dashboard

## URLs

- **Home**: http://localhost:3000
- **Contact Form**: http://localhost:3000/contact
- **Demo Page**: http://localhost:3000/demo
- **Admin Dashboard**: http://localhost:3000/admin

## For Vercel Deployment

Add these environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_PASSWORD`

See `VERCEL_DEPLOYMENT.md` for full deployment instructions.

