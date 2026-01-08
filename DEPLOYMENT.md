# Deployment Guide

## Pre-Deployment Checklist

✅ All CTA buttons redirect to Contact Us page
✅ Demo page created with agent demos
✅ Contact form with Supabase integration
✅ Floating navbar with rounded edges
✅ All pages are SEO-optimized
✅ Build configuration ready

## Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

For full functionality (contact form), you need:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

See `SUPABASE_SETUP.md` for detailed instructions.

## Deployment Platforms

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables (see above)
4. Deploy automatically

**See `VERCEL_DEPLOYMENT.md` for detailed Vercel deployment instructions.**

### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### Other Platforms
- Ensure Node.js 18+ is available
- Run `npm run build` to create production build
- Serve the `.next` folder

## Contact Form Configuration

The contact form requires Supabase setup:
1. Follow `SUPABASE_SETUP.md` to create database
2. Add environment variables to your hosting platform
3. Run the SQL migration in Supabase dashboard

The form will work without Supabase, but submissions won't be saved.

