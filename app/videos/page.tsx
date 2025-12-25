"use client"

import { useState } from "react"
import { VideoUploadForm } from "@/components/video-upload-form"
import { VideoProgressList } from "@/components/video-progress-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoPlayer } from "@/components/video-player"
import { videoProcessor } from "@/lib/video-processor"

export default function VideosPage() {
  const [userId] = useState("user-123")
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const activeVideo = activeVideoId ? videoProcessor.getVideo(activeVideoId) : null

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Video Management</h1>
        <p className="text-muted-foreground">Upload and process your videos for content safety.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <VideoUploadForm userId={userId} onUploadStart={() => setRefreshKey((prev) => prev + 1)} />
        </div>
        <div className="md:col-span-2">
          <VideoProgressList key={refreshKey} userId={userId} onPlay={(id) => setActiveVideoId(id)} />
        </div>
      </div>

      {activeVideo && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Video Player</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <VideoPlayer
              videoId={activeVideo.id}
              filename={activeVideo.filename}
              sensitivity={activeVideo.sensitivity}
            />
            <p className="mt-4 text-sm text-muted-foreground italic">
              HTTP range requests simulated for efficient streaming
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
