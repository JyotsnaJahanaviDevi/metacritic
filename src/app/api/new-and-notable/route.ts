import { NextRequest } from "next/server";

// Aggregates from existing endpoints:
// - /api/movies?tab=New Releases
// - /api/tv?tab=New Releases
// - /api/games?tab=New Releases
// - /api/music?tab=New Releases

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 16);
  const origin = req.nextUrl.origin;

  async function fetchJson(url: string) {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return { results: [] };
    return res.json();
  }

  const [movies, tv, games, music] = await Promise.all([
    fetchJson(`${origin}/api/movies?tab=New%20Releases`).catch(() => ({ results: [] })),
    fetchJson(`${origin}/api/tv?tab=New%20Releases`).catch(() => ({ results: [] })),
    fetchJson(`${origin}/api/games?tab=New%20Releases`).catch(() => ({ results: [] })),
    fetchJson(`${origin}/api/music?tab=New%20Releases`).catch(() => ({ results: [] })),
  ]);

  // Tag types for the UI and normalize fields
  type Item = {
    type: 'movie' | 'tv show' | 'game' | 'music';
    title: string;
    metascore: number;
    scoreText: string;
    reviewCount: number;
    url: string;
    imageSrc: string | null;
  };

  const mapScoreText = (score: number) => {
    if (score >= 85) return "Universal Acclaim";
    if (score >= 60) return "Generally Favorable";
    if (score > 0) return "Mixed or Average";
    return "";
  };

  const movieItems: Item[] = (movies.results || []).slice(0, 8).map((m: any) => ({
    type: 'movie',
    title: m.title,
    metascore: m.score,
    scoreText: mapScoreText(m.score),
    reviewCount: 0,
    url: m.link,
    imageSrc: m.imageUrl || null,
  }));

  const tvItems: Item[] = (tv.results || []).slice(0, 8).map((t: any) => ({
    type: 'tv show',
    title: t.title,
    metascore: t.score,
    scoreText: mapScoreText(t.score),
    reviewCount: 0,
    url: t.href || t.url,
    imageSrc: t.imageUrl || null,
  }));

  const gameItems: Item[] = (games.results || []).slice(0, 8).map((g: any) => ({
    type: 'game',
    title: g.title,
    metascore: g.score,
    scoreText: mapScoreText(g.score),
    reviewCount: 0,
    url: g.href,
    imageSrc: g.imageUrl || null,
  }));

  const musicItems: Item[] = (music.results || []).slice(0, 8).map((a: any) => ({
    type: 'music',
    title: `${a.title} — ${a.artist}`,
    metascore: a.score || 0,
    scoreText: mapScoreText(a.score || 0),
    reviewCount: 0,
    url: a.href,
    imageSrc: a.imageUrl || null,
  }));

  // Interleave to get a nice mix, then cap by limit
  const buckets = [movieItems, tvItems, gameItems, musicItems];
  const mixed: Item[] = [];
  let i = 0;
  while (mixed.length < limit && buckets.some(b => b.length > i)) {
    for (const b of buckets) {
      if (b[i]) mixed.push(b[i]);
      if (mixed.length >= limit) break;
    }
    i++;
  }

  return new Response(JSON.stringify({ results: mixed }), {
    headers: { "content-type": "application/json" },
  });
}


