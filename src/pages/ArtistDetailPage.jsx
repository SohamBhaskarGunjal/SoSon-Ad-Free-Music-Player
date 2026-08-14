import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TrackList from '../components/TrackList'
import { getArtistDetails } from '../services/musicService'

const ArtistDetailPage = ({ onPlayTrack, favorites, onToggleFavorite }) => {
  const { artistId } = useParams()
  const [details, setDetails] = useState(null)

  useEffect(() => {
    getArtistDetails(artistId).then(setDetails)
  }, [artistId])

  if (!details) {
    return <p className="state-message">Loading artist profile...</p>
  }

  return (
    <div className="page-grid">
      <section className="artist-detail glass-card">
        <img src={details.artist.image} alt={details.artist.name} />
        <div>
          <h1>{details.artist.name}</h1>
          <p>{details.artist.bio}</p>
          <small>{details.artist.genres.join(' • ')}</small>
        </div>
      </section>

      <section>
        <h2>Popular Tracks</h2>
        <TrackList tracks={details.tracks} onPlay={onPlayTrack} onToggleFavorite={onToggleFavorite} favorites={favorites} />
      </section>

      <section className="glass-card artist-albums">
        <h2>Albums</h2>
        <ul>
          {details.albums.map((album) => (
            <li key={album}>{album}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default ArtistDetailPage
