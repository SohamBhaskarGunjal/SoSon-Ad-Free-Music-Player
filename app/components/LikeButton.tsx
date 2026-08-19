"use client";

import { useEffect, useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for previous user like
    const storedLikeStatus = localStorage.getItem("soson_user_has_liked");
    if (storedLikeStatus === "true") {
      setHasLiked(true);
    }

    // Fetch live likes count from server
    fetch("/api/likes")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setLikes(data.count);
        }
      })
      .catch((err) => console.error("Failed to load likes count:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLike = async () => {
    // Trigger heartbeat animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);

    if (hasLiked) {
      // Show brief notification if user has already liked
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    // Optimistic UI update
    setHasLiked(true);
    setLikes((prev) => prev + 1);
    localStorage.setItem("soson_user_has_liked", "true");

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success && typeof data.count === "number") {
        setLikes(data.count);
      }
    } catch (err) {
      console.error("Error persisting like:", err);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleLike}
        disabled={isLoading}
        title={hasLiked ? "You liked this!" : "Like SoSon Music"}
        className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer select-none border ${
          hasLiked
            ? "bg-[#ff4b6e]/10 border-[#ff4b6e]/30 shadow-[0_0_15px_rgba(255,75,110,0.25)] hover:border-[#ff4b6e]/50"
            : "bg-white/5 hover:bg-white/10 border-white/10 text-white/50 hover:text-white/80"
        } ${isAnimating ? "scale-110" : "hover:scale-105 active:scale-95"}`}
      >
        {/* Heart SVG Icon */}
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isAnimating ? "animate-ping scale-125" : ""
          } ${hasLiked ? "text-[#ff4b6e] fill-[#ff4b6e] drop-shadow-[0_0_8px_rgba(255,75,110,0.6)]" : "text-gray-400 fill-gray-400/80 group-hover:text-gray-300"}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>

        {/* Count Label */}
        <span
          className={`text-sm md:text-base font-bold tabular-nums tracking-wide transition-colors duration-300 ${
            hasLiked ? "text-[#ff4b6e]" : "text-gray-400 group-hover:text-white/80"
          }`}
        >
          {likes}
        </span>
      </button>

      {/* Floating Already Liked Toast Tooltip */}
      {showToast && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-[#ff4b6e] border border-[#ff4b6e]/30 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-lg animate-fadeIn z-50">
          Already Liked! ❤️
        </div>
      )}
    </div>
  );
}
