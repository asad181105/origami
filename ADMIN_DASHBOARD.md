# Admin Dashboard Documentation

## Overview

The admin dashboard allows you to view and manage all contact form submissions from a single interface.

## Features

✅ **Password Protection**: Secure login with environment variable password
✅ **View All Submissions**: See all contact form submissions in one place
✅ **Statistics**: View total submissions, monthly count, and submissions with phone numbers
✅ **Detailed Information**: View name, designation, company, email, phone, and requirements
✅ **Responsive Design**: Works on desktop, tablet, and mobile
✅ **Auto-refresh**: Refresh button to get latest submissions
✅ **Session Management**: Login persists during browser session

## Access

- **URL**: `/admin`
- **Password**: Set via `ADMIN_PASSWORD` environment variable
- **Default**: `admin123` (change this in production!)

## Setup

1. Add `ADMIN_PASSWORD` to your `.env.local`:
   ```env
   ADMIN_PASSWORD=your_secure_password_here
   ```

2. Restart your development server

3. Navigate to `/admin` and login

## Security

- Password is stored in environment variables (never in code)
- Authentication is handled server-side via API route
- Admin dashboard is not indexed by search engines
- Session-based authentication (cleared on browser close)

## API Endpoint

The dashboard uses the `/api/admin/submissions` endpoint which:
- Requires Bearer token authentication
- Returns all submissions ordered by date (newest first)
- Handles errors gracefully

## Future Enhancements

Potential features to add:
- Export submissions to CSV/Excel
- Search and filter functionality
- Mark submissions as read/unread
- Delete submissions
- Email notifications for new submissions
- Pagination for large datasets

## Troubleshooting

### Can't login to admin dashboard

1. Check that `ADMIN_PASSWORD` is set in `.env.local`
2. Restart your development server
3. Clear browser session storage and try again
4. Check browser console for errors

### Submissions not showing

1. Verify Supabase connection is working
2. Check that database migration has been run
3. Verify RLS policies are configured correctly
4. Check browser console and server logs for errors

### API errors

1. Verify environment variables are set correctly
2. Check that Supabase project is active
3. Verify API keys are correct
4. Check server logs for detailed error messages

