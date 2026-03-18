"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { useShakeDetection } from "@/hooks/use-shake-detection"

interface UserData {
  name: string
  phone: string
  isLoggedIn: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [sosActive, setSosActive] = useState(false)
  const [isHolding, setIsHolding] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Load user data
  useEffect(() => {
    const userData = localStorage.getItem("safeguard_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  // Get current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {},
        { enableHighAccuracy: true }
      )
    }
  }, [])

  // Handle hold progress for SOS button
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isHolding && !sosActive) {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            handleSOSActivate()
            return 100
          }
          return prev + 6.67 // ~1.5 seconds to 100
        })
      }, 100)
    } else if (!isHolding) {
      setHoldProgress(0)
    }
    return () => clearInterval(interval)
  }, [isHolding, sosActive])

  const handleSOSActivate = useCallback(() => {
    setSosActive(true)
    setIsHolding(false)
    
    // Send browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("SafeGuard SOS Alert", {
        body: "Emergency alert activated! Contacts notified.",
        icon: "/icon.svg",
        tag: "sos-alert",
        requireInteraction: true
      })
    }

    // Vibrate device
    if ("vibrate" in navigator) {
      navigator.vibrate([500, 200, 500, 200, 500])
    }
  }, [])

  const handleSOSDeactivate = useCallback(() => {
    setSosActive(false)
    setHoldProgress(0)
  }, [])

  // Shake detection - always active in background
  useShakeDetection({
    threshold: 20,
    timeout: 1000,
    enabled: !sosActive,
    onShake: () => {
      handleSOSActivate()
    }
  })

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

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
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Greeting */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Hello, {user.name}
          </h1>
          <p className="text-muted-foreground">Stay Safe</p>
        </div>

        {/* SOS Button - THE ONLY FOCUS */}
        <div className="relative flex items-center justify-center">
          {/* Outer rings for pulse effect */}
          {!sosActive && (
            <>
              <div className="absolute w-72 h-72 rounded-full bg-destructive/5 animate-pulse" />
              <div className="absolute w-60 h-60 rounded-full bg-destructive/10" />
            </>
          )}
          
          {/* Active state rings */}
          {sosActive && (
            <>
              <div className="absolute w-80 h-80 rounded-full bg-destructive/20 animate-ping" style={{ animationDuration: '1.5s' }} />
              <div className="absolute w-72 h-72 rounded-full bg-destructive/30 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute w-64 h-64 rounded-full bg-destructive/40" />
            </>
          )}

          {/* Progress ring during hold */}
          {isHolding && !sosActive && (
            <svg className="absolute w-56 h-56 -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="108"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-destructive/30"
              />
              <circle
                cx="112"
                cy="112"
                r="108"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-destructive"
                strokeDasharray={`${2 * Math.PI * 108}`}
                strokeDashoffset={`${2 * Math.PI * 108 * (1 - holdProgress / 100)}`}
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* Main SOS Button */}
          <button
            onMouseDown={() => !sosActive && setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
            onTouchStart={() => !sosActive && setIsHolding(true)}
            onTouchEnd={() => setIsHolding(false)}
            onClick={() => sosActive && handleSOSDeactivate()}
            className={`relative z-10 w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-300 select-none touch-none ${
              sosActive 
                ? "bg-destructive sos-button-active scale-110" 
                : "bg-destructive hover:bg-destructive/90 sos-button"
            }`}
            style={{
              boxShadow: sosActive 
                ? '0 0 80px rgba(239, 68, 68, 0.8), 0 0 120px rgba(239, 68, 68, 0.5)'
                : '0 0 40px rgba(239, 68, 68, 0.4), 0 0 80px rgba(239, 68, 68, 0.2)'
            }}
          >
            <span className="text-3xl font-bold text-white tracking-wider">
              {sosActive ? "STOP" : "SOS"}
            </span>
            <span className="text-sm text-white/80 mt-2">
              {sosActive ? "Tap to stop" : "Hold to send"}
            </span>
          </button>
        </div>

        {/* Status message */}
        <div className="mt-12 text-center max-w-xs">
          {sosActive ? (
            <div className="space-y-3">
              <p className="text-destructive font-semibold animate-pulse">
                EMERGENCY ALERT ACTIVE
              </p>
              <p className="text-sm text-muted-foreground">
                Your location is being shared with your emergency contacts in real-time
              </p>
              {currentLocation && (
                <p className="text-xs text-muted-foreground">
                  Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Press and hold the SOS button for 1.5 seconds to send an emergency alert
              </p>
              <p className="text-xs text-muted-foreground/70">
                Shake detection is always active in background
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
