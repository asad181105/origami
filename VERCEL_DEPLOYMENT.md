# Vercel Deployment Guide

This guide will help you deploy The Origami AI website to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- A Supabase project (for contact form functionality)

## Step 1: Prepare Your Repository

1. Make sure all your code is committed to a Git repository
2. Push your code to GitHub (if not already done)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and configure the project
5. Click **"Deploy"**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 3: Configure Environment Variables

**Important:** Add these BEFORE your first deployment for best results!

1. In the Vercel project setup page, scroll to **"Environment Variables"**
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ebemvyipoovemrvsitbw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_MslmEAj6uC6OZUFhnuK4tg_K7YXYxXU
ADMIN_PASSWORD=your_secure_password_here
```

3. Select **all environments** (Production, Preview, Development) for each variable
4. Click **"Add"** after each variable

**Note:** If you already deployed, add these in **Settings** → **Environment Variables** and redeploy.

## Step 4: Set Up Supabase Database

1. Follow the instructions in `SUPABASE_SETUP.md` to:
   - Create a Supabase project
   - Run the database migration
   - Get your API keys

2. Add the Supabase credentials to Vercel environment variables (Step 3)

## Step 5: Verify Deployment

1. Visit your deployed site (Vercel will provide a URL)
2. Test the contact form at `/contact`
3. Check that all pages load correctly
4. Verify the demo page at `/demo`

## Build Configuration

Vercel automatically detects Next.js projects and uses these settings:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

## Custom Domain (Optional)

1. Go to **Settings** → **Domains** in your Vercel project
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. SSL certificates are automatically provisioned

## Environment Variables Reference

| Variable | Description | Required | Value |
|----------|-------------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes | `https://ebemvyipoovemrvsitbw.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes | `sb_publishable_MslmEAj6uC6OZUFhnuK4tg_K7YXYxXU` |
| `ADMIN_PASSWORD` | Password for admin dashboard | Yes | Your secure password |

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node.js 18.x by default)
- Check build logs in Vercel dashboard for specific errors

### Contact Form Not Working

- Verify environment variables are set correctly in Vercel
- Check that Supabase database migration has been run
- Review browser console and Vercel function logs for errors

### Images Not Loading

- Ensure images are in the `public` folder
- Check image paths are correct (should start with `/`)
- Verify Next.js Image component is used correctly

## Continuous Deployment

Vercel automatically deploys:
- Every push to the `main` branch → Production deployment
- Every push to other branches → Preview deployment

## Performance Optimization

Vercel automatically optimizes:
- ✅ Image optimization
- ✅ Automatic HTTPS
- ✅ Edge Network (CDN)
- ✅ Serverless Functions
- ✅ Automatic code splitting

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)

