import type { Metadata } from 'next'
import '@/app/(frontend)/globals.css'

export const metadata: Metadata = {
  title: 'Tushar Gaurav - Resume',
  description: 'The professional resume and career summary of Tushar Gaurav',
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
