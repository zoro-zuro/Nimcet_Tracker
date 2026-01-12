# NIMCET Prep Tracker - Next.js + Convex Foundation

This is the foundation for migrating the NIMCET Prep Tracker from a single-file HTML app to a modern Next.js + Convex stack.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- Convex CLI (`pnpm install -g convex`)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-repo/nimcet-prep-tracker.git
cd nimcet-prep-tracker
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

### Running the Development Server

```bash
pnpm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Convex** - Backend-as-a-Service with reactive queries

## 🗃️ Project Structure

```
/
├── convex/                  # Convex backend functions and schema
│   ├── schema.ts           # Database schema definition
│   ├── users.ts            # User-related functions
│   ├── stats.ts            # Statistics functions
│   ├── papers.ts           # Paper management functions
│   ├── sessions.ts         # Session management functions
│   ├── answers.ts          # Answer submission functions
│   └── _generated/        # Auto-generated API types
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with Convex provider
│   │   ├── page.tsx        # Health check dashboard
│   │   └── ConvexProvider.tsx # Convex provider setup
│   └── ...
├── public/                 # Static assets
├── .env.example            # Environment variable template
└── package.json            # Project configuration
```

## 🔧 Convex Setup

### Connecting to Convex

1. Install Convex CLI globally:
```bash
pnpm install -g convex
```

2. Run Convex development server:
```bash
pnpm run convex:dev
```

3. Follow the prompts to connect to your Convex deployment

### Convex Commands

- `pnpm run convex:dev` - Start Convex development server
- `pnpm run convex:deploy` - Deploy Convex functions
- `pnpm run convex:codegen` - Generate TypeScript types

## 📊 Database Schema

The Convex database includes these tables:

### Core Tables
- **users** - User profiles and settings
- **papers** - Question papers (previous years, custom)
- **questions** - Individual questions with metadata
- **sessions** - Practice and mock test sessions
- **answers** - User answers with performance data
- **mistakes** - Mistake tracking with spaced repetition

### Analytics Tables
- **topicStats** - Performance by topic
- **dailyStats** - Daily practice statistics
- **mocks** - Mock test results

## 🎯 Task 1/4 Completion

This foundation includes:

✅ **Next.js 15 + TypeScript + Tailwind** - Modern frontend setup
✅ **Convex Schema** - All required tables defined
✅ **Convex Functions** - Basic CRUD operations for core entities
✅ **Minimal UI** - Health check page to verify the stack works
✅ **Project Structure** - Ready for Vercel deployment

## 🚀 Next Steps (Future Tasks)

- **Task 2/4**: Migrate UI components from HTML to React
- **Task 3/4**: Implement Cerebras AI integration
- **Task 4/4**: Add advanced features and polish

## 📝 Notes

- The current health check page uses mock data
- Real Convex integration will be enabled when you connect to a Convex deployment
- All functions are ready to be deployed and will work with the actual Convex backend

## 🔒 Environment Variables

Create a `.env.local` file based on `.env.example`:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CEREBRAS_API_KEY=your_cerebras_api_key
```

## 📄 License

MIT License - Free to use and modify for personal and educational purposes.
