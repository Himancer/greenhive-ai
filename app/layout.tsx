
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GreenHive.ai — AI Nursery',
  description: 'A flashy, neon-green plant nursery on the web with an AI assistant.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
