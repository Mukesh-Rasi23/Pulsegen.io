"use client"

import { useState, useEffect } from "react"
import { generateMockReviews } from "@/lib/mock-data"
import { generateTrendReport, type TopicTrend } from "@/lib/ai-agent"
import { TrendAnalysisTable } from "@/components/trend-analysis-table"
import { TrendCharts } from "@/components/trend-charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, AlertTriangle, MessageSquare, ThumbsUp } from "lucide-react"

export default function DashboardPage() {
  const [trends, setTrends] = useState<TopicTrend[]>([])
  const [targetDate] = useState(new Date())
  const [stats, setStats] = useState({
    totalReviews: 0,
    topIssue: { topic: "N/A", count: 0 },
    positiveCount: 0,
    issuesCount: 0,
  })

  useEffect(() => {
    // Simulate fetching and processing data
    const reviews = generateMockReviews(342)
    const report = generateTrendReport(reviews, targetDate)
    setTrends(report)

    const topIssue = report.reduce((max, trend) => (trend.total > max.total ? trend : max), { topic: "N/A", total: 0 })

    const issuesCount = report
      .filter((t) => t.topic.toLowerCase().includes("issue") || t.topic.toLowerCase().includes("concern"))
      .reduce((sum, t) => sum + t.total, 0)

    setStats({
      totalReviews: reviews.length,
      topIssue: { topic: topIssue.topic, count: topIssue.total },
      positiveCount: Math.floor(reviews.length * 0.35),
      issuesCount,
    })
  }, [targetDate])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Trend Analysis Dashboard</h1>
        <p className="text-muted-foreground">
          Visualizing customer feedback, issues, and requests from the last 30 days.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReviews}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Issue</CardTitle>
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.topIssue.topic}</div>
            <p className="text-xs text-muted-foreground">Frequency: {stats.topIssue.count}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
            <ThumbsUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.positiveCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.positiveCount / stats.totalReviews) * 100)}% of total reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Reported</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.issuesCount}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chart">Trend Chart</TabsTrigger>
          <TabsTrigger value="table">Data Table</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="space-y-4">
          <TrendCharts trends={trends} targetDate={targetDate} />
        </TabsContent>
        <TabsContent value="table" className="space-y-4">
          <TrendAnalysisTable trends={trends} targetDate={targetDate} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
