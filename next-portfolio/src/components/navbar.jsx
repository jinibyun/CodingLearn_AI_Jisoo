"use client"

import Link from 'next/link'
import { ModeToggle } from '@/components/ui/mode-toggle'

// 네비게이션 컴포넌트

export function Navbar() {
  return (
    <nav className="bg-background text-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className="text-foreground hover:text-muted-foreground transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-foreground hover:text-muted-foreground transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link 
              href="/contactUs" 
              className="text-foreground hover:text-muted-foreground transition-colors duration-200 font-medium"
            >
              Contact Us
            </Link>
            <Link 
              href="/login" 
              className="text-foreground hover:text-muted-foreground transition-colors duration-200 font-medium"
            >
              Login
            </Link>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
