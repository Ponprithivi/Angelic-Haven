"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Clock, MapPin, CheckCircle, AlertCircle } from "lucide-react"

interface AlertRecord {
  id: string
  timestamp: string
  duration: number
  location: { lat: number; lng: number }
  status: "resolved" | "active"
}

export default function HistoryPage() {
  const router = useRouter()
  const [alerts, setAlerts] = useState<AlertRecord[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("safeguard_user")
    if (!userData) {
      router.push("/login")
      return
    }
    
    // Load alert history
    const savedHistory = localStorage.getItem("safeguard_alert_history")
    if (savedHistory) {
      setAlerts(JSON.parse(savedHistory))
    } else {
      // Demo data for display
      setAlerts([
        {
          id: "1",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          duration: 120,
          location: { lat: 28.6139, lng: 77.2090 },
          status: "resolved"
        },
        {
          id: "2",
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          duration: 45,
          location: { lat: 28.6129, lng: 77.2295 },
          status: "resolved"
        }
      ])
    }
  }, [router])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Alert History</h1>
          </div>
          <p className="text-muted-foreground">
            View your past emergency alerts and their details
          </p>
        </div>

        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="bg-card rounded-2xl p-6 border border-border card-soft"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      alert.status === "resolved" 
                        ? "bg-primary/10" 
                        : "bg-destructive/10"
                    }`}>
                      {alert.status === "resolved" ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {formatDate(alert.timestamp)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Duration: {formatDuration(alert.duration)}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    alert.status === "resolved" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {alert.status === "resolved" ? "Resolved" : "Active"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    Location: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No alerts yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Your emergency alert history will appear here when you use the SOS feature
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
