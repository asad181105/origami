# Supabase Setup Guide

This guide will help you set up Supabase for the contact form submissions.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `origamiai` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose the closest region to your users
5. Click "Create new project"

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 3: Set Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 4: Run the Database Migration

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/migrations/001_create_contact_submissions.sql`
4. Click "Run" to execute the migration

Alternatively, you can use the Supabase CLI:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Step 5: Verify the Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the `contact_submissions` table
3. The table should have the following columns:
   - `id` (UUID, primary key)
   - `name` (text)
   - `designation` (text)
   - `company` (text)
   - `email` (text)
   - `requirement` (text)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check the `contact_submissions` table in Supabase to verify the data was saved

## Troubleshooting

### Form submissions are failing

1. Check that your environment variables are set correctly
2. Verify the table exists in Supabase
3. Check the browser console and server logs for errors
4. Ensure Row Level Security (RLS) policies are set up correctly

### Environment variables not working

1. Make sure `.env.local` is in the root directory
2. Restart your development server after adding/changing environment variables
3. In Next.js, environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser

### Database connection issues

1. Verify your Supabase project is active (not paused)
2. Check that your API keys are correct
3. Ensure your IP is not blocked by Supabase firewall rules

## Security Notes

- The `anon` key is safe to use in client-side code as RLS policies protect your data
- The insert policy allows anyone to submit forms, which is appropriate for a contact form
- If you need to view submissions, you can either:
  - Use the Supabase dashboard
  - Create an admin panel with authenticated access
  - Set up email notifications for new submissions

## Next Steps

- Consider setting up email notifications for new form submissions
- Add rate limiting to prevent spam
- Create an admin dashboard to view submissions
- Add form validation on the backend (already implemented)

