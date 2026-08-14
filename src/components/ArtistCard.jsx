import { Link } from 'react-router-dom'

const ArtistCard = ({ artist }) => (
  <article className="artist-card glass-card">
    <img src={artist.image} alt={artist.name} />
    <h3>{artist.name}</h3>
    <p>{artist.genres.join(' • ')}</p>
    <Link to={`/artists/${artist.id}`}>View artist</Link>
  </article>
)

export default ArtistCard
