import { useEffect, useState } from 'react'
import SongCard from '../components/SongCard'
import { searchMusic } from '../services/musicService'

const SearchPage = ({ onPlayTrack, favorites, onToggleFavorite }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const runSearch = async () => {
      if (!query.trim()) {
        setResults([])
        setError('')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const response = await searchMusic(query)
        if (active) {
          setResults(response)
        }
      } catch (searchError) {
        if (active) {
          setError(searchError.message)
          setResults([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    const timeout = setTimeout(runSearch, 250)

    return () => {
      active = false
      clearTimeout(timeout)
    }
  }, [query])

  return (
    <div className="page-grid">
      <section className="search-box glass-card">
        <h1>Search</h1>
        <p>Find songs, artists and albums instantly.</p>
        <input
          type="search"
          placeholder="Search for songs, artists, albums..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      {loading ? <p className="state-message">Searching music catalog...</p> : null}
      {error ? <p className="state-message error">{error}</p> : null}

      {!loading && !error && query && !results.length ? (
        <p className="state-message">No results found. Try a different search term.</p>
      ) : null}

      <div className="cards-grid">
        {results.map((track) => (
          <SongCard key={track.id} track={track} onPlay={onPlayTrack} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(track.id)} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage
