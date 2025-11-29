import type { Metadata } from 'next'
import '@/app/(frontend)/globals.css'

export const metadata: Metadata = {
  title: 'WP Admin',
  description: 'WP Admin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
