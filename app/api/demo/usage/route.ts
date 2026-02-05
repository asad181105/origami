import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const DEMO_LIMIT_SECONDS = 120

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ secondsUsed: 0, limit: DEMO_LIMIT_SECONDS, canUse: false }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('demo_usage')
    .select('seconds_used')
    .eq('user_id', user.id)
    .single()

  const secondsUsed = data?.seconds_used ?? 0
  const canUse = secondsUsed < DEMO_LIMIT_SECONDS

  return NextResponse.json({
    secondsUsed,
    limit: DEMO_LIMIT_SECONDS,
    remaining: Math.max(0, DEMO_LIMIT_SECONDS - secondsUsed),
    canUse,
  })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const seconds = Math.min(Math.max(0, Number(body.seconds) || 0), 120)

  const { data: existing } = await supabase
    .from('demo_usage')
    .select('seconds_used')
    .eq('user_id', user.id)
    .single()

  const currentSeconds = existing?.seconds_used ?? 0
  const newSeconds = Math.min(currentSeconds + seconds, DEMO_LIMIT_SECONDS)

  const { error } = await supabase
    .from('demo_usage')
    .upsert(
      { user_id: user.id, seconds_used: newSeconds, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    secondsUsed: newSeconds,
    remaining: Math.max(0, DEMO_LIMIT_SECONDS - newSeconds),
    canUse: newSeconds < DEMO_LIMIT_SECONDS,
  })
}
