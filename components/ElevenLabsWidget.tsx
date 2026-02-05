'use client'

import Script from 'next/script'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ElevenLabsContext = createContext<{ openWidget: () => void } | null>(null)

export function useElevenLabs() {
  return useContext(ElevenLabsContext)
}

function hidePoweredByBranding() {
  const widget = document.querySelector('elevenlabs-convai')
  if (!widget?.shadowRoot) return
  const walk = (root: DocumentFragment | Element) => {
    root.querySelectorAll?.('*').forEach((el) => {
      const text = (el.textContent || '').trim().toLowerCase()
      if (text.includes('powered by') && text.includes('elevenlabs')) {
        ;(el as HTMLElement).style.display = 'none'
      }
      if (el.shadowRoot) walk(el.shadowRoot)
    })
  }
  walk(widget.shadowRoot)
}

export default function ElevenLabsWidget({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    hidePoweredByBranding()
    const id = setInterval(hidePoweredByBranding, 500)
    return () => clearInterval(id)
  }, [isOpen])

  const triggerWidget = useCallback((): boolean => {
    const widget = document.querySelector('elevenlabs-convai') as HTMLElement & {
      startConversation?: () => void
      startCall?: () => void
      open?: () => void
      shadowRoot?: ShadowRoot
    }

    if (!widget) return false

    // Try explicit API methods first
    if (typeof widget.startConversation === 'function') {
      widget.startConversation()
      return true
    }
    if (typeof widget.startCall === 'function') {
      widget.startCall()
      return true
    }
    if (typeof widget.open === 'function') {
      widget.open()
      return true
    }

    // Try clicking the widget's internal trigger (shadow DOM)
    const tryClick = (root: Document | ShadowRoot | Element): HTMLElement | null => {
      const buttons = root.querySelectorAll?.('button, [role="button"], [data-action], [data-testid="start-button"]')
      for (const el of Array.from(buttons || [])) {
        if (el instanceof HTMLElement) return el
      }
      return null
    }
    const btn = widget.shadowRoot ? tryClick(widget.shadowRoot) : tryClick(widget)
    if (btn) {
      btn.click()
      return true
    }

    // Last resort: click the widget element
    widget.click()
    return false
  }, [])

  const handleOpen = useCallback(() => {
    // Always show widget first – it needs dimensions to render
    setIsOpen(true)
    // Try triggering after widget has time to mount
    setTimeout(() => triggerWidget(), 150)
    setTimeout(() => triggerWidget(), 500)
    setTimeout(() => triggerWidget(), 1000)
  }, [triggerWidget])

  const value = useCallback(() => handleOpen(), [handleOpen])

  return (
    <ElevenLabsContext.Provider value={{ openWidget: value }}>
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
      />
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: isOpen ? 450 : 0,
          height: isOpen ? 700 : 0,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 9998,
          overflow: 'hidden',
          transition: 'opacity 0.2s ease',
        }}
      >
        <elevenlabs-convai agent-id="agent_7101k9qbx354f5yvph9m1pypzxc0" />
      </div>
      {children}
    </>
    </ElevenLabsContext.Provider>
  )
}
