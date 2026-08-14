export const formatDuration = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const getNextTrackId = (queue, currentId, shuffle, repeat) => {
  if (!queue.length) {
    return null
  }

  const currentIndex = queue.findIndex((track) => track.id === currentId)
  if (currentIndex === -1) {
    return queue[0].id
  }

  if (repeat === 'one') {
    return queue[currentIndex].id
  }

  if (shuffle) {
    const options = queue.filter((track) => track.id !== currentId)
    if (!options.length) {
      return queue[currentIndex].id
    }

    return options[Math.floor(Math.random() * options.length)].id
  }

  const nextIndex = currentIndex + 1
  if (nextIndex < queue.length) {
    return queue[nextIndex].id
  }

  if (repeat === 'all') {
    return queue[0].id
  }

  return null
}

export const getPreviousTrackId = (queue, currentId) => {
  if (!queue.length) {
    return null
  }

  const currentIndex = queue.findIndex((track) => track.id === currentId)
  if (currentIndex <= 0) {
    return queue[queue.length - 1].id
  }

  return queue[currentIndex - 1].id
}
