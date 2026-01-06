# Deployment Guide

## Pre-Deployment Checklist

✅ All CTA buttons redirect to WhatsApp (wa.me/8247579990)
✅ WhatsApp integration configured
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

No environment variables required for basic deployment.

## Deployment Platforms

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### Other Platforms
- Ensure Node.js 18+ is available
- Run `npm run build` to create production build
- Serve the `.next` folder

## WhatsApp Configuration

WhatsApp number is configured in `lib/constants.ts`:
- Number: 8247579990
- URL: https://wa.me/8247579990

To change the WhatsApp number, update `lib/constants.ts`.

