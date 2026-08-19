"use client";

import { useEffect, useState } from "react";

export default function ListenerCount() {
  const [listeners, setListeners] = useState(142);

  useEffect(() => {
    // Oscillate listener count slightly every 5 seconds to feel dynamic and live
    const interval = setInterval(() => {
      setListeners((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(130, Math.min(160, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/25 border border-white/5 backdrop-blur-md text-[10px] font-semibold tracking-widest text-white/80 uppercase select-none">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
      </span>
      <span className="tabular-nums font-bold text-white">{listeners}</span>
      <span className="opacity-70 font-medium">listening now</span>
    </div>
  );
}
