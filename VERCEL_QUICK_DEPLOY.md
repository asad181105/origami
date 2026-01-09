# Quick Vercel Deployment (5 Minutes)

## 🚀 Fast Track Deployment

### 1. Push to GitHub (if not done)
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. **Add Environment Variables** (before deploying):
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://ebemvyipoovemrvsitbw.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_MslmEAj6uC6OZUFhnuK4tg_K7YXYxXU`
   - `ADMIN_PASSWORD` = `your_password_here`
4. Click **Deploy**

### 3. Run Database Migration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. SQL Editor → New Query
3. Copy/paste from `supabase/migrations/001_create_contact_submissions.sql`
4. Click **Run**

### 4. Test

- Visit your Vercel URL
- Test `/contact` form
- Test `/admin` dashboard

**Done!** 🎉

For detailed instructions, see `DEPLOY_VERCEL.md`

