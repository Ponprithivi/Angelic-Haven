"use client"

import { useEffect, useRef, useCallback } from "react"

interface UseShakeDetectionOptions {
  threshold?: number
  timeout?: number
  onShake: () => void
  enabled?: boolean
}

export function useShakeDetection({
  threshold = 15,
  timeout = 1000,
  onShake,
  enabled = true
}: UseShakeDetectionOptions) {
  const lastX = useRef<number | null>(null)
  const lastY = useRef<number | null>(null)
  const lastZ = useRef<number | null>(null)
  const lastTime = useRef<number>(0)
  const shakeCount = useRef(0)
  const shakeTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    if (!enabled) return
    
    const acceleration = event.accelerationIncludingGravity
    if (!acceleration) return

    const { x, y, z } = acceleration
    if (x === null || y === null || z === null) return

    const currentTime = Date.now()
    
    if (lastX.current !== null && lastY.current !== null && lastZ.current !== null) {
      const deltaX = Math.abs(x - lastX.current)
      const deltaY = Math.abs(y - lastY.current)
      const deltaZ = Math.abs(z - lastZ.current)
      
      const totalDelta = deltaX + deltaY + deltaZ

      if (totalDelta > threshold) {
        shakeCount.current++
        
        // Reset shake count after timeout
        if (shakeTimeout.current) {
          clearTimeout(shakeTimeout.current)
        }
        
        shakeTimeout.current = setTimeout(() => {
          shakeCount.current = 0
        }, timeout)

        // Trigger shake callback after 3 rapid shakes
        if (shakeCount.current >= 3) {
          shakeCount.current = 0
          onShake()
        }
      }
    }

    lastX.current = x
    lastY.current = y
    lastZ.current = z
    lastTime.current = currentTime
  }, [enabled, threshold, timeout, onShake])

  useEffect(() => {
    if (!enabled) return

    // Check if device motion is available
    if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", handleMotion)
      
      return () => {
        window.removeEventListener("devicemotion", handleMotion)
        if (shakeTimeout.current) {
          clearTimeout(shakeTimeout.current)
        }
      }
    }
  }, [enabled, handleMotion])
}
