"use client";

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  film?: string;
  year?: number;
  duration?: number;
  audioUrl: string;
  coverUrl?: string;
  category?: string;
  style?: string;
  mood?: string;
}

interface MusicPlayerProps {
  tracks: Track[];
  activeTrackId?: string;
  autoPlaySignal?: number;
  selectedArtist?: string;
  onTrackChange?: (track: Track) => void;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const getAudioUrl = (url: string) => {
  if (url && url.startsWith("/audio/")) {
    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.startsWith("192.168."));
    if (!isLocal) {
      // In production (Vercel), resolve /audio/... files to the raw GitHub URL
      return `https://raw.githubusercontent.com/SohamBhaskarGunjal/SoSon-Ad-Free-Music-Player/main/public${url}`;
    }
  }
  return url;
};

export default function MusicPlayer({
  tracks,
  activeTrackId,
  autoPlaySignal,
  selectedArtist,
  onTrackChange,
}: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = tracks[currentTrackIndex] as Track | undefined;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTrack?.duration || 0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  const handleNext = () => {
    if (!tracks.length) return;
    setShouldAutoPlay(true);
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    if (!tracks.length) return;
    setShouldAutoPlay(true);
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleAudioError = () => {
    if (!audioRef.current || !currentTrack) return;
    console.warn(`Audio playback error for local track: ${currentTrack.title} (${getAudioUrl(currentTrack.audioUrl)})`);
    // Strictly play saved audio files from github repository - auto-skip to next saved track on error
    handleNext();
  };

  // Sync active track index ONLY when activeTrackId prop explicitly changes to a new track
  const prevActiveTrackIdRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (activeTrackId && activeTrackId !== prevActiveTrackIdRef.current) {
      prevActiveTrackIdRef.current = activeTrackId;
      const idx = tracks.findIndex((t) => t.id === activeTrackId);
      if (idx !== -1) {
        setCurrentTrackIndex(idx);
      }
    }
  }, [tracks, activeTrackId]);

  // When track actually changes, update audio src and handle auto-play if needed
  const prevAudioSrcRef = useRef<string>("");

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const audioEl = audioRef.current;

      // Only reload audio if the track URL actually changed!
      const resolvedUrl = getAudioUrl(currentTrack.audioUrl);
      if (prevAudioSrcRef.current !== resolvedUrl) {
        prevAudioSrcRef.current = resolvedUrl;
        audioEl.src = resolvedUrl;
        audioEl.load();
        setCurrentTime(0);
        setDuration(currentTrack.duration || 0);

        if ((autoPlaySignal && autoPlaySignal > 0) || shouldAutoPlay || isPlaying) {
          const playAudio = () => {
            audioEl
              .play()
              .then(() => {
                setIsPlaying(true);
                setShouldAutoPlay(false);
              })
              .catch((err) => console.warn("Audio play prevented:", err));
          };

          audioEl.addEventListener("canplay", playAudio, { once: true });
          playAudio();
        }
      }
    }
  }, [currentTrack, autoPlaySignal, shouldAutoPlay]);

  // Notify parent on track change
  useEffect(() => {
    if (currentTrack) {
      onTrackChange?.(currentTrack);
    }
  }, [currentTrackIndex, tracks, onTrackChange, currentTrack]);

  // Sync volume & mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Play / Pause toggle
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Play error:", err));
    }
  };

  // Drag / Click Seek Handling
  const handleSeekStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();

    const updateSeek = (clientX: number) => {
      const offset = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = offset / rect.width;
      const newTime = percentage * duration;
      setCurrentTime(newTime);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
    };

    updateSeek(e.clientX);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      updateSeek(moveEvent.clientX);
    };

    const handlePointerUp = () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Volume slider change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  const getCoverImage = (track?: Track) => {
    if (!track) return "/bg/scene-wide.png";

    // Strictly restrict artist photo usage to when an Artist is selected in the Artist section
    if (selectedArtist && selectedArtist !== "All") {
      const artistLower = track.artist.toLowerCase();
      if (artistLower.includes("honey")) return "/artists/Honey Singh.png";
      if (artistLower.includes("cheema")) return "/artists/cheema.png";
      if (artistLower.includes("diljit")) return "/artists/diljit.png";
      if (artistLower.includes("guru") || artistLower.includes("randhawa")) return "/artists/guru.png";
      if (artistLower.includes("karan") || artistLower.includes("aujla")) return "/artists/karan.png";
      if (artistLower.includes("shubh")) return "/artists/shubh.png";
      if (artistLower.includes("sidhu") || artistLower.includes("moose")) return "/artists/sidhu.png";
    }

    // For Style section or general listening, use non-artist coverUrl or neutral theme banner
    if (track.coverUrl && !track.coverUrl.startsWith("/artists/")) {
      return track.coverUrl;
    }
    return "/bg/scene-wide.png";
  };

  const coverImage = getCoverImage(currentTrack);

  return (
    <div className="w-full font-sans select-none">
      {/* HTML5 Native Audio Element - Pure Local Playback, NO YouTube */}
      <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            if (audioRef.current.duration && !isNaN(audioRef.current.duration) && isFinite(audioRef.current.duration)) {
              setDuration(audioRef.current.duration);
            }
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration) && isFinite(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
          }
        }}
        onDurationChange={() => {
          if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration) && isFinite(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={handleNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={handleAudioError}
      />

      {/* ========================================================= */}
      {/* Horizontal Media Player Container                         */}
      {/* ========================================================= */}
      <div className="relative w-full rounded-2xl glass-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 min-h-[92px]">
        {/* Left Section: Playback Controls */}
        <div className="flex items-center justify-between md:justify-start gap-4 shrink-0">
          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer active:scale-90"
              title="Previous"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 transition-all active:scale-95 cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer active:scale-90"
              title="Next"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6zm9-12v12h2V6z" />
              </svg>
            </button>
          </div>

          {/* Album Cover Thumbnail & Track Title (Mobile layout) */}
          <div className="flex md:hidden items-center gap-3 min-w-0 max-w-[50%]">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImage} alt={currentTrack?.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-white truncate">
                {currentTrack?.title || "No Track"}
              </span>
              <span className="text-[11px] font-medium text-white/60 truncate">
                {currentTrack?.artist || "Select options above"}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Cover Art, Title, Progress Slider */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex items-center justify-between w-full">
            {/* Title / Artist Info (Desktop layout) */}
            <div className="hidden md:flex items-center gap-3.5 min-w-0 mb-1.5">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black/40 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt={currentTrack?.title}
                  className="w-full h-full object-cover scale-105"
                />
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[15px] font-bold text-white truncate">
                    {currentTrack?.title || "No Songs Loaded"}
                  </span>
                  <span className="text-[12px] font-medium text-white/60 truncate">
                    {currentTrack?.artist || "Select filters above"}
                  </span>
                </div>
                {currentTrack && (
                  <span className="text-[9.5px] font-semibold tracking-wider text-white/35 uppercase">
                    {currentTrack.film} {currentTrack.year ? `• ${currentTrack.year}` : ""}
                  </span>
                )}
              </div>
            </div>

            {/* Theme-Matching Sound Wave / Waveform Visualizer Pattern (Extended Length) */}
            <div className="hidden md:flex flex-1 items-center justify-between gap-[2px] md:gap-[3px] h-8 px-4 py-1 rounded-xl bg-black/40 border border-white/10 mx-4 max-w-sm lg:max-w-md xl:max-w-lg shrink shadow-inner">
              {Array.from({ length: 56 }).map((_, i) => {
                const heights = [
                  30, 65, 95, 40, 85, 100, 55, 80, 35, 90, 75, 45, 85, 95, 60, 40, 90, 70, 85, 50,
                  75, 95, 60, 40, 80, 100, 50, 75, 90, 65, 35, 85, 95, 55, 75, 90, 40, 80, 100, 60,
                  85, 45, 90, 70, 85, 50, 75, 95, 60, 40, 80, 95, 50, 75, 90, 45
                ];
                const baseH = heights[i % heights.length];
                const delay = (i * 0.035).toFixed(2);
                
                return (
                  <span
                    key={i}
                    className={`w-[2.5px] rounded-full transition-all duration-300 ${
                      isPlaying
                        ? "bg-accent shadow-[0_0_8px_rgba(255,107,61,0.6)] animate-waveform"
                        : "bg-white/20"
                    }`}
                    style={{
                      height: isPlaying ? `${baseH}%` : "6px",
                      animationDelay: `${delay}s`,
                      animationDuration: `${0.3 + (i % 5) * 0.07}s`,
                    }}
                  />
                );
              })}
            </div>

            {/* Mobile Timestamp */}
            <span className="md:hidden text-[9px] font-bold font-mono tabular-nums text-white/40 mb-1 ml-auto">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Seek Rail and Timeline */}
          <div className="flex items-center gap-3.5 w-full">
            {/* Desktop Start timestamp */}
            <span className="hidden md:inline text-[10px] font-semibold font-mono tabular-nums text-white/45 min-w-[32px]">
              {formatTime(currentTime)}
            </span>

            {/* Seek Bar */}
            <div
              className="relative flex-1 h-6 flex items-center cursor-pointer group touch-none"
              onPointerDown={handleSeekStart}
            >
              <div className="w-full h-[4.5px] bg-white/15 rounded-full relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-accent rounded-full shadow-[0_0_12px_rgba(255,107,61,0.8)]"
                  style={{ width: `${progressPercent}%` }}
                />
                <div className="absolute -inset-y-2.5 inset-x-0" />
              </div>
              <div
                className="absolute w-3.5 h-3.5 bg-accent border-2 border-white rounded-full transition-transform pointer-events-none -translate-x-1/2 shadow-[0_2px_8px_rgba(255,107,61,0.9)] group-hover:scale-125"
                style={{ left: `${progressPercent}%` }}
              />
            </div>

            {/* Desktop End timestamp */}
            <span className="hidden md:inline text-[10px] font-semibold font-mono tabular-nums text-white/45 min-w-[32px] text-right">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right Section: Volume controls */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0 min-w-[128px] justify-end">
          <button
            onClick={handleToggleMute}
            className="text-white/60 hover:text-white transition-colors cursor-pointer active:scale-95"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            )}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-22 h-1.5 rounded-lg appearance-none cursor-pointer accent-accent transition-all"
            style={{
              outline: "none",
              background: `linear-gradient(to right, #ff6b3d 0%, #ff6b3d ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
