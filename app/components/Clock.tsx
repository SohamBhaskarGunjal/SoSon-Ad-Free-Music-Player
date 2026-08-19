"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [mounted, setMounted] = useState(false);
  const [timeParts, setTimeParts] = useState<{
    hour: string;
    minute: string;
    period: string;
  } | null>(null);

  useEffect(() => {
    // Set mounted state asynchronously to avoid triggering synchronous cascading renders
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const parts = formatter.formatToParts(now);
      const hour = parts.find((p) => p.type === "hour")?.value || "";
      const minute = parts.find((p) => p.type === "minute")?.value || "";
      const period = parts.find((p) => p.type === "dayPeriod")?.value || "";

      setTimeParts({ hour, minute, period });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!mounted || !timeParts) {
    return (
      <div className="font-mono text-sm tracking-widest text-white/95 select-none flex items-center font-medium bg-black/25 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5">
        --<span className="opacity-40 colon-blink mx-1">:</span>-- --
      </div>
    );
  }

  return (
    <div className="font-mono text-sm tracking-widest text-white/95 select-none flex items-center font-medium bg-black/25 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5 shadow-md">
      <span className="tabular-nums">{timeParts.hour}</span>
      <span className="colon-blink text-white/60 font-medium select-none mx-1">:</span>
      <span className="tabular-nums">{timeParts.minute}</span>
      <span className="ml-2 text-sm font-medium uppercase text-white/95">
        {timeParts.period}
      </span>
    </div>
  );
}
