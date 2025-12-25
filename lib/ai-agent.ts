// AI Agent for topic extraction and trend analysis
export interface Review {
  id: string
  date: string
  text: string
  rating: number
}

export interface TopicTrend {
  topic: string
  dates: { [date: string]: number }
  total: number
}

// Seed topics for categorization
const SEED_TOPICS = [
  "Delivery issue",
  "Food quality",
  "Delivery partner behavior",
  "App performance",
  "Feature request",
  "Pricing concern",
]

// Simple keyword matching for topic extraction (minimal approach)
const TOPIC_KEYWORDS: { [topic: string]: string[] } = {
  "Delivery issue": ["late", "delay", "not delivered", "delivery time", "waiting", "didn't arrive"],
  "Food quality": ["stale", "cold", "spoiled", "bad quality", "not fresh", "taste"],
  "Delivery partner behavior": ["rude", "impolite", "misbehave", "unprofessional", "attitude"],
  "App performance": ["crash", "slow", "not working", "bug", "error", "freeze", "loading"],
  "Feature request": ["add", "bring back", "should have", "need", "want", "missing"],
  "Pricing concern": ["expensive", "costly", "price", "charges", "fee", "refund"],
}

// Categorize a review into topics
export function categorizeReview(reviewText: string): string[] {
  const text = reviewText.toLowerCase()
  const topics: string[] = []

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        topics.push(topic)
        break
      }
    }
  }

  return topics.length > 0 ? topics : ["Other"]
}

// Generate trend analysis report for last 30 days
export function generateTrendReport(reviews: Review[], targetDate: Date): TopicTrend[] {
  const trends: { [topic: string]: { [date: string]: number } } = {}

  // Initialize all seed topics
  SEED_TOPICS.forEach((topic) => {
    trends[topic] = {}
  })

  // Calculate date range (T-30 to T)
  const endDate = new Date(targetDate)
  const startDate = new Date(targetDate)
  startDate.setDate(startDate.getDate() - 30)

  // Process each review
  reviews.forEach((review) => {
    const reviewDate = new Date(review.date)
    if (reviewDate >= startDate && reviewDate <= endDate) {
      const dateKey = reviewDate.toISOString().split("T")[0]
      const topics = categorizeReview(review.text)

      topics.forEach((topic) => {
        if (!trends[topic]) {
          trends[topic] = {}
        }
        trends[topic][dateKey] = (trends[topic][dateKey] || 0) + 1
      })
    }
  })

  // Convert to array format
  return Object.entries(trends)
    .map(([topic, dates]) => ({
      topic,
      dates,
      total: Object.values(dates).reduce((sum, count) => sum + count, 0),
    }))
    .sort((a, b) => b.total - a.total)
}

// Get date range for last 30 days
export function getDateRange(targetDate: Date): string[] {
  const dates: string[] = []
  const endDate = new Date(targetDate)
  const startDate = new Date(targetDate)
  startDate.setDate(startDate.getDate() - 30)

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d).toISOString().split("T")[0])
  }

  return dates
}

// Analyze reviews to generate trend report
export function analyzeReviews(reviews: Review[], targetDate: Date) {
  return generateTrendReport(reviews, targetDate)
}
