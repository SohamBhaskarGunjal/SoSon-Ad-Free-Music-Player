import { useEffect, useState } from 'react'
import ArtistCard from '../components/ArtistCard'
import Section from '../components/Section'
import { getArtists } from '../services/musicService'

const ArtistsPage = () => {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    getArtists().then(setArtists)
  }, [])

  return (
    <div className="page-grid">
      <Section title="Artists" subtitle="Browse by performer">
        <div className="artist-grid">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </Section>
    </div>
  )
}

export default ArtistsPage
