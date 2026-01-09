# Fixing Vercel Build Error - Dynamic Server Usage

## Error
```
Route /api/admin/submissions couldn't be rendered statically because it used `request.headers`
```

## Solution Applied

Both API routes now have explicit route segment configuration:

```typescript
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0
```

## Next Steps

### 1. Commit and Push Changes

```bash
git add .
git commit -m "Fix: Add dynamic route segment config for API routes"
git push
```

### 2. Clear Vercel Build Cache (if error persists)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **General**
3. Scroll to **"Clear Build Cache"**
4. Click **"Clear"**
5. Trigger a new deployment

### 3. Alternative: Force Redeploy

1. In Vercel dashboard, go to **Deployments**
2. Click the **"..."** menu on the latest deployment
3. Select **"Redeploy"**
4. Check **"Use existing Build Cache"** = OFF
5. Click **"Redeploy"**

### 4. Verify Fix

After redeployment:
- Check build logs for any errors
- Test the admin dashboard at `/admin`
- Test the contact form at `/contact`

## Why This Happens

Next.js 13+ tries to statically optimize API routes at build time. When routes use dynamic features like:
- `request.headers`
- `request.json()`
- Environment variables accessed at runtime

They must be explicitly marked as dynamic with route segment config.

## Files Updated

- ✅ `app/api/admin/submissions/route.ts`
- ✅ `app/api/contact/route.ts`

Both now have:
- `export const dynamic = 'force-dynamic'` - Forces dynamic rendering
- `export const runtime = 'nodejs'` - Explicitly sets Node.js runtime
- `export const revalidate = 0` - Disables caching

