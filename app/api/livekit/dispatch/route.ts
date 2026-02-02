import { NextRequest, NextResponse } from 'next/server'
import { AgentDispatchClient } from 'livekit-server-sdk'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

function livekitHttpHostFromWsUrl(wsUrl: string) {
  // wss://xxx.livekit.cloud -> https://xxx.livekit.cloud
  if (wsUrl.startsWith('wss://')) return `https://${wsUrl.slice('wss://'.length)}`
  if (wsUrl.startsWith('ws://')) return `http://${wsUrl.slice('ws://'.length)}`
  return wsUrl
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const roomName = typeof body?.roomName === 'string' ? body.roomName : 'voice-demo'
    const agentName = typeof body?.agentName === 'string' ? body.agentName : 'Casey-615'

    const apiKey = process.env.LIVEKIT_API_KEY
    const apiSecret = process.env.LIVEKIT_API_SECRET
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

    if (!apiKey || !apiSecret || !wsUrl) {
      return NextResponse.json(
        { error: 'LiveKit not configured. Please set NEXT_PUBLIC_LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET.' },
        { status: 500 }
      )
    }

    const host = livekitHttpHostFromWsUrl(wsUrl)
    const dispatch = new AgentDispatchClient(host, apiKey, apiSecret)

    const created = await dispatch.createDispatch(roomName, agentName, {
      metadata: JSON.stringify({ source: 'web-demo' }),
    })

    return NextResponse.json({ ok: true, dispatch: created })
  } catch (error) {
    console.error('LiveKit dispatch error:', error)
    return NextResponse.json({ error: 'Failed to dispatch agent' }, { status: 500 })
  }
}


