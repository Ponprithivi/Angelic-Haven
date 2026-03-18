"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Shield, Menu, X, User, Phone, Clock, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Shield },
  { href: "/contacts", label: "Contacts", icon: Phone },
  { href: "/safety-tools", label: "Safety Tools", icon: Wrench },
  { href: "/history", label: "History", icon: Clock },
  { href: "/profile", label: "Profile", icon: User },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isAuthPage = pathname === "/login" || pathname === "/register"
  const isLandingPage = pathname === "/" || pathname === "/about" || pathname === "/contact"

  if (isAuthPage) return null

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SafeGuard</span>
          </Link>

          {/* Desktop Navigation - App Pages */}
          {!isLandingPage && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Landing Page Navigation */}
          {isLandingPage && (
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                Home
              </Link>
              <Link href="/about" className={`text-sm font-medium transition-colors ${pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                About
              </Link>
              <Link href="/contact" className={`text-sm font-medium transition-colors ${pathname === "/contact" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                Contact
              </Link>
              <div className="flex items-center gap-3 ml-4">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="rounded-xl">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-2">
            {isLandingPage ? (
              <>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-colors ${pathname === "/" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-colors ${pathname === "/about" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-colors ${pathname === "/contact" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                >
                  Contact
                </Link>
                <div className="pt-4 flex flex-col gap-2 border-t border-border mt-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full rounded-xl">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                )
              })
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
