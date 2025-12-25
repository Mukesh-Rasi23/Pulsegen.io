# Video Upload and Streaming Platform

A modern web application built with Next.js for uploading, processing, and streaming videos with content safety analysis and trend analytics dashboard.

## Features

- **Video Upload**: Secure file upload with progress tracking
- **Video Processing**: Automated content safety analysis and processing
- **Video Streaming**: Efficient HTTP range request-based streaming
- **Analytics Dashboard**: Trend analysis of customer feedback and issues
- **Responsive UI**: Built with Radix UI components and Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI (shadcn/ui)
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mukesh-Rasi23/Pulsegen.io.git
cd video-upload-and-streaming
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality checks

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Analytics dashboard page
│   ├── videos/            # Video management pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries and data
└── public/               # Static assets
```

## Key Components

- **VideoUploadForm**: Handles file uploads with progress tracking
- **VideoProgressList**: Displays processing status of uploaded videos
- **VideoPlayer**: Custom video player with streaming support
- **TrendAnalysisTable**: Data table for trend analysis
- **TrendCharts**: Interactive charts for analytics

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For support or questions, please contact the development team.