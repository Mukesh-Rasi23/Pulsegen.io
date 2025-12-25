"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, FileVideo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { videoProcessor } from "@/lib/video-processor"

interface VideoUploadFormProps {
  userId: string
  onUploadStart: (videoId: string) => void
}

export function VideoUploadForm({ userId, onUploadStart }: VideoUploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setIsUploading(true)
    try {
      const videoId = await videoProcessor.uploadVideo(file, userId)
      onUploadStart(videoId)
      setFile(null)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Video</CardTitle>
        <CardDescription>Upload videos for content sensitivity analysis and streaming.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!file ? (
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors border-muted-foreground/25">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">MP4, MOV, or AVI (Max 500MB)</p>
              </div>
              <input type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded">
                <FileVideo className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                <span className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={isUploading}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        <Button className="w-full" onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? "Uploading..." : "Start Processing"}
        </Button>
      </CardContent>
    </Card>
  )
}
