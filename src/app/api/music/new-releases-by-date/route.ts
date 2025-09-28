import { NextResponse } from "next/server";

// Source: Apple Marketing Tools RSS - New Releases (no API key needed)
// https://rss.applemarketingtools.com/api/v2/{country}/music/new-releases/{limit}/albums.json

const BASE = "https://rss.applemarketingtools.com/api/v2";
const CANDIDATE_URLS = [
  `${BASE}/us/music/new-releases/100/albums.json`,
  `${BASE}/gb/music/new-releases/100/albums.json`,
  `${BASE}/ca/music/new-releases/100/albums.json`,
];

// MusicBrainz fallback (no key required)
const MB_BASE = "https://musicbrainz.org/ws/2";
// Deezer editorial releases fallback (no key required)
const DEEZER_RELEASES = "https://api.deezer.com/editorial/0/releases";

type FeedAlbum = {
  name: string; // album title
  artistName: string;
  url?: string;
  releaseDate?: string; // YYYY-MM-DD
};

type ApiRelease = {
  title: string;
  artist: string;
  href?: string;
  score?: number; // we don't have real scores; keep undefined ("NR")
};

type ApiDay = {
  date: string; // e.g. "Sep 24, 2025"
  releases: ApiRelease[];
};

function formatDateLabel(iso: string) {
  try {
    const d = new Date(iso + "T00:00:00Z");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

async function fetchFirstWorkingFeed() {
  // Use a browser-like UA to avoid potential upstream blocking
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    Accept: "application/json",
  } as const;

  for (const url of CANDIDATE_URLS) {
    const res = await fetch(url, { next: { revalidate: 300 }, headers });
    if (res.ok) {
      try {
        const data = await res.json();
        return data;
      } catch {
        // continue to next candidate
      }
    }
  }
  return null;
}

// Fallback: fetch recent releases from MusicBrainz (last 60 days)
async function fetchMusicBrainzFallback(): Promise<{ days: ApiDay[] }> {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 60);
  const to = today.toISOString().slice(0, 10);
  const from = start.toISOString().slice(0, 10);

  // Use release-group search with first-release-date range for albums/EPs, official
  // Docs: https://musicbrainz.org/doc/MusicBrainz_API/Search
  const query = `release-group?query=(primarytype:album%20OR%20primarytype:ep)%20AND%20status:official%20AND%20firstreleasedate:[${from}%20TO%20${to}]&fmt=json&limit=200`;
  const url = `${MB_BASE}/${query}`;

  const headers = {
    // MusicBrainz requires a descriptive UA
    "User-Agent": "Metacritic-Clone/1.0 (contact: demo@example.com)",
    Accept: "application/json",
  } as const;

  try {
    const res = await fetch(url, { headers, next: { revalidate: 300 } });
    if (!res.ok) return { days: [] };
    const data = await res.json();
    const rgs = Array.isArray(data?.["release-groups"]) ? data["release-groups"] : [];

    // Group by ISO first-release-date
    const byIso = new Map<string, ApiRelease[]>();
    for (const rg of rgs) {
      const iso = (rg["first-release-date"] || "").trim();
      if (!iso) continue;
      const artistCredit = Array.isArray(rg["artist-credit"]) ? rg["artist-credit"] : [];
      const artist = artistCredit[0]?.name || "Unknown Artist";
      const entry: ApiRelease = { title: rg.title, artist, href: undefined, score: undefined };
      if (!byIso.has(iso)) byIso.set(iso, []);
      byIso.get(iso)!.push(entry);
    }

    const days: ApiDay[] = Array.from(byIso.entries())
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([iso, list]) => ({ date: formatDateLabel(iso), releases: list }));

    return { days };
  } catch {
    return { days: [] };
  }
}

// Fallback: Deezer editorial releases (not strictly date-scoped, but contains release_date per album)
async function fetchDeezerFallback(): Promise<{ days: ApiDay[] }> {
  try {
    const res = await fetch(DEEZER_RELEASES, { next: { revalidate: 300 }, headers: { Accept: "application/json" } });
    if (!res.ok) return { days: [] };
    const data = await res.json();
    const items = Array.isArray(data?.data) ? data.data : [];

    const byIso = new Map<string, ApiRelease[]>();
    for (const it of items) {
      const iso = (it.release_date || "").trim();
      if (!iso) continue;
      const entry: ApiRelease = {
        title: it.title,
        artist: it.artist?.name || it.contributors?.[0]?.name || "Unknown Artist",
        href: it.link,
        score: undefined,
      };
      if (!byIso.has(iso)) byIso.set(iso, []);
      byIso.get(iso)!.push(entry);
    }

    const days: ApiDay[] = Array.from(byIso.entries())
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([iso, list]) => ({ date: formatDateLabel(iso), releases: list }));

    return { days };
  } catch {
    return { days: [] };
  }
}

export async function GET() {
  try {
    const data = await fetchFirstWorkingFeed();

    let items: FeedAlbum[] = data?.feed?.results || [];

    // Group by ISO releaseDate to avoid locale parsing issues later
    const byIso = new Map<string, ApiRelease[]>();
    for (const item of items) {
      const iso = (item.releaseDate || "").trim();
      if (!iso) continue;
      const entry: ApiRelease = {
        title: item.name,
        artist: item.artistName,
        href: item.url,
        score: undefined, // No real metascore; UI will show "NR"
      };
      if (!byIso.has(iso)) byIso.set(iso, []);
      byIso.get(iso)!.push(entry);
    }

    let days: ApiDay[] = Array.from(byIso.entries())
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([iso, releases]) => ({ date: formatDateLabel(iso), releases }));

    // If Apple feeds produced no data, fall back to MusicBrainz
    if (!days.length) {
      const mb = await fetchMusicBrainzFallback();
      days = mb.days;
    }

    // If still empty, try Deezer editorial releases
    if (!days.length) {
      const dz = await fetchDeezerFallback();
      days = dz.days;
    }

    return NextResponse.json({ days }, { status: 200 });
  } catch (e) {
    // Final graceful fallback
    return NextResponse.json({ days: [] }, { status: 200 });
  }
}