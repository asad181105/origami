import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// POST - Submit a review (requires auth)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Please sign in to submit a review' }, { status: 401 })
    }

    const body = await request.json()
    const { rating, review_text, user_name } = body

    // Validate
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }
    if (!review_text || review_text.trim().length < 10) {
      return NextResponse.json({ error: 'Review must be at least 10 characters' }, { status: 400 })
    }

    const { error: insertError } = await supabase.from('reviews').insert({
      user_id: user.id,
      user_email: user.email,
      user_name: user_name || user.user_metadata?.full_name || 'Anonymous',
      rating: Number(rating),
      review_text: review_text.trim(),
    })

    if (insertError) {
      console.error('Review insert error:', insertError)
      return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Review API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
