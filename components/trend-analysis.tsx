"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { analyzeReviews, type TrendData } from "@/lib/ai-agent"

export function TrendAnalysis() {
  const [data, setData] = useState<TrendData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const results = await analyzeReviews([], new Date("2024-06-30"))
      setData(results)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <div>Analyzing trends...</div>

  const dates = Object.keys(data[0]?.dailyFrequencies || {}).sort()

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Trend Analysis Report (T to T-30)</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-background z-10">Topic</TableHead>
              {dates.map((date) => (
                <TableHead key={date} className="min-w-[80px]">
                  {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.topic}>
                <TableCell className="font-medium sticky left-0 bg-background z-10 whitespace-nowrap">
                  {item.topic}
                </TableCell>
                {dates.map((date) => (
                  <TableCell key={date} className="text-center">
                    {item.dailyFrequencies[date]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
