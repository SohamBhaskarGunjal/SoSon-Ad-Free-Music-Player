import { useEffect, useState } from 'react'
import { tracksByIds } from '../services/musicService'
import Section from '../components/Section'
import SongCard from '../components/SongCard'
import PlaylistCard from '../components/PlaylistCard'
import ArtistCard from '../components/ArtistCard'

const HomePage = ({ homeData, loading, error, onPlayTrack, onPlayPlaylist, favorites, onToggleFavorite, recentlyPlayedIds }) => {
  const [recentTracks, setRecentTracks] = useState([])

  useEffect(() => {
    setRecentTracks(tracksByIds(recentlyPlayedIds).slice(0, 5))
  }, [recentlyPlayedIds])

  if (loading) {
    return <p className="state-message">Loading home feed...</p>
  }

  if (error) {
    return <p className="state-message error">{error}</p>
  }

  return (
    <div className="page-grid">
      <section className="hero-banner glass-card">
        <h1>SoSon</h1>
        <p>Sound Without Limits.</p>
        <small>Ad-free music discovery with cinematic focus.</small>
      </section>

      <Section title="Featured Songs" subtitle="Hand-picked for your next session">
        <div className="cards-grid">
          {homeData.featuredTracks.map((track) => (
            <SongCard key={track.id} track={track} onPlay={onPlayTrack} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(track.id)} />
          ))}
        </div>
      </Section>

      <Section title="Trending" subtitle="Popular right now">
        <div className="cards-grid compact">
          {homeData.trendingTracks.map((track) => (
            <SongCard key={track.id} track={track} onPlay={onPlayTrack} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(track.id)} />
          ))}
        </div>
      </Section>

      <Section title="Recently Played" subtitle="Your latest tracks">
        {recentTracks.length ? (
          <div className="cards-grid compact">
            {recentTracks.map((track) => (
              <SongCard key={track.id} track={track} onPlay={onPlayTrack} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(track.id)} />
            ))}
          </div>
        ) : (
          <p className="state-message">Play a song to build your recently played list.</p>
        )}
      </Section>

      <Section title="Curated Playlists" subtitle="Mood-based listening collections">
        <div className="playlist-grid">
          {homeData.playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              count={playlist.trackIds.length}
              onPlay={() => onPlayPlaylist(tracksByIds(playlist.trackIds))}
            />
          ))}
        </div>
      </Section>

      <Section title="Featured Artists" subtitle="Browse by creator">
        <div className="artist-grid">
          {homeData.artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </Section>
    </div>
  )
}

export default HomePage
