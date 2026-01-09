# Deploy to Vercel - Step by Step Guide

Follow these steps to deploy your Origami AI website to Vercel.

## Prerequisites Checklist

- [ ] Code is committed to Git
- [ ] Code is pushed to GitHub repository
- [ ] Supabase database migration has been run (see Step 4)

## Step 1: Push Code to GitHub

If you haven't already:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Create a repository on GitHub, then push
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

## Step 2: Sign Up / Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or **"Log In"** if you have an account)
3. Sign up with GitHub (recommended) for easy integration

## Step 3: Import Your Project

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Select your GitHub repository
4. Vercel will auto-detect Next.js settings
5. **Don't click Deploy yet!** We need to add environment variables first

## Step 4: Run Supabase Database Migration

**Important:** Do this before deploying!

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**
5. Open `supabase/migrations/001_create_contact_submissions.sql` from your project
6. Copy **ALL** the contents
7. Paste into the SQL Editor
8. Click **"Run"** (or press Ctrl+Enter)
9. You should see "Success. No rows returned"

## Step 5: Add Environment Variables in Vercel

Before deploying, add these environment variables:

1. In Vercel project setup page, scroll down to **"Environment Variables"**
2. Add each variable one by one:

### Variable 1:
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://ebemvyipoovemrvsitbw.supabase.co`
- **Environment**: Select all (Production, Preview, Development)

### Variable 2:
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `sb_publishable_MslmEAj6uC6OZUFhnuK4tg_K7YXYxXU`
- **Environment**: Select all (Production, Preview, Development)

### Variable 3:
- **Key**: `ADMIN_PASSWORD`
- **Value**: `your_secure_password_here` (change this to a strong password!)
- **Environment**: Select all (Production, Preview, Development)

3. Click **"Add"** after each variable
4. Make sure all three are added

## Step 6: Deploy!

1. Scroll to the bottom of the Vercel setup page
2. Click **"Deploy"**
3. Wait 2-3 minutes for the build to complete
4. You'll see a success message with your deployment URL

## Step 7: Verify Deployment

1. Visit your deployment URL (e.g., `https://your-project.vercel.app`)
2. Test the homepage loads correctly
3. Test the contact form at `/contact`
4. Test the demo page at `/demo`
5. Test admin dashboard at `/admin` (use your ADMIN_PASSWORD)

## Step 8: Set Up Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Enter your domain name
4. Follow Vercel's DNS instructions
5. SSL certificate is automatically provisioned

## Environment Variables Summary

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ebemvyipoovemrvsitbw.supabase.co` | Supabase connection |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_MslmEAj6uC6OZUFhnuK4tg_K7YXYxXU` | Supabase API key |
| `ADMIN_PASSWORD` | Your secure password | Admin dashboard access |

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Make sure there are no TypeScript errors locally:
   ```bash
   npm run build
   ```

### Contact Form Not Working

1. Verify environment variables are set correctly
2. Check that Supabase migration was run (Step 4)
3. Check Vercel function logs: **Deployments** → Click deployment → **Functions** tab
4. Test Supabase connection in browser console

### Admin Dashboard Not Working

1. Verify `ADMIN_PASSWORD` is set in Vercel
2. Check that you're using the correct password
3. Clear browser cache and try again

### Database Connection Errors

1. Verify Supabase project is active (not paused)
2. Check that API keys are correct
3. Ensure RLS policies are set up (from migration)

## Quick Commands (Vercel CLI Alternative)

If you prefer using CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (follow prompts)
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add ADMIN_PASSWORD

# Deploy to production
vercel --prod
```

## Continuous Deployment

Once set up, Vercel automatically deploys:
- **Every push to `main` branch** → Production deployment
- **Every push to other branches** → Preview deployment with unique URL

## Next Steps After Deployment

1. ✅ Test all pages work correctly
2. ✅ Submit a test contact form
3. ✅ Verify data appears in Supabase
4. ✅ Test admin dashboard login
5. ✅ Set up custom domain (if needed)
6. ✅ Configure analytics (optional)

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

**Your site will be live at:** `https://your-project-name.vercel.app`

