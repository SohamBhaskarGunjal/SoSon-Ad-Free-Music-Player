import SongCard from '../components/SongCard'

const FavoritesPage = ({ tracks, onPlayTrack, favorites, onToggleFavorite }) => {
  const favoriteTracks = tracks.filter((track) => favorites.includes(track.id))

  return (
    <div className="page-grid">
      <section className="glass-card">
        <h1>Favorites</h1>
        <p>Your saved tracks are stored locally on this device.</p>
      </section>

      {favoriteTracks.length ? (
        <div className="cards-grid">
          {favoriteTracks.map((track) => (
            <SongCard key={track.id} track={track} onPlay={onPlayTrack} onToggleFavorite={onToggleFavorite} isFavorite />
          ))}
        </div>
      ) : (
        <p className="state-message">No favorites yet. Tap ♡ on any track to save it.</p>
      )}
    </div>
  )
}

export default FavoritesPage
