"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface VideoPlayerProps {
  videoId: string
  filename: string
  sensitivity?: "safe" | "flagged"
}

export function VideoPlayer({ videoId, filename, sensitivity }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [duration] = useState(180) // Mock duration 3 mins
  const [currentTime, setCurrentTime] = useState(0)

  // Simulation of range request loading
  const [buffered, setBuffered] = useState(0)

  useEffect(() => {
    let interval: any
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
        setProgress((currentTime / duration) * 100)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration])

  // Simulate buffering (HTTP Range Request simulation)
  useEffect(() => {
    const bufferInterval = setInterval(() => {
      setBuffered((prev) => Math.min(prev + 10, 100))
    }, 2000)
    return () => clearInterval(bufferInterval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="group relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
      {/* Sensitivity Overlay for Flagged Content */}
      {sensitivity === "flagged" && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
          <Badge variant="destructive" className="mb-4">
            FLAGGED CONTENT
          </Badge>
          <h3 className="text-xl font-bold text-white mb-2">Restricted Access</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            This video has been flagged for sensitive content and cannot be streamed.
          </p>
        </div>
      )}

      {/* Video Content Simulation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/20 text-6xl font-bold italic select-none">STREAMING...</div>
      </div>

      {/* Custom Controls */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="relative h-1 w-full bg-white/20 rounded-full cursor-pointer">
            <div className="absolute top-0 left-0 h-full bg-white/40 rounded-full" style={{ width: `${buffered}%` }} />
            <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setCurrentTime(0)}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <div className="text-white text-xs font-medium tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Slider
                  className="w-24"
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={(val) => {
                    setVolume(val[0])
                    setIsMuted(val[0] === 0)
                  }}
                />
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
