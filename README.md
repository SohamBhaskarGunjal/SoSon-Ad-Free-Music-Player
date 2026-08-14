# SoSon — Sound Without Limits.

SoSon is a modern, ad-free web music player prototype focused on cinematic presentation and distraction-free discovery.

## Features

- Dark, responsive home experience with featured songs, trending music, curated playlists, artists, and recently played tracks
- Search for songs, artists, and albums with loading, empty, and error states
- Persistent bottom music player with:
  - Play / pause
  - Previous / next
  - Progress scrubbing
  - Volume control
  - Shuffle
  - Repeat (off/all/one)
  - Favorite toggle
  - Queue preview and direct queue track selection
- Curated playlists:
  - Festivals of Freedom
  - Late Night Drive
  - Road Trip
  - Romantic
  - South Music
  - Hip Hop
  - Retro
- Artists section with artist cards and detail pages (popular tracks + albums)
- Favorites stored locally (localStorage)
- Recently played stored locally and surfaced on Home

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- React Router

## Project Structure

```text
src/
├── assets/
├── components/
├── data/
├── hooks/
├── pages/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Lint:

```bash
npm run lint
```

## Environment Variables

Copy `.env.example` to `.env` and provide your own values when connecting an authorized API.

## Music & Licensing Notes

- This prototype uses mock metadata and a short legally permitted sample URL for demo playback.
- No full-length copyrighted songs are bundled in this repository.
- Service abstractions in `src/services/musicService.js` are ready to be replaced with authorized music API integrations.

## Architecture Notes

- Reusable UI components for cards, sections, track lists, and persistent player
- Centralized playback state in `App.jsx`
- Separate service layer for data retrieval and search behavior
- Local persistence handled via reusable `useLocalStorage` hook

## Future Improvements

- Connect to licensed streaming/music APIs
- Add auth + per-user cloud sync for favorites/history
- Improve queue management (drag/reorder)
- Add richer accessibility controls and keyboard shortcuts
- Add automated component and integration tests
