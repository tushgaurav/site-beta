import React from 'react'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import Navbar from '@/components/base/navbar'
import Footer from '@/components/base/footer'
import { Toaster } from '@/components/ui/sonner'
import ConsoleBranding from './_components/console-branding'

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
      <body className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <Toaster />
          <ConsoleBranding />
        </ThemeProvider>
      </body>
    </html>
  )
}
