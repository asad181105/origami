import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Demos | The Origami AI',
  description: 'Explore our collection of AI agent demos including voice bots, chat bots, CRM management, and more.',
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

