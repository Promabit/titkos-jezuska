# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application (App Router) with TypeScript, React 19, and Tailwind CSS 4. The project uses the React Compiler for optimization.

## Development Commands

```bash
npm run dev    # Start development server at http://localhost:3000
npm run build  # Create production build
npm start      # Run production server
npm run lint   # Run ESLint
```

## Technology Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **React**: Version 19.2.0 with React Compiler enabled
- **TypeScript**: Version 5
- **Styling**: Tailwind CSS 4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono (optimized via next/font)

## Project Structure

- `app/` - Next.js App Router directory
  - `layout.tsx` - Root layout with font configuration and metadata
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind imports and CSS custom properties
- `public/` - Static assets
- Path alias `@/*` maps to root directory

## Styling Architecture

The project uses Tailwind CSS 4 with a custom theme configuration:
- CSS custom properties defined in `globals.css` for colors (background/foreground)
- Dark mode support via `prefers-color-scheme`
- Theme variables configured using `@theme inline` directive
- Font families defined as CSS variables from next/font optimization

## Key Configuration

- **React Compiler**: Enabled in `next.config.ts` with `reactCompiler: true`
- **TypeScript**: Strict mode enabled, using ES2017 target with ESNext modules
- **ESLint**: Uses Next.js config with TypeScript support
- **Node Version**: Managed via `.nvmrc`
