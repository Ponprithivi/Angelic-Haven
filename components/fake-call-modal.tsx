"use client"

import { useState, useEffect } from "react"
import { Phone, PhoneOff, User } from "lucide-react"

interface FakeCallModalProps {
  isOpen: boolean
  onClose: () => void
  callerName?: string
}

export function FakeCallModal({ isOpen, onClose, callerName = "Mom" }: FakeCallModalProps) {
  const [callStatus, setCallStatus] = useState<"ringing" | "connected" | "ended">("ringing")
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      setCallStatus("ringing")
      setDuration(0)
      return
    }

    // Simulate ringtone vibration pattern
    if (callStatus === "ringing" && "vibrate" in navigator) {
      const pattern = [500, 200, 500, 200, 500]
      navigator.vibrate(pattern)
    }

    return () => {
      if ("vibrate" in navigator) {
        navigator.vibrate(0)
      }
    }
  }, [isOpen, callStatus])

  useEffect(() => {
    if (callStatus !== "connected") return
    
    const interval = setInterval(() => {
      setDuration(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [callStatus])

  const handleAnswer = () => {
    setCallStatus("connected")
    if ("vibrate" in navigator) {
      navigator.vibrate(0)
    }
  }

  const handleDecline = () => {
    setCallStatus("ended")
    if ("vibrate" in navigator) {
      navigator.vibrate(0)
    }
    setTimeout(onClose, 500)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-between p-8">
      {/* Top Section - Caller Info */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <User className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{callerName}</h2>
        <p className="text-muted-foreground">
          {callStatus === "ringing" && "Incoming call..."}
          {callStatus === "connected" && formatDuration(duration)}
          {callStatus === "ended" && "Call ended"}
        </p>
      </div>

      {/* Bottom Section - Call Controls */}
      <div className="w-full max-w-xs">
        {callStatus === "ringing" ? (
          <div className="flex items-center justify-between">
            {/* Decline Button */}
            <button
              onClick={handleDecline}
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              <PhoneOff className="h-8 w-8 text-white" />
            </button>

            {/* Answer Button */}
            <button
              onClick={handleAnswer}
              className="w-16 h-16 rounded-full bg-success flex items-center justify-center shadow-lg shadow-success/25 hover:bg-success/90 transition-colors animate-pulse"
            >
              <Phone className="h-8 w-8 text-white" />
            </button>
          </div>
        ) : callStatus === "connected" ? (
          <button
            onClick={handleDecline}
            className="w-full py-4 rounded-full bg-primary flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
          >
            <PhoneOff className="h-6 w-6 text-white" />
            <span className="text-white font-medium">End Call</span>
          </button>
        ) : null}
      </div>

      {/* Swipe hint for ringing */}
      {callStatus === "ringing" && (
        <p className="mt-8 text-sm text-muted-foreground text-center">
          Tap to answer or decline
        </p>
      )}
    </div>
  )
}
