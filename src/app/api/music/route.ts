import { NextRequest } from "next/server";

// We'll use Apple Music public RSS feeds (no key required) as a simple source.
// Docs: https://rss.applemarketingtools.com/
// Example: https://rss.applemarketingtools.com/api/v2/us/music/most-played/25/albums.json

function getRssFallbackOrder(tab: string): string[] {
  // Fallback order to avoid 502s or unavailable feeds by country
  switch (tab) {
    case "Top Critics' Picks":
      return ["top-albums", "most-played", "new-releases"];
    case "Most Popular":
      return ["most-played", "top-albums", "new-releases"];
    case "New Releases":
    default:
      return ["new-releases", "top-albums", "most-played"];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tab = searchParams.get("tab") || "New Releases";
  const country = searchParams.get("country") || "us";
  const limit = searchParams.get("limit") || "25";

  const charts = getRssFallbackOrder(tab);
  let data: any = null;
  for (const chart of charts) {
    const url = `https://rss.applemarketingtools.com/api/v2/${country}/music/${chart}/${limit}/albums.json`;
    try {
      const res = await fetch(url, {
        headers: {
          "accept": "application/json",
          "user-agent": "Mozilla/5.0"
        },
        next: { revalidate: 60 }
      });
      if (res.ok) {
        data = await res.json();
        if (data?.feed?.results?.length) break;
      }
    } catch {
      // try next chart
    }
  }
  if (!data) {
    // graceful empty payload to avoid surfacing 502 to client
    return new Response(JSON.stringify({ results: [] }), {
      headers: { "content-type": "application/json" },
    });
  }

  const results = (data.feed?.results || []).map((item: any) => ({
    title: item.name,
    artist: item.artistName,
    // Apple RSS has no critic score; synthesize placeholder 0 and text empty
    score: 0,
    ratingText: "",
    href: item.url,
    imageUrl: item.artworkUrl100?.replace("100x100bb", "200x200bb") || item.artworkUrl100 || "",
  }));

  return new Response(JSON.stringify({ results }), {
    headers: { "content-type": "application/json" },
  });
}


