# CyberTerminal Pro - Anonymous Security Platform

## Overview

CyberTerminal Pro is a fully anonymous cybersecurity platform that provides complete stealth capabilities for advanced security testing. The application features all major hacking tools from Kali Linux with built-in Tor routing, VPN protection, and complete anonymity features. All tools work without root access and are completely untraceable, routing through multiple proxy chains automatically. The platform includes wireless hacking, network penetration, web application testing, exploitation frameworks, password attacks, and digital forensics tools.

## User Preferences

Preferred communication style: Simple, everyday language.
User specifically requested: Complete anonymous and untraceable platform like Tor browser with all Kali Linux tools working without root access and ability to install additional tools.
Language preference: Hindi/Hinglish communication.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based architecture
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming, including cyberpunk-inspired color scheme
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API with JSON responses
- **Session Management**: In-memory storage for development with structured interfaces for future database integration
- **Command Execution**: Child process spawning for terminal command simulation
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage Design
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Definition**: Centralized schema in `/shared/schema.ts` with Zod validation
- **Database Tables**:
  - Users: Authentication and user management
  - Sessions: Terminal session tracking with metadata
  - Commands: Command history with execution details
  - Tutorials: Educational content with step-by-step instructions
  - Tool Categories: Organized security tool classification
- **Development Storage**: In-memory implementation with sample data for rapid development
- **Migration System**: Drizzle Kit for database schema migrations

### Authentication & Authorization
- **Session-based**: Traditional session management with user identification
- **Demo Mode**: Hardcoded demo user for development and testing
- **Security Context**: User sessions track command execution and tool usage

### Component Architecture
- **Terminal Interface**: Real-time command input/output simulation
- **Educational Panel**: Interactive tutorials with progress tracking
- **Sidebar Navigation**: Tool categories and session management
- **Modal System**: Disclaimer and educational content overlays
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Development Tools
- **Type Safety**: Shared types between frontend and backend
- **Code Generation**: Automatic API client generation from OpenAPI specs
- **Development Server**: Hot module replacement with Vite
- **Error Tracking**: Runtime error overlay for development
- **Path Aliases**: Simplified import paths with TypeScript path mapping

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL for production deployment
- **Drizzle ORM**: Type-safe database operations and query building
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI & Frontend Libraries
- **Radix UI**: Accessible, unstyled component primitives
- **Lucide React**: Consistent icon library
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form validation and management
- **Wouter**: Lightweight routing solution
- **date-fns**: Date manipulation utilities

### Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundling for production
- **PostCSS**: CSS processing with Autoprefixer

### Runtime Dependencies
- **Express.js**: Web application framework
- **Zod**: Runtime type validation and parsing
- **tsx**: TypeScript execution for development
- **nanoid**: Unique ID generation
- **clsx**: Conditional CSS class composition

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling integration
- **Replit-specific**: Banner and development environment detection