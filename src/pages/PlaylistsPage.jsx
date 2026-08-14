import { useEffect, useState } from 'react'
import PlaylistCard from '../components/PlaylistCard'
import Section from '../components/Section'
import { getPlaylists, tracksByIds } from '../services/musicService'

const PlaylistsPage = ({ onPlayPlaylist }) => {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    getPlaylists().then(setPlaylists)
  }, [])

  return (
    <div className="page-grid">
      <Section title="Playlists" subtitle="Curated collections for every mood">
        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              count={playlist.trackIds.length}
              onPlay={() => onPlayPlaylist(tracksByIds(playlist.trackIds))}
            />
          ))}
        </div>
      </Section>
    </div>
  )
}

export default PlaylistsPage
