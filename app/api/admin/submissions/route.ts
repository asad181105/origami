import { NextRequest, NextResponse } from 'next/server'

// Route segment config - force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    // Check for admin password in headers
    const authHeader = request.headers.get('authorization')
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123' // Default password, change in production

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 503 }
      )
    }

    // Create Supabase client
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

    // Fetch all submissions, ordered by most recent first
    const { data, error } = await supabaseClient
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { submissions: data || [] },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

