"use client"
import { type TopicTrend, getDateRange } from "@/lib/ai-agent"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface TrendAnalysisTableProps {
  trends: TopicTrend[]
  targetDate: Date
}

export function TrendAnalysisTable({ trends, targetDate }: TrendAnalysisTableProps) {
  const dates = getDateRange(targetDate)

  return (
    <div className="rounded-md border bg-card">
      <ScrollArea className="w-full whitespace-nowrap">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-card min-w-[200px] z-10 border-r shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                Topic
              </TableHead>
              {dates.map((date) => (
                <TableHead key={date} className="text-center min-w-[80px]">
                  {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {trends.map((trend) => (
              <TableRow key={trend.topic}>
                <TableCell className="sticky left-0 bg-card font-medium border-r shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                  {trend.topic}
                </TableCell>
                {dates.map((date) => {
                  const frequency = trend.dates[date] || 0
                  return (
                    <TableCell
                      key={date}
                      className={`text-center ${frequency > 10 ? "bg-primary/10 font-bold text-primary" : frequency > 5 ? "bg-primary/5 text-primary/80" : ""}`}
                    >
                      {frequency}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
