// Video processing and content moderation simulation
export interface Video {
  id: string
  filename: string
  userId: string
  status: "uploading" | "processing" | "safe" | "flagged"
  progress: number
  uploadedAt: Date
  processedAt?: Date
  sensitivity?: "safe" | "flagged"
  duration?: number
  size?: number
}

// In-memory storage for videos (simulating a database)
const videoStore: Map<string, Video> = new Map()

class VideoProcessor {
  private processingQueue: Set<string> = new Set()

  // Simulate video upload
  async uploadVideo(file: File, userId: string): Promise<string> {
    const videoId = `vid-${Date.now()}-${Math.random().toString(36).substring(7)}`

    const video: Video = {
      id: videoId,
      filename: file.name,
      userId,
      status: "uploading",
      progress: 0,
      uploadedAt: new Date(),
      duration: Math.floor(Math.random() * 300) + 60, // 1-5 minutes
      size: file.size,
    }

    videoStore.set(videoId, video)

    // Simulate upload progress
    this.simulateUpload(videoId)

    return videoId
  }

  private simulateUpload(videoId: string) {
    const interval = setInterval(() => {
      const video = videoStore.get(videoId)
      if (!video) {
        clearInterval(interval)
        return
      }

      if (video.status === "uploading") {
        video.progress += Math.random() * 15

        if (video.progress >= 100) {
          video.progress = 100
          video.status = "processing"
          clearInterval(interval)
          // Start content moderation after upload completes
          this.simulateProcessing(videoId)
        }
      }
    }, 500)
  }

  private simulateProcessing(videoId: string) {
    const video = videoStore.get(videoId)
    if (!video) return

    // Simulate AI content moderation (random outcome for demo)
    setTimeout(
      () => {
        const video = videoStore.get(videoId)
        if (!video) return

        // 80% chance safe, 20% chance flagged
        const isSafe = Math.random() > 0.2

        video.status = isSafe ? "safe" : "flagged"
        video.sensitivity = isSafe ? "safe" : "flagged"
        video.processedAt = new Date()
        video.progress = 100
      },
      3000 + Math.random() * 2000,
    ) // 3-5 seconds processing time
  }

  // Get all videos for a user
  getUserVideos(userId: string): Video[] {
    return Array.from(videoStore.values())
      .filter((v) => v.userId === userId)
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
  }

  // Get a single video
  getVideo(videoId: string): Video | undefined {
    return videoStore.get(videoId)
  }

  // Simulate HTTP range request for video streaming
  getVideoStream(
    videoId: string,
    start?: number,
    end?: number,
  ): {
    chunk: string
    totalSize: number
    range: { start: number; end: number }
  } {
    const video = videoStore.get(videoId)
    if (!video || video.status !== "safe") {
      throw new Error("Video not available for streaming")
    }

    // Simulate video file size (in bytes)
    const totalSize = 50 * 1024 * 1024 // 50MB mock size

    // Default range if not specified
    const rangeStart = start ?? 0
    const rangeEnd = end ?? Math.min(rangeStart + 1024 * 1024, totalSize - 1) // 1MB chunks

    return {
      chunk: `[Simulated video data chunk: ${rangeStart}-${rangeEnd}]`,
      totalSize,
      range: { start: rangeStart, end: rangeEnd },
    }
  }
}

// Export singleton instance
export const videoProcessor = new VideoProcessor()
