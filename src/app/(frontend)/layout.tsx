import React from 'react'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import Navbar from '@/components/base/navbar'
import Footer from '@/components/base/footer'

export const metadata = {
  title: {
    default: 'Tushar Gaurav - Software Developer & Designer',
    template: '%s | tushgaurav.com',
  },
  description: 'Tushar Gaurav',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
