# Supabase Connection Setup

Your Supabase project is already configured with the following credentials:

## Credentials

- **URL**: `https://ebemvyipoovemrvsitbw.supabase.co`
- **Anon Key**: `sb_publishable_MslmEAj6uC6OZUFhnuK4tg_K7YXYxXU`

## Step 1: Set Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ebemvyipoovemrvsitbw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_MslmEAj6uC6OZUFhnuK4tg_K7YXYxXU
ADMIN_PASSWORD=your_secure_password_here
```

**Important:** 
- Change `ADMIN_PASSWORD` to a strong password for the admin dashboard
- Never commit `.env.local` to version control (it's already in `.gitignore`)

## Step 2: Run Database Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Click **"New Query"**
5. Copy and paste the contents of `supabase/migrations/001_create_contact_submissions.sql`
6. Click **"Run"** to execute the migration

The migration will:
- Create the `contact_submissions` table with all required fields (name, designation, company, email, phone, requirement)
- Set up indexes for performance
- Configure Row Level Security (RLS) policies
- Create triggers for automatic timestamp updates

## Step 3: Verify Table Creation

1. Go to **Table Editor** in Supabase dashboard
2. You should see the `contact_submissions` table
3. Verify it has these columns:
   - `id` (UUID, primary key)
   - `name` (text)
   - `designation` (text)
   - `company` (text)
   - `email` (text)
   - `phone` (text, nullable)
   - `requirement` (text)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

## Step 4: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/contact` and submit a test form
3. Check the `contact_submissions` table in Supabase to verify the data was saved
4. Navigate to `/admin` and login with your admin password
5. Verify you can see the submission in the dashboard

## Admin Dashboard

- **URL**: `/admin`
- **Default Password**: Set via `ADMIN_PASSWORD` environment variable
- **Features**:
  - View all contact form submissions
  - See statistics (total, monthly, with phone)
  - Filter and search submissions
  - Export data (coming soon)

## Security Notes

- The admin password is stored in environment variables
- Admin authentication uses Bearer token in request headers
- The admin dashboard is not indexed by search engines
- Consider using a strong, unique password for production

## Troubleshooting

### Form submissions not saving

1. Check that environment variables are set correctly
2. Verify the table exists in Supabase
3. Check browser console and server logs for errors
4. Ensure RLS policies are configured correctly

### Admin dashboard not loading

1. Verify `ADMIN_PASSWORD` is set in `.env.local`
2. Restart your development server after adding environment variables
3. Check that the API route is accessible

### Database connection errors

1. Verify your Supabase project is active (not paused)
2. Check that API keys are correct
3. Ensure your IP is not blocked by Supabase firewall rules

