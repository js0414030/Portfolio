# Project Overview

This is a modern full-stack portfolio website for Alex Johnson, a full-stack developer. The application showcases skills, projects, and provides a contact form for potential clients or employers to reach out.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: MongoDB with Mongoose ODM
- **Database Provider**: MongoDB Atlas or any MongoDB instance
- **Development**: In-memory storage fallback for development

### Key Components

#### Database Schema
- **Users Collection**: Basic user authentication structure (_id, username, password, createdAt)
- **Contacts Collection**: Contact form submissions (_id, name, email, subject, message, createdAt)

#### API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Retrieve all contact submissions (admin functionality)
- `GET /api/resume` - Download resume file

#### Frontend Pages & Sections
- **Home Page**: Single-page application with multiple sections
  - Hero Section: Introduction with profile photo and call-to-action
  - About Section: Personal story and skills showcase with progress bars
  - Projects Section: Portfolio of featured projects with technologies used
  - Contact Section: Contact form and social media links
  - Navigation: Smooth scrolling navigation with mobile responsiveness

#### UI Features
- Dark/light theme toggle with system preference detection
- Responsive design for mobile and desktop
- Smooth scrolling navigation
- Form validation with real-time feedback
- Toast notifications for user actions
- Loading states and error handling

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form in Contact Section
   - Form data validated using Zod schema on client-side
   - Data submitted to `/api/contact` endpoint
   - Server validates data again and stores in database
   - Success/error feedback provided via toast notifications

2. **Theme Management**:
   - Theme preference stored in localStorage
   - Theme context provider manages state across components
   - CSS variables update dynamically based on theme selection

3. **Navigation**:
   - Smooth scrolling implemented with custom scroll handlers
   - Active section detection based on scroll position
   - Mobile menu toggle for responsive navigation

## External Dependencies

### Core Dependencies
- **mongoose**: MongoDB object document mapper (ODM) for Node.js
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **react-hook-form**: Form handling and validation

### UI Libraries
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **react-icons**: Additional icon sets

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database**: MongoDB connection established automatically on startup

### Environment Configuration
- **Development**: Uses in-memory storage and Vite dev server
- **Production**: Connects to MongoDB database via MONGODB_URI or DATABASE_URL
- **Database**: Requires MONGODB_URI or DATABASE_URL environment variable for MongoDB connection

### File Structure
- `client/`: Frontend React application
- `server/`: Backend Express.js application
- `shared/`: Shared TypeScript types and schemas
- `migrations/`: Database migration files

### Key Features for Production
- Server-side rendering setup with Vite in development
- Static file serving for production builds
- Error handling middleware for API routes
- Request logging for API endpoints
- Database connection pooling via Neon serverless driver

The application is designed to be deployed on platforms like Replit, Vercel, or similar services that support full-stack Node.js applications with PostgreSQL databases.