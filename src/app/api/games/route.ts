import { NextRequest } from "next/server";

// RAWG Video Games Database: https://rawg.io/apidocs
// Requires API key. Set RAWG_API_KEY in .env.local

function getEndpointForTab(tab: string) {
  switch (tab) {
    case "Top Critics' Picks":
      // Highest rated, recent year window
      return { path: "/games", params: { ordering: "-rating", dates: getRecentYearRange() } };
    case "Most Popular":
      return { path: "/games", params: { ordering: "-added" } };
    case "New Releases":
    default:
      return { path: "/games", params: { ordering: "-released", dates: getRecentMonthRange() } };
  }
}

function getRecentMonthRange(): string {
  const now = new Date();
  const past = new Date();
  past.setMonth(now.getMonth() - 1);
  return `${past.toISOString().slice(0, 10)},${now.toISOString().slice(0, 10)}`;
}

function getRecentYearRange(): string {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - 1);
  return `${past.toISOString().slice(0, 10)},${now.toISOString().slice(0, 10)}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tab = searchParams.get("tab") || "New Releases";
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("page_size") || "20";

  const apiKey = process.env.RAWG_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing RAWG_API_KEY" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const base = new URL("https://api.rawg.io/api");
  const { path, params } = getEndpointForTab(tab);
  const url = new URL(base.toString() + path);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("page", page);
  url.searchParams.set("page_size", pageSize);
  for (const [k, v] of Object.entries(params)) {
    if (v) url.searchParams.set(k, String(v));
  }

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text();
    return new Response(JSON.stringify({ error: "RAWG error", detail: text }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
  const data = await res.json();

  const results = (data.results || []).map((g: any) => ({
    id: g.id,
    title: g.name,
    score: Math.round(((g.rating || 0) as number) * 20), // RAWG 0-5 → 0-100
    ratingText: g.ratings_count > 200 ? (g.rating >= 3.75 ? "Universal Acclaim" : g.rating >= 2.5 ? "Generally Favorable" : "Mixed or Average") : "",
    href: `https://rawg.io/games/${g.slug}`,
    imageUrl: g.background_image || "",
  }));

  return new Response(JSON.stringify({ results }), {
    headers: { "content-type": "application/json" },
  });
}


