"use client"
import { type TopicTrend, getDateRange } from "@/lib/ai-agent"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TrendChartsProps {
  trends: TopicTrend[]
  targetDate: Date
}

export function TrendCharts({ trends, targetDate }: TrendChartsProps) {
  const dates = getDateRange(targetDate)

  // Transform data for Recharts
  const chartData = dates.map((date) => {
    const entry: any = {
      name: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }
    trends.slice(0, 5).forEach((trend) => {
      entry[trend.topic] = trend.dates[date] || 0
    })
    return entry
  })

  const colors = [
    "var(--primary)",
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Topic Trends (Top 5)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend />
              {trends.slice(0, 5).map((trend, index) => (
                <Line
                  key={trend.topic}
                  type="monotone"
                  dataKey={trend.topic}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
