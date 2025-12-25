"use client"

import { useState, useEffect } from "react"
import { videoProcessor, type Video } from "@/lib/video-processor"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Search, Filter, Clock, HardDrive } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"

export default function VideoLibraryPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    // In a real app, this would fetch from an API
    setVideos(videoProcessor.getUserVideos("user-123"))
  }, [])

  const filteredVideos = videos.filter((v) => v.filename.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Video Library</h1>
          <p className="text-muted-foreground text-sm">Manage and stream your processed content.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
              className="pl-9 w-[250px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {selectedVideo ? (
            <div className="space-y-4">
              <VideoPlayer
                videoId={selectedVideo.id}
                filename={selectedVideo.filename}
                sensitivity={selectedVideo.sensitivity}
              />
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedVideo.filename}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedVideo.duration
                        ? `${Math.floor(selectedVideo.duration / 60)}m ${selectedVideo.duration % 60}s`
                        : "N/A"}
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3 h-3" />
                      {(selectedVideo.size / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  </div>
                </div>
                <Badge variant={selectedVideo.sensitivity === "safe" ? "success" : "destructive"}>
                  {selectedVideo.sensitivity?.toUpperCase()}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-muted rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground p-12 text-center">
              <Play className="w-12 h-12 mb-4 opacity-20" />
              <h3 className="font-medium">No Video Selected</h3>
              <p className="text-sm">Select a video from your library to start streaming.</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold px-1">Your Collection</h3>
          <div className="grid gap-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary/20 ${selectedVideo?.id === video.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedVideo(video)}
              >
                <CardContent className="p-3 flex gap-3">
                  <div className="w-24 aspect-video bg-muted rounded flex items-center justify-center overflow-hidden shrink-0">
                    <Play className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{video.filename}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(video.uploadedAt).toLocaleDateString()}
                    </p>
                    <Badge
                      variant={video.status === "safe" ? "success" : "destructive"}
                      className="mt-2 text-[10px] h-4 px-1"
                    >
                      {video.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
