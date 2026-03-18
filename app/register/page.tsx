"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Shield, User, Phone, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
    emergencyContact1: "",
    emergencyContact2: "",
    emergencyContact3: "",
    latitude: "",
    longitude: ""
  })

  // Auto-detect GPS location
  useEffect(() => {
    if ("geolocation" in navigator) {
      setLocationStatus("loading")
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }))
          setLocationStatus("success")
        },
        () => {
          setLocationStatus("error")
        }
      )
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Store user data
    localStorage.setItem("safeguard_user", JSON.stringify({
      name: formData.name,
      phone: formData.phone,
      place: formData.place,
      emergencyContacts: [
        formData.emergencyContact1,
        formData.emergencyContact2,
        formData.emergencyContact3
      ].filter(Boolean),
      location: {
        latitude: formData.latitude,
        longitude: formData.longitude
      },
      isLoggedIn: true
    }))

    // Also save contacts separately
    const contacts = [
      { name: "Contact 1", phone: formData.emergencyContact1 },
      { name: "Contact 2", phone: formData.emergencyContact2 },
      { name: "Contact 3", phone: formData.emergencyContact3 }
    ].filter(c => c.phone)
    localStorage.setItem("safeguard_contacts", JSON.stringify(contacts))
    
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">SafeGuard</span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="bg-card rounded-2xl p-8 shadow-lg card-soft border border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Set up your safety profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 h-12 rounded-xl bg-background border-border"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 h-12 rounded-xl bg-background border-border"
                  required
                />
              </div>
            </div>

            {/* Place */}
            <div className="space-y-2">
              <Label htmlFor="place" className="text-foreground">Location / City</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="place"
                  type="text"
                  placeholder="Your city"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  className="pl-10 h-12 rounded-xl bg-background border-border"
                />
              </div>
              {/* GPS Status */}
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  locationStatus === "success" ? "bg-primary" : 
                  locationStatus === "loading" ? "bg-primary/50 animate-pulse" : 
                  locationStatus === "error" ? "bg-destructive" : "bg-muted"
                }`} />
                <span className="text-muted-foreground text-xs">
                  {locationStatus === "success" && "GPS location detected"}
                  {locationStatus === "loading" && "Detecting GPS location..."}
                  {locationStatus === "error" && "GPS unavailable"}
                  {locationStatus === "idle" && "GPS detection pending"}
                </span>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <Label className="text-foreground font-semibold">Emergency Contacts</Label>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ec1" className="text-muted-foreground text-sm">Contact 1 (Primary)</Label>
                  <Input
                    id="ec1"
                    type="tel"
                    placeholder="Primary contact phone"
                    value={formData.emergencyContact1}
                    onChange={(e) => setFormData({ ...formData, emergencyContact1: e.target.value })}
                    className="h-11 rounded-xl bg-background border-border"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ec2" className="text-muted-foreground text-sm">Contact 2</Label>
                  <Input
                    id="ec2"
                    type="tel"
                    placeholder="Second contact phone"
                    value={formData.emergencyContact2}
                    onChange={(e) => setFormData({ ...formData, emergencyContact2: e.target.value })}
                    className="h-11 rounded-xl bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ec3" className="text-muted-foreground text-sm">Contact 3</Label>
                  <Input
                    id="ec3"
                    type="tel"
                    placeholder="Third contact phone"
                    value={formData.emergencyContact3}
                    onChange={(e) => setFormData({ ...formData, emergencyContact3: e.target.value })}
                    className="h-11 rounded-xl bg-background border-border"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
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
