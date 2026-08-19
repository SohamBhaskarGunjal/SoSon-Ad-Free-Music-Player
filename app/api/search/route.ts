/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // Support both 'query' and 'q' to prevent frontend mismatched parameters
  const query = searchParams.get("query") || searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const primaryApiHost = "https://backend.listenfree.in/api";
  const backupApiHost = "https://music-api2.albatross0071.workers.dev/api";

  const fetchSearchResults = async (apiHost: string) => {
    try {
      const searchRes = await fetch(
        `${apiHost}/search?query=${encodeURIComponent(query)}`,
        { next: { revalidate: 3600 } }
      );
      if (!searchRes.ok) return null;
      const searchData = await searchRes.json();
      if (!searchData.success || !searchData.data) return null;

      const rawSongs =
        searchData.data.songs?.results ||
        searchData.data.topQuery?.results ||
        searchData.data.results ||
        [];

      if (!Array.isArray(rawSongs) || rawSongs.length === 0) return null;

      // Fetch full-length song details with stream URLs
      const songDetailPromises = rawSongs.slice(0, 8).map(async (item: any) => {
        try {
          const songId = item.id;
          if (!songId) return null;

          const detailRes = await fetch(`${apiHost}/songs/${songId}`);
          if (!detailRes.ok) return null;
          const detailData = await detailRes.json();

          if (detailData.success && Array.isArray(detailData.data) && detailData.data.length > 0) {
            const songObj = detailData.data[0];
            const downloadUrls = songObj.downloadUrl || [];

            // Pick highest quality audio stream (320kbps or 160kbps)
            const audioUrl =
              downloadUrls[downloadUrls.length - 1]?.url ||
              downloadUrls[downloadUrls.length - 2]?.url ||
              downloadUrls[0]?.url;

            if (audioUrl) {
              const primaryArtist =
                songObj.artists?.primary?.map((a: any) => a.name).join(", ") ||
                item.description ||
                "Various Artists";

              const images = songObj.image || item.image || [];
              const coverUrl =
                (Array.isArray(images) && images[images.length - 1]?.url) ||
                (typeof images === "string" ? images : "/about.png");

              return {
                id: `online-full-${songObj.id}`,
                title: songObj.name || item.title || "Unknown Track",
                artist: primaryArtist,
                film: songObj.album?.name || "Single",
                year: songObj.year ? parseInt(songObj.year) : 2024,
                duration: songObj.duration || 240,
                audioUrl: audioUrl,
                style: "Online",
                mood: "Energetic",
                coverUrl: coverUrl,
              };
            }
          }
        } catch (e) {
          // Ignore individual song detail errors
        }
        return null;
      });

      const resolved = (await Promise.all(songDetailPromises)).filter(Boolean);
      return resolved.length > 0 ? resolved : null;
    } catch (e) {
      return null;
    }
  };

  try {
    let results = await fetchSearchResults(primaryApiHost);
    if (!results) {
      results = await fetchSearchResults(backupApiHost);
    }

    if (results && results.length > 0) {
      return NextResponse.json({ results });
    }
  } catch (error) {
    console.error("Online search API error:", error);
  }

  return NextResponse.json({ results: [] });
}
