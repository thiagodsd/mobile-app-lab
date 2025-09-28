# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 project focused on creating an interactive page about probability distributions. The project uses the App Router architecture with TypeScript, Tailwind CSS v4, and is optimized with Turbopack for faster development builds.

## Development Commands

- **Start development server**: `npm run dev` (runs with Turbopack optimization on http://localhost:3000)
- **Build for production**: `npm run build` (builds with Turbopack optimization)
- **Start production server**: `npm start`
- **Lint code**: `npm run lint` (uses ESLint with Next.js TypeScript config)

## Architecture

### Tech Stack
- **Next.js 15.5.4**: React framework with App Router
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5**: Type safety and enhanced developer experience
- **Tailwind CSS v4**: Utility-first CSS framework with PostCSS integration
- **Turbopack**: Fast bundler for development and production builds
- **ESLint**: Code linting with Next.js and TypeScript rules

### Project Structure
- `src/app/`: App Router directory containing pages and layouts
  - `layout.tsx`: Root layout with Geist fonts (Sans and Mono variants)
  - `page.tsx`: Homepage component
  - `globals.css`: Global Tailwind CSS styles
- `next.config.ts`: Next.js configuration (currently minimal)
- `tsconfig.json`: TypeScript configuration with `@/*` path aliases pointing to `src/*`

### Configuration Notes
- **Path Aliases**: `@/*` maps to `./src/*` for cleaner imports
- **Font Setup**: Uses Geist Sans and Geist Mono with CSS variables for consistent typography
- **Styling**: Tailwind CSS v4 with PostCSS integration, includes dark mode support
- **TypeScript**: Strict mode enabled with Next.js plugin integration
- **ESLint**: Configured for Next.js core web vitals and TypeScript best practices

### Environment Setup
The project maintains Firebase configuration files (.env.example, .env.local) for potential backend integration, though the current focus is on the probability distributions interactive page.

## Project Goal
The main objective is to create an interactive educational page about probability distributions, likely involving mathematical visualizations, interactive charts, and educational content to help users understand statistical concepts.