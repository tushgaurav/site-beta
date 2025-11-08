'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimatedThemeToggler } from '../animated-theme-toggle'
import { ModeToggle } from '../theme-toggle'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="flex justify-between items-center p-4 py-4 max-w-7xl mx-auto">
        <Link href="/" className="z-50">
          <Image
            src="/tushar-sign.png"
            alt="Tushar Gaurav"
            width={150}
            height={50}
            className="hidden dark:block h-8 transition-all duration-300 hover:drop-shadow-[0_0_12px_white] hover:brightness-110"
          />
          <Image
            src="/tushar-sign-light.jpg"
            alt="Tushar Gaurav"
            width={150}
            height={40}
            className="dark:hidden h-8 transition-all duration-300 hover:drop-shadow-[0_0_12px_white] hover:brightness-110"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm items-center">
          <Link href="/voice" className="hover:text-primary transition-colors">
            Voice
          </Link>
          <Link href="/archive" className="hover:text-primary transition-colors">
            Archive
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
          <div className="ml-2 mt-1">
            <AnimatedThemeToggler />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="flex flex-col p-4 space-y-4 text-sm">
            <Link
              href="/archive"
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Archive
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
