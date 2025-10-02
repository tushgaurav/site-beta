import React from 'react'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import Navbar from '@/components/base/navbar'

export const metadata = {
  description: 'Tushar Gaurav',
  title: 'Tushar Gaurav',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
