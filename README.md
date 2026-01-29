# Next.js Learn Project

An event management and discovery platform built with Next.js, featuring interactive 3D graphics, animations, and a MongoDB backend. The application allows users to explore events, create new events, manage bookings, and authenticate with a login system.

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router and TypeScript 5
- **Frontend**: React 19.2.3 with React DOM 19.2.3
- **Styling**: Tailwind CSS 4 with PostCSS for utility-first CSS
- **3D Graphics**: Three.js 0.167.1, @react-three/fiber 9.3.0, @react-three/drei 10.7.4 for WebGL rendering
- **Graphics Library**: OGL 1.0.11 for optimized graphics
- **UI Components**: Lucide React 0.563.0 for icons
- **Database**: MongoDB for event and booking data persistence
- **Utilities**: clsx and tailwind-merge for class name management, class-variance-authority for component variants
- **Code Quality**: ESLint 9 for linting
- **Development**: Babel plugin for React compiler optimization

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd next-js-learn
```

2. Install dependencies:
```bash
bun install
```

### Running Locally

Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

Build the project:
```bash
bun run build
```

Start the production server:
```bash
bun start
```

### Other Commands

- Linting: `bun run lint`

## Project Structure

- `app/` - Next.js application directory with pages and routes
- `components/` - Reusable React components including 3D graphics
- `lib/` - Utility functions and helpers
- `public/` - Static assets (icons, images)

## Features

- Event Management: Create, browse, and explore events with detailed event pages
- User Authentication: Login system for user management
- 3D Animations: Interactive particle effects and beam animations powered by Three.js
- Responsive Design: Mobile-friendly UI with Tailwind CSS
- Event Booking System: Book events with persistent data storage in MongoDB
- API Routes: RESTful API endpoints for event and booking management
- Dynamic Routing: Individual event pages with slug-based routing
- Contact System: Contact page for user inquiries
