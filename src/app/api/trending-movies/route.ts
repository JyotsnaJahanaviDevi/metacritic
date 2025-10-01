import { NextRequest } from "next/server";

// TMDb trending for movies: /trending/movie/{time_window}
// time_window can be 'day' or 'week'. We'll default to 'week'.

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

  const url = new URL(`https://api.themoviedb.org/3/trending/movie/${window}`);
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

  const results = (data.results || []).map((m: any) => ({
    title: m.title || m.name,
    score: Math.round(((m.vote_average || 0) as number) * 10),
    ratingText: m.vote_count > 500 ? (m.vote_average >= 7.5 ? "Universal Acclaim" : m.vote_average >= 5 ? "Generally Favorable" : "Mixed or Average") : "",
    imageUrl: m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : "",
    link: `https://www.themoviedb.org/movie/${m.id}`,
  }));

  return new Response(JSON.stringify({ results }), {
    headers: { "content-type": "application/json" },
  });
}

