# Next.js Learn Project

A modern web application built with Next.js showcasing interactive 3D graphics and animations.

## Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript 5
- **React**: React 19.2.3 with React DOM 19.2.3
- **Styling**: Tailwind CSS 4 with PostCSS
- **3D Graphics**: Three.js 0.167.1, @react-three/fiber 9.3.0, @react-three/drei 10.7.4
- **Graphics Library**: OGL 1.0.11
- **UI Components**: Lucide React 0.563.0
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Linting**: ESLint 9
- **Development Tools**: Babel plugin for React compiler

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

- Interactive 3D visualizations using Three.js
- Responsive design with Tailwind CSS
- Event card components
- Particle effects and beam animations
- Navigation bar
- About page
- API routes support
