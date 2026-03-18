"use client"

import { useRef, useCallback, useState } from "react"

export function useAlarm() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const startAlarm = useCallback(() => {
    if (isPlaying) return

    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return

      audioContextRef.current = new AudioContextClass()
      const ctx = audioContextRef.current

      // Create oscillator for alarm tone
      oscillatorRef.current = ctx.createOscillator()
      gainNodeRef.current = ctx.createGain()

      const oscillator = oscillatorRef.current
      const gainNode = gainNodeRef.current

      // Connect nodes
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Set up alarm sound (alternating frequencies)
      oscillator.type = "square"
      oscillator.frequency.setValueAtTime(800, ctx.currentTime)

      // Create alternating frequency pattern
      const duration = 0.3
      for (let i = 0; i < 100; i++) {
        const time = ctx.currentTime + i * duration
        oscillator.frequency.setValueAtTime(i % 2 === 0 ? 800 : 600, time)
      }

      // Set volume
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime)

      // Start the oscillator
      oscillator.start()
      setIsPlaying(true)

      // Also trigger vibration if available
      if ("vibrate" in navigator) {
        // Create a long vibration pattern
        const pattern = Array(20).fill([500, 200]).flat()
        navigator.vibrate(pattern)
      }

    } catch (error) {
      console.error("Failed to start alarm:", error)
    }
  }, [isPlaying])

  const stopAlarm = useCallback(() => {
    if (!isPlaying) return

    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
        oscillatorRef.current = null
      }

      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect()
        gainNodeRef.current = null
      }

      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }

      // Stop vibration
      if ("vibrate" in navigator) {
        navigator.vibrate(0)
      }

      setIsPlaying(false)
    } catch (error) {
      console.error("Failed to stop alarm:", error)
    }
  }, [isPlaying])

  return { startAlarm, stopAlarm, isPlaying }
}
