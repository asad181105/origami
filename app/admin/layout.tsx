import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | The Origami AI',
  description: 'Admin dashboard for managing contact form submissions',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

