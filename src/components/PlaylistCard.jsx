const PlaylistCard = ({ playlist, count, onPlay }) => (
  <article className="playlist-card glass-card">
    <img src={playlist.cover} alt={`${playlist.name} artwork`} />
    <div>
      <h3>{playlist.name}</h3>
      <p>{playlist.description}</p>
      <small>{count} tracks</small>
    </div>
    <button type="button" onClick={() => onPlay(playlist)}>
      Play Playlist
    </button>
  </article>
)

export default PlaylistCard
