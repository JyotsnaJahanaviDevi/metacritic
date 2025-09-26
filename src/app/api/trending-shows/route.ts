import { NextRequest } from "next/server";

// TMDb trending for TV: /trending/tv/{time_window}
// Default to 'week'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const window = searchParams.get("window") === "day" ? "day" : "week";

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing TMDB_API_KEY" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const url = new URL(`https://api.themoviedb.org/3/trending/tv/${window}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "en-US");

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text();
    return new Response(JSON.stringify({ error: "TMDb error", detail: text }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
  const data = await res.json();

  const results = (data.results || []).map((s: any) => ({
    title: s.name || s.original_name,
    score: Math.round(((s.vote_average || 0) as number) * 10),
    ratingText: s.vote_count > 200 ? (s.vote_average >= 7.5 ? "Universal Acclaim" : s.vote_average >= 5 ? "Generally Favorable" : "Mixed or Average") : "",
    imageUrl: s.poster_path ? `https://image.tmdb.org/t/p/w342${s.poster_path}` : "",
    url: `https://www.themoviedb.org/tv/${s.id}`,
    watchUrl: "#",
  }));

  return new Response(JSON.stringify({ results }), {
    headers: { "content-type": "application/json" },
  });
}


