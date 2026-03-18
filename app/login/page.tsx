"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    localStorage.setItem("safeguard_user", JSON.stringify({ 
      name: formData.name, 
      phone: formData.phone,
      isLoggedIn: true
    }))
    
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">SafeGuard</span>
          </Link>
        </div>
        
        {/* Login Card */}
        <div className="bg-card rounded-2xl p-8 shadow-lg card-soft border border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your safety dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 h-12 rounded-xl bg-background border-border"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 h-12 rounded-xl bg-background border-border"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-base font-medium"
            >
              {isLoading ? "Signing in..." : "Continue"}
            </Button>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
        
        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
