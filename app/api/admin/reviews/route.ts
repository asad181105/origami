import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET - Fetch all reviews (admin only)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const adminPassword = process.env.ADMIN_PASSWORD

    const devFallbackPassword =
      process.env.NODE_ENV === 'development' ? (adminPassword || '123456789') : adminPassword

    if (!devFallbackPassword || !authHeader || authHeader !== `Bearer ${devFallbackPassword}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 503 })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

    const { data, error } = await supabaseClient
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }

    return NextResponse.json({ reviews: data || [] }, { status: 200 })
  } catch (err) {
    console.error('Admin reviews API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
