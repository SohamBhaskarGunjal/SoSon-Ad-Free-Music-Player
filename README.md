# SoSon Ad-Free Music Player 🌅

SoSon is a modern, ad-free web music player built for discovering and enjoying music in a clean, distraction-free environment. Explore artist catalogs, search online tracks on-demand, and enjoy local curated playlists (including Festivals of Freedom, Late Night Drive, Road Trip, Romantic, South Music, Hip Hop, and Retro)—all in one seamless, responsive platform.

---

## 🛠️ Stack & Architecture

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 using `@theme` tokens in `app/globals.css` (no legacy `tailwind.config`)
- **Audio Engine**: HTML5 `Audio` element API supporting smooth local playback, volume adjustment, and muting.
- **Search System**: Combined local query matching and a backend API search route (`/api/search`) fetching online stream URLs from primary and backup CDN hosts.
- **Monitoring & Analytics**: Vercel Analytics (`@vercel/analytics`) & Vercel Speed Insights (`@vercel/speed-insights`)

---

## ✨ Features

### 1. Online & Local Search
- Instantly search local track lists and query online databases to fetch high-quality audio streams (320kbps/160kbps).
- Automatically queries backup API endpoints in case the primary CDN host encounters traffic bottlenecks.

### 2. Curated Artist Portfolios
- Features dedicated pages and filters for top-tier artists:
  - Sidhu Moosewala
  - Karan Aujla
  - Diljit Dosanjh
  - Honey Singh
  - Sumit Goswami
  - Cheema Y
  - Guru Randhawa
  - Shubh

### 3. Glassmorphism Design
- A premium frosted-glass design featuring custom webkit backdrops, shadows, and gradients.
- Responsive structures tailored individually to desktop pills and mobile stacked layouts.

### 4. BLinking Kolkata Clock
- Ticks every second, formatting the Indian Standard Time (`Asia/Kolkata`) with a CSS colon-blink animation.

### 5. Oscillating Listener Counter
- Client-side audience tracker with a pulsing live status dot to simulate real-time tuning.

---

## 📂 File Structure

```
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts         # Server-side API search route
│   ├── components/
│   │   ├── Clock.tsx            # Kolkata clock with blinking colon
│   │   ├── ListenerCount.tsx    # Live pulsing listener count
│   │   └── MusicPlayer.tsx      # HTML5 Audio playback container
│   ├── globals.css              # Glass recipes, themes, and animations
│   ├── layout.tsx               # App wrappers and analytics config
│   └── page.tsx                 # Search controllers and artist selection lists
├── public/
│   ├── audio/                   # Local MP3 audio catalog
│   └── bg/                      # Dynamic background images
```

---

## 🚀 Getting Started

### 1. Run the Development Server
Install dependencies and launch the environment:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 2. Build for Production (Vercel Ready)
Validate typescript types, lints, and build static assets:

```bash
npm run lint
npm run build
```
