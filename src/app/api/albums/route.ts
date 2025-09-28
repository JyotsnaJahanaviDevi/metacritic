import { NextResponse } from "next/server";

// Free source: Apple Marketing Tools RSS - Top Albums (no API key required)
// Docs: https://developer.apple.com/news/?id=cxj5s9bk

export async function GET() {
  try {
    const res = await fetch(
      "https://rss.applemarketingtools.com/api/v2/us/music/most-played/50/albums.json",
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }

    const data = (await res.json()) as any;
    const results = Array.isArray(data?.feed?.results) ? data.feed.results : [];

    // Map to our Album shape
    const albums = results.slice(0, 24).map((item: any, idx: number) => {
      const img: string = item?.artworkUrl100 || "";
      const upscaled = img.replace(/\/(\d+x\d+)bb\//, "/256x256bb/");

      // Derive a pseudo "score" from rank (purely illustrative)
      // Top ranks ~ higher scores, clamped 65-95
      const base = 95 - idx * 2;
      const score = Math.max(65, Math.min(95, base));

      return {
        title: item?.name ?? "Unknown Album",
        artist: item?.artistName ?? "Unknown Artist",
        href: item?.url ?? "#",
        imageUrl: upscaled || img,
        score,
      };
    });

    return NextResponse.json({ albums });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}