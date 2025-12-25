"use client"

import { useState, useEffect } from "react"
import { videoProcessor, type Video } from "@/lib/video-processor"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Loader2, PlayCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface VideoProgressListProps {
  userId: string
  onPlay?: (videoId: string) => void
}

export function VideoProgressList({ userId, onPlay }: VideoProgressListProps) {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    // Initial load
    setVideos(videoProcessor.getUserVideos(userId))

    // Simple polling for mock real-time updates (since we're client-side only)
    const interval = setInterval(() => {
      setVideos(videoProcessor.getUserVideos(userId))
    }, 1000)

    return () => clearInterval(interval)
  }, [userId])

  const getStatusIcon = (status: Video["status"]) => {
    switch (status) {
      case "safe":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      case "flagged":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "processing":
      case "uploading":
        return <Loader2 className="w-4 h-4 animate-spin text-primary" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {videos.length === 0 ? (
          <p className="text-sm text-center text-muted-foreground py-8">No videos uploaded yet.</p>
        ) : (
          <div className="grid gap-4">
            {videos.map((video) => (
              <div key={video.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(video.status)}
                    <span className="text-sm font-medium truncate max-w-[150px]">{video.filename}</span>
                  </div>
                  <Badge
                    variant={
                      video.status === "safe" ? "success" : video.status === "flagged" ? "destructive" : "outline"
                    }
                  >
                    {video.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{video.status === "processing" ? "Analyzing content..." : "Upload progress"}</span>
                    <span>{Math.round(video.progress)}%</span>
                  </div>
                  <Progress value={video.progress} className="h-2" />
                </div>

                {video.status === "safe" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 bg-transparent"
                    onClick={() => onPlay?.(video.id)}
                  >
                    <PlayCircle className="w-4 h-4" />
                    Stream Video
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
