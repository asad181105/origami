'use client'

import { useState, useEffect, useCallback } from 'react'

type DemoUsageState = {
  secondsUsed: number
  remaining: number
  canUse: boolean
  loading: boolean
  error: string | null
}

export function useDemoUsage(enabled: boolean) {
  const [state, setState] = useState<DemoUsageState>({
    secondsUsed: 0,
    remaining: 120,
    canUse: false,
    loading: true,
    error: null,
  })

  const fetchUsage = useCallback(async () => {
    const res = await fetch('/api/demo/usage')
    const data = await res.json()
    if (!res.ok) {
      setState((s) => ({ ...s, canUse: false, loading: false }))
      return
    }
    setState({
      secondsUsed: data.secondsUsed ?? 0,
      remaining: data.remaining ?? 0,
      canUse: data.canUse ?? false,
      loading: false,
      error: null,
    })
  }, [])

  useEffect(() => {
    if (!enabled) {
      setState((s) => ({ ...s, loading: false, canUse: false }))
      return
    }
    fetchUsage()
  }, [enabled, fetchUsage])

  const recordUsage = useCallback(async (seconds: number) => {
    const res = await fetch('/api/demo/usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seconds }),
    })
    const data = await res.json()
    if (res.ok) {
      setState({
        secondsUsed: data.secondsUsed ?? 0,
        remaining: data.remaining ?? 0,
        canUse: data.canUse ?? false,
        loading: false,
        error: null,
      })
      return data.canUse
    }
    return false
  }, [])

  return { ...state, refresh: fetchUsage, recordUsage }
}
