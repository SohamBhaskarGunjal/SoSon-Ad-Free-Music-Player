import { artists, playlists, tracks } from '../data/musicData'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getAllTracks = async () => {
  await wait(250)
  return tracks
}

export const getHomeData = async () => {
  await wait(300)
  return {
    featuredTracks: tracks.filter((track) => track.isFeatured),
    trendingTracks: tracks.filter((track) => track.isTrending),
    playlists,
    artists,
  }
}

export const searchMusic = async (query) => {
  await wait(450)

  if (query.toLowerCase() === 'error') {
    throw new Error('Search service is temporarily unavailable. Please try again.')
  }

  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return []
  }

  return tracks.filter((track) =>
    [track.title, track.artist, track.album].some((field) =>
      field.toLowerCase().includes(normalized),
    ),
  )
}

export const getPlaylists = async () => {
  await wait(250)
  return playlists
}

export const getArtists = async () => {
  await wait(250)
  return artists
}

export const getArtistDetails = async (artistId) => {
  await wait(300)
  const artist = artists.find((item) => item.id === artistId)

  if (!artist) {
    return null
  }

  const artistTracks = tracks.filter((track) => track.artistId === artistId)

  return {
    artist,
    tracks: artistTracks,
    albums: [...new Set(artistTracks.map((track) => track.album))],
  }
}

export const tracksByIds = (ids) =>
  ids.map((id) => tracks.find((track) => track.id === id)).filter(Boolean)
