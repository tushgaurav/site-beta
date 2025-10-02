import React from 'react'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
