import type { Review } from "./ai-agent"

// Sample review texts for mock data generation
const SAMPLE_TEXTS = [
  "The food was cold and the delivery was late.",
  "Great service, but the app crashed once.",
  "I want a feature to track the driver in real-time.",
  "The delivery partner was very rude today.",
  "Prices are too high compared to other apps.",
  "Excellent food quality, but delivery took an hour.",
  "The app is very slow and hard to use.",
  "Not fresh at all, very disappointed.",
  "The rider misbehaved with my security guard.",
  "Please add more payment options like crypto.",
]

export function generateMockReviews(count: number): Review[] {
  const reviews: Review[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    reviews.push({
      id: `rev-${i}`,
      date: date.toISOString(),
      text: SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)],
      rating: Math.floor(Math.random() * 5) + 1,
    })
  }

  return reviews
}
