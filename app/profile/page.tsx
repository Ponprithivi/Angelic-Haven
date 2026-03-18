"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { User, Phone, MapPin, LogOut, CheckCircle } from "lucide-react"

interface UserData {
  name: string
  phone: string
  place?: string
  isLoggedIn: boolean
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [locationStatus, setLocationStatus] = useState<"active" | "inactive" | "checking">("checking")

  useEffect(() => {
    const userData = localStorage.getItem("safeguard_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationStatus("active"),
        () => setLocationStatus("inactive")
      )
    } else {
      setLocationStatus("inactive")
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("safeguard_user")
    localStorage.removeItem("safeguard_contacts")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-8 border border-border card-soft mb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground">SafeGuard User</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium text-foreground">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Location Status</p>
                <div className="flex items-center gap-2">
                  {locationStatus === "checking" ? (
                    <p className="font-medium text-muted-foreground">Checking...</p>
                  ) : locationStatus === "active" ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <p className="font-medium text-primary">Active</p>
                    </>
                  ) : (
                    <p className="font-medium text-destructive">Inactive</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </main>
    </div>
  )
}
