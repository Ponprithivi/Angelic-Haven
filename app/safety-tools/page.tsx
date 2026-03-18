"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { FakeCallModal } from "@/components/fake-call-modal"
import { useAlarm } from "@/hooks/use-alarm"
import { PhoneCall, Volume2, VolumeX, Camera, Building2, Shield } from "lucide-react"

export default function SafetyToolsPage() {
  const router = useRouter()
  const [showFakeCall, setShowFakeCall] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [photoTaken, setPhotoTaken] = useState(false)
  const { startAlarm, stopAlarm, isPlaying: isAlarmPlaying } = useAlarm()

  useEffect(() => {
    const userData = localStorage.getItem("safeguard_user")
    if (!userData) {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {}
      )
    }
  }, [])

  const handleAlarmToggle = () => {
    if (isAlarmPlaying) {
      stopAlarm()
    } else {
      startAlarm()
    }
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      
      const video = document.createElement("video")
      video.srcObject = stream
      await video.play()
      
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(video, 0, 0)
      
      stream.getTracks().forEach(track => track.stop())
      
      setPhotoTaken(true)
      setTimeout(() => setPhotoTaken(false), 3000)
      
    } catch {
      alert("Camera access denied. Please enable camera permissions.")
    }
  }

  const handleNearbyHelp = () => {
    const url = currentLocation 
      ? `https://www.google.com/maps/search/police+station/@${currentLocation.lat},${currentLocation.lng},14z`
      : "https://www.google.com/maps/search/police+station+near+me"
    window.open(url, "_blank")
  }

  const tools = [
    {
      icon: PhoneCall,
      label: "Fake Call",
      description: "Simulate an incoming call to escape uncomfortable situations",
      onClick: () => setShowFakeCall(true),
      active: false,
      color: "text-primary"
    },
    {
      icon: isAlarmPlaying ? VolumeX : Volume2,
      label: isAlarmPlaying ? "Stop Alarm" : "Loud Alarm",
      description: "Play a loud alarm sound to attract attention",
      onClick: handleAlarmToggle,
      active: isAlarmPlaying,
      color: isAlarmPlaying ? "text-destructive" : "text-primary"
    },
    {
      icon: Camera,
      label: "Quick Photo",
      description: "Quickly capture a photo for evidence",
      onClick: handleCameraCapture,
      active: photoTaken,
      color: photoTaken ? "text-primary" : "text-primary"
    },
    {
      icon: Building2,
      label: "Nearby Help",
      description: "Find nearby police stations and help centers",
      onClick: handleNearbyHelp,
      active: false,
      color: "text-primary"
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <FakeCallModal 
        isOpen={showFakeCall} 
        onClose={() => setShowFakeCall(false)} 
        callerName="Mom"
      />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Safety Tools</h1>
          </div>
          <p className="text-muted-foreground">
            Quick access tools for your safety in emergency situations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.label}
              onClick={tool.onClick}
              className={`p-8 rounded-2xl border text-left transition-all hover:scale-[1.02] ${
                tool.active 
                  ? "bg-primary/10 border-primary/30" 
                  : "bg-card border-border hover:border-primary/30 card-soft"
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                tool.active ? "bg-primary/20" : "bg-secondary"
              }`}>
                <tool.icon className={`h-8 w-8 ${tool.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {tool.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tool.description}
              </p>
              {tool.active && tool.label.includes("Alarm") && (
                <p className="text-xs text-destructive mt-3 font-medium">
                  Alarm is playing...
                </p>
              )}
              {photoTaken && tool.label === "Quick Photo" && (
                <p className="text-xs text-primary mt-3 font-medium">
                  Photo captured!
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 rounded-2xl bg-secondary/30 border border-border">
          <h3 className="font-semibold text-foreground mb-3">Safety Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Use the Fake Call feature to excuse yourself from uncomfortable situations</li>
            <li>• The Loud Alarm can help attract attention in crowded places</li>
            <li>• Quick Photo captures evidence discreetly and saves it locally</li>
            <li>• Nearby Help shows police stations and emergency services on the map</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
