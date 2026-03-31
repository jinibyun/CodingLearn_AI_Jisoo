"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { supabase } from '@/lib/supabase'

// 네비게이션 컴포넌트

export function Navbar() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function getInitialSession() {
      const { data, error } = await supabase.auth.getSession()
      if (!error) {
        setUser(data.session?.user ?? null)
      }
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

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
              href="/dashboard" 
              className="text-foreground hover:text-muted-foreground transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {!user ? (
              <Link
                href="/login"
                className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                로그인
              </Link>
            ) : (
              <>
                <Link
                  href="/forms"
                  className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  프로필 폼
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  로그아웃
                </button>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
