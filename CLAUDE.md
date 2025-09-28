# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React web application built with Create React App, despite being named "mobile-app-lab" in the directory and README. The project appears to be a restaurant menu showcase with Spanish/Portuguese content, featuring step-by-step dining experiences with pricing and imagery.

## Development Commands

- **Start development server**: `npm start` (runs on port 3000 by default)
- **Build for production**: `npm run build`
- **Run tests**: `npm test`
- **Eject from Create React App**: `npm run eject` (irreversible)

## Architecture

### Key Dependencies
- **React Router DOM**: Client-side routing configured in `src/index.js` with BrowserRouter
- **AOS (Animate On Scroll)**: Animation library initialized in `App.js` with custom settings
- **Firebase**: Analytics and potentially other services, configured in `src/firebase.js`

### Component Structure
- `App.js`: Main application component with AOS initialization and routing setup
- `HomePage.js`: Primary page component containing restaurant menu data and layout
- `Header.js`: Reusable header component with logo and restaurant branding
- `Services.js`: Reusable component for rendering menu sections with items, images, and pricing
- `index.js`: Application entry point with React Router setup

### Data Organization
Menu items are stored as arrays of objects in `HomePage.js` with structure:
```javascript
{
    name: string,
    description: string,
    price: string,
    image: imported_image
}
```

### Asset Management
- Images stored in `src/img/` directory
- All images imported individually in `HomePage.js`
- No centralized asset management system

### Styling
- Global styles in `src/globals.css`
- AOS animations configured with 1200ms duration and ease-in-sine easing

## Important Notes

- Firebase configuration contains API keys and should be treated as environment-specific
- The app uses both Spanish and Portuguese content throughout
- Price display logic conditionally shows pricing based on string length
- The project structure suggests this may have been converted from or intended as a mobile app