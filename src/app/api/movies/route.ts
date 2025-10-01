import { NextRequest } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";

function getEndpointForTab(tab: string) {
  switch (tab) {
    case "Top Critics' Picks":
      // TMDb equivalent: top rated
      return "/movie/top_rated";
    case "Most Popular":
      return "/movie/popular";
    case "New Releases":
    default:
      // Recently released in theaters/streaming – use now_playing
      return "/movie/now_playing";
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tab = searchParams.get("tab") || "New Releases";
  const page = searchParams.get("page") || "1";
  const region = searchParams.get("region") || "US";

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing TMDB_API_KEY" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const endpoint = getEndpointForTab(tab);
  const url = new URL(TMDB_BASE + endpoint);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("page", page);
  url.searchParams.set("region", region);

  // Prefer English results but allow fallbacks
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

  // Map to UI shape used by MoviesSection
  const results = (data.results || []).map((m: any) => {
    const poster = m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : "";
    const backdrop = m.backdrop_path ? `https://image.tmdb.org/t/p/w342${m.backdrop_path}` : "";
    return {
      id: m.id,
      title: m.title || m.name,
      score: Math.round(((m.vote_average || 0) as number) * 10), // TMDb 0-10 → 0-100 style
      ratingText: m.vote_count > 500 ? (m.vote_average >= 7.5 ? "Universal Acclaim" : m.vote_average >= 5 ? "Generally Favorable" : "Mixed or Average") : "",
      imageUrl: poster || backdrop,
      link: `https://www.themoviedb.org/movie/${m.id}`,
    };
  });

  return new Response(JSON.stringify({ results }), {
    headers: { "content-type": "application/json" },
  });
}

