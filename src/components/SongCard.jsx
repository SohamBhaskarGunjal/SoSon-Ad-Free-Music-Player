import { formatDuration } from '../utils/playerUtils'

const SongCard = ({ track, onPlay, onToggleFavorite, isFavorite }) => (
  <article className="song-card glass-card">
    <img src={track.cover} alt={`${track.title} cover art`} />
    <div className="song-card-content">
      <h3>{track.title}</h3>
      <p>{track.artist}</p>
      <small>{track.album}</small>
      <div className="song-card-actions">
        <button type="button" onClick={() => onPlay(track)}>
          ▶ Play
        </button>
        <button
          type="button"
          className={isFavorite ? 'active' : ''}
          onClick={() => onToggleFavorite(track.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
    </div>
    <span>{formatDuration(track.duration)}</span>
  </article>
)

export default SongCard
