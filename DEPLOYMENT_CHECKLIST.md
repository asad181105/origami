# Vercel Deployment Checklist

Use this checklist to ensure your deployment is successful.

## Pre-Deployment

- [ ] All code is committed to Git
- [ ] Code is pushed to GitHub repository
- [ ] All dependencies are in `package.json`
- [ ] No TypeScript errors (run `npm run build` locally if possible)
- [ ] All environment variables are documented

## Vercel Setup

- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Build settings verified (auto-detected for Next.js)
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Supabase Setup

- [ ] Supabase project created
- [ ] Database migration run (`supabase/migrations/001_create_contact_submissions.sql`)
- [ ] Row Level Security (RLS) policies configured
- [ ] API keys obtained and added to Vercel

## Post-Deployment Testing

- [ ] Homepage loads correctly
- [ ] Navigation works (all links)
- [ ] Demo page (`/demo`) loads and displays correctly
- [ ] Contact page (`/contact`) loads
- [ ] Contact form submits successfully
- [ ] Form data appears in Supabase dashboard
- [ ] All images load correctly
- [ ] Mobile responsive design works
- [ ] No console errors in browser

## Performance

- [ ] Page load times are acceptable
- [ ] Images are optimized
- [ ] No broken links
- [ ] SEO metadata is correct

## Security

- [ ] Environment variables are set (not hardcoded)
- [ ] `.env.local` is in `.gitignore`
- [ ] Supabase RLS policies are active
- [ ] No sensitive data exposed in client-side code

## Documentation

- [ ] Team members know how to deploy updates
- [ ] Environment variables are documented
- [ ] Deployment process is documented

## Troubleshooting

If deployment fails:

1. Check Vercel build logs for errors
2. Verify all environment variables are set
3. Ensure Supabase project is active (not paused)
4. Check that database migration has been run
5. Verify Node.js version compatibility

## Quick Commands

```bash
# Local build test
npm run build

# Check for linting errors
npm run lint

# Start local server
npm run dev
```

