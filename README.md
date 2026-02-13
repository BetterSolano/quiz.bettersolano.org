# Solano Quiz

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer--motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Live:** [quiz.bettersolano.org](https://quiz.bettersolano.org)

## Overview

Solano Quiz is an interactive educational platform designed to test and expand knowledge about the history, culture, geography, and general facts of Solano, Nueva Vizcaya. Built with modern web technologies, it delivers a fast, accessible, and engaging experience across all devices.

## Features

- **4 Quiz Categories** — History & Founding, Culture & Festivals, Geography & Landmarks, General Knowledge
- **Multiple Question Types** — Multiple choice, true/false, fill-in-the-blank, and image-based questions
- **Real-time Scoring** — Streak bonuses, time-based multipliers, and difficulty scaling
- **Score History** — Local leaderboard tracking past quiz attempts
- **Dark Mode** — Automatic theme switching with manual override
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Static Export** — Pre-rendered HTML for fast load times, deployed to cPanel/LiteSpeed
- **SEO Optimized** — Per-page metadata, Open Graph tags, JSON-LD structured data, sitemap, and robots.txt
- **Animated UI** — Framer Motion page transitions, confetti effects, and score popups
- **Google Analytics** — Integrated via Google Tag Manager (gtag.js)

## Tech Stack

- **Next.js 14** — Static export (`output: "export"`) with `trailingSlash` routing
- **React 18** — Component architecture with hooks
- **TypeScript** — Full type safety across the codebase
- **Tailwind CSS** — Utility-first styling with custom design tokens
- **Framer Motion** — Production-ready animations and transitions
- **Lucide React** — Consistent icon system

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── leaderboard/        # Score history page
│   ├── mechanics/          # Quiz mechanics explainer
│   ├── quiz/               # Quiz selection + dynamic quiz routes
│   │   └── [categoryId]/   # Quiz session + results pages
│   ├── layout.tsx          # Root layout (metadata, GTM, JSON-LD)
│   ├── not-found.tsx       # Custom 404 page
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/
│   ├── landing/            # Homepage components
│   ├── layout/             # Header, Footer
│   ├── quiz/               # Quiz engine, timer, progress, question types
│   ├── results/            # Score breakdown, question review
│   └── ui/                 # Reusable UI primitives
├── data/                   # Quiz questions and category definitions
├── hooks/                  # Custom React hooks (quiz engine, timer, localStorage)
├── lib/                    # Utilities (scoring, shuffle, storage, constants)
├── styles/                 # Animation variants
└── types/                  # TypeScript type definitions
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/BetterSolano/quiz.bettersolano.org.git
cd quiz.bettersolano.org

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export to dist/)
npm run build

# Lint
npm run lint
```

## Deployment

The project exports as static HTML to the `dist/` directory, ready for upload to any static hosting (cPanel, LiteSpeed, Nginx, etc.).

```bash
npm run build    # Outputs to dist/
```

Upload the contents of `dist/` to your web server's `public_html` directory. The included `.htaccess` handles routing, security headers, and CSP for Apache/LiteSpeed environments.

## License

**MIT | CC BY 4.0**

This project is dual-licensed under the [MIT License](https://opensource.org/licenses/MIT) and [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).

## Author

**[Ramon Logan Jr.](https://github.com/ramonloganjr)** — [BetterSolano.org](https://www.bettersolano.org/)
