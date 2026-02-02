import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Voice Agent Demo | The Origami AI',
  description: 'Try our AI voice agent in a live phone call demo',
}

export default function VoiceDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

