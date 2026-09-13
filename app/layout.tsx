import type { Metadata } from 'next'
import { Lato, Spectral } from 'next/font/google'
import './globals.css'
import 'intl-tel-input/styles'

const lato = Lato({ weight: ['100','300','400','700'], subsets: ['latin'] })
const spectral = Spectral({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-spectral',
})
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
      <body className={`${lato.className} ${spectral.variable}`}>{children}</body>
    </html>
  )
}
