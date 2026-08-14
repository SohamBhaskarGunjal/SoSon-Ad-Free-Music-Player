import { formatDuration } from '../utils/playerUtils'

const TrackList = ({ tracks, onPlay, onToggleFavorite, favorites }) => (
  <div className="track-list glass-card">
    {tracks.map((track) => (
      <div className="track-row" key={track.id}>
        <img src={track.cover} alt="" />
        <div>
          <strong>{track.title}</strong>
          <p>
            {track.artist} • {track.album}
          </p>
        </div>
        <span>{formatDuration(track.duration)}</span>
        <button type="button" onClick={() => onPlay(track)}>
          ▶
        </button>
        <button type="button" className={favorites.includes(track.id) ? 'active' : ''} onClick={() => onToggleFavorite(track.id)}>
          {favorites.includes(track.id) ? '♥' : '♡'}
        </button>
      </div>
    ))}
  </div>
)

export default TrackList
