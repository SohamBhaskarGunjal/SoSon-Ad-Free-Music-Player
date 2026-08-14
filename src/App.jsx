import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import PlaylistsPage from './pages/PlaylistsPage'
import ArtistsPage from './pages/ArtistsPage'
import ArtistDetailPage from './pages/ArtistDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getAllTracks, getHomeData } from './services/musicService'
import { getNextTrackId, getPreviousTrackId } from './utils/playerUtils'
import './App.css'

function App() {
  const [tracks, setTracks] = useState([])
  const [homeData, setHomeData] = useState({ featuredTracks: [], trendingTracks: [], playlists: [], artists: [] })
  const [loadingHome, setLoadingHome] = useState(true)
  const [homeError, setHomeError] = useState('')

  const [queue, setQueue] = useState([])
  const [currentTrackId, setCurrentTrackId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.75)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState('off')

  const [favorites, setFavorites] = useLocalStorage('soson-favorites', [])
  const [recentlyPlayed, setRecentlyPlayed] = useLocalStorage('soson-recently-played', [])

  useEffect(() => {
    getAllTracks().then((allTracks) => {
      setTracks(allTracks)
      setQueue(allTracks)
      setCurrentTrackId(allTracks[0]?.id ?? null)
    })

    getHomeData()
      .then((data) => {
        setHomeData(data)
        setHomeError('')
      })
      .catch(() => setHomeError('Unable to load home content right now.'))
      .finally(() => setLoadingHome(false))
  }, [])

  const currentTrack = useMemo(
    () => queue.find((track) => track.id === currentTrackId) || tracks.find((track) => track.id === currentTrackId) || null,
    [currentTrackId, queue, tracks],
  )

  const cycleRepeat = () => {
    setRepeat((value) => {
      if (value === 'off') {
        return 'all'
      }
      if (value === 'all') {
        return 'one'
      }
      return 'off'
    })
  }

  const registerRecentlyPlayed = (trackId) => {
    setRecentlyPlayed((current) => [trackId, ...current.filter((id) => id !== trackId)].slice(0, 20))
  }

  const playTrack = (track, customQueue = queue) => {
    if (!track) {
      return
    }

    if (customQueue.length) {
      setQueue(customQueue)
    }

    setCurrentTrackId(track.id)
    setIsPlaying(true)
    registerRecentlyPlayed(track.id)
  }

  const playPlaylist = (playlistTracks) => {
    if (!playlistTracks.length) {
      return
    }

    setQueue(playlistTracks)
    playTrack(playlistTracks[0], playlistTracks)
  }

  const nextTrack = () => {
    const nextId = getNextTrackId(queue, currentTrackId, shuffle, repeat)
    if (nextId) {
      const next = queue.find((track) => track.id === nextId)
      playTrack(next, queue)
    } else {
      setIsPlaying(false)
    }
  }

  const previousTrack = () => {
    const previousId = getPreviousTrackId(queue, currentTrackId)
    const previous = queue.find((track) => track.id === previousId)
    playTrack(previous, queue)
  }

  const toggleFavorite = (trackId) => {
    setFavorites((current) =>
      current.includes(trackId) ? current.filter((id) => id !== trackId) : [...current, trackId],
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppShell
              playerProps={{
                track: currentTrack,
                queue,
                isPlaying,
                volume,
                shuffle,
                repeat,
                onPlayPause: () => setIsPlaying((value) => !value),
                onNext: nextTrack,
                onPrevious: previousTrack,
                onVolumeChange: setVolume,
                onToggleShuffle: () => setShuffle((value) => !value),
                onToggleRepeat: cycleRepeat,
                onToggleFavorite: toggleFavorite,
                isFavorite: currentTrack ? favorites.includes(currentTrack.id) : false,
                onTrackEnd: nextTrack,
                onSelectTrack: (track) => playTrack(track, queue),
              }}
            />
          }
        >
          <Route
            index
            element={
              <HomePage
                homeData={homeData}
                loading={loadingHome}
                error={homeError}
                onPlayTrack={(track) => playTrack(track, tracks)}
                onPlayPlaylist={playPlaylist}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                recentlyPlayedIds={recentlyPlayed}
              />
            }
          />
          <Route
            path="search"
            element={<SearchPage onPlayTrack={(track) => playTrack(track, tracks)} favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route path="playlists" element={<PlaylistsPage onPlayPlaylist={playPlaylist} />} />
          <Route path="artists" element={<ArtistsPage />} />
          <Route
            path="artists/:artistId"
            element={<ArtistDetailPage onPlayTrack={(track) => playTrack(track, tracks)} favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="favorites"
            element={<FavoritesPage tracks={tracks} onPlayTrack={(track) => playTrack(track, tracks)} favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
