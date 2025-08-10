import type { Metadata } from 'next'
import { Inter, Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({ weight: ['100','300','400','700'], subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Lotus Med Innovation LLC',
  description: 'Lotus Med Innovation is a boutique investment firm focused on healthcare innovation and entrepreneurship.',
  authors: [{ name: 'Kamel (KamsNyc)' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  )
}
