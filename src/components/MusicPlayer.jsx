import { useEffect, useRef, useState } from 'react'
import { formatDuration } from '../utils/playerUtils'

const MusicPlayer = ({
  track,
  queue,
  isPlaying,
  volume,
  shuffle,
  repeat,
  onPlayPause,
  onNext,
  onPrevious,
  onVolumeChange,
  onToggleShuffle,
  onToggleRepeat,
  onToggleFavorite,
  isFavorite,
  onTrackEnd,
  onSelectTrack,
}) => {
  const audioRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track) {
      return
    }

    audio.src = track.audioUrl
    audio.load()
    setCurrentTime(0)

    if (isPlaying) {
      audio.play().catch(() => undefined)
    }
  }, [track, isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    if (isPlaying) {
      audio.play().catch(() => undefined)
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
    }
  }, [volume])

  if (!track) {
    return null
  }

  return (
    <footer className="music-player glass-card">
      <audio
        ref={audioRef}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || track.duration)}
        onEnded={onTrackEnd}
      />

      <div className="player-track-info">
        <img src={track.cover} alt={track.title} />
        <div>
          <strong>{track.title}</strong>
          <p>{track.artist}</p>
        </div>
        <button type="button" className={isFavorite ? 'active' : ''} onClick={() => onToggleFavorite(track.id)}>
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button type="button" className={shuffle ? 'active' : ''} onClick={onToggleShuffle}>
            Shuffle
          </button>
          <button type="button" onClick={onPrevious}>Prev</button>
          <button type="button" onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button type="button" onClick={onNext}>Next</button>
          <button type="button" className={repeat !== 'off' ? 'active' : ''} onClick={onToggleRepeat}>
            Repeat: {repeat}
          </button>
        </div>

        <div className="progress-wrap">
          <span>{formatDuration(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || track.duration}
            value={currentTime}
            onChange={(event) => {
              const nextTime = Number(event.target.value)
              setCurrentTime(nextTime)
              if (audioRef.current) {
                audioRef.current.currentTime = nextTime
              }
            }}
          />
          <span>{formatDuration(duration || track.duration)}</span>
        </div>
      </div>

      <div className="player-side">
        <label htmlFor="volume">Volume</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
        />
        <div className="queue-list">
          <strong>Queue ({queue.length})</strong>
          <div>
            {queue.slice(0, 4).map((queueTrack) => (
              <button type="button" key={queueTrack.id} onClick={() => onSelectTrack(queueTrack)}>
                {queueTrack.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MusicPlayer
