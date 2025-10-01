import { NextRequest } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";

function getEndpointForTab(tab: string) {
  switch (tab) {
    case "Top Critics' Picks":
      return "/tv/top_rated";
    case "Most Popular":
      return "/tv/popular";
    case "New Releases":
    default:
      return "/tv/on_the_air"; // airing now / recently
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
  url.searchParams.set("language", "en-US");
  // region mostly affects movies; for TV, keep language only

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
    id: s.id,
    title: s.name || s.original_name,
    score: Math.round(((s.vote_average || 0) as number) * 10),
    scoreText: s.vote_count > 200 ? (s.vote_average >= 7.5 ? "Universal Acclaim" : s.vote_average >= 5 ? "Generally Favorable" : "Mixed or Average") : "",
    imageUrl: s.poster_path ? `https://image.tmdb.org/t/p/w342${s.poster_path}` : "",
    href: `https://www.themoviedb.org/tv/${s.id}`,
  }));

  return new Response(JSON.stringify({ results }), {
    headers: { "content-type": "application/json" },
  });
}


