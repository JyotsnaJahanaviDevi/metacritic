"use client";

import React, { useState, useEffect } from "react";

type Release = {
  title: string;
  artist: string;
  score?: number;
};

type Day = {
  date: string; // e.g. "Sep 24, 2025"
  releases: Release[];
};

const getScoreColor = (score?: number) => {
  if (score === undefined) return "bg-secondary text-secondary-foreground";
  if (score >= 75) return "bg-score-green text-white";
  if (score >= 50) return "bg-score-orange text-white";
  return "bg-score-red text-white";
};

const getScoreTextColor = (score?: number) => {
  if (score === undefined) return "text-text-muted";
  if (score >= 75) return "text-score-green";
  if (score >= 50) return "text-score-orange";
  return "text-score-red";
};

const getRatingText = (score?: number) => {
  if (score === undefined) return "Not Rated";
  if (score >= 90) return "Universal acclaim";
  if (score >= 75) return "Generally favorable";
  if (score >= 50) return "Mixed or average";
  if (score >= 20) return "Generally unfavorable";
  return "Overwhelming dislike";
};

export default function NewReleasesByDate() {
  const [days, setDays] = useState<Day[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/music/new-releases-by-date", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load");
        const json = await res.json();
        const fetched: Day[] = json?.days ?? [];
        if (!mounted) return;
        setDays(fetched);
        setActive(fetched[0]?.date ?? null);
        setError(null);
      } catch (e) {
        if (!mounted) return;
        setError("Could not load new releases.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const activeDay = days.find((d) => d.date === active);

  return (
    <section className="py-8">
      <div className="container px-4">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-foreground">New Releases by Date</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="md:col-span-1">
            <ul className="space-y-2">
              {loading && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <li key={i}>
                      <div className="h-9 w-full rounded border border-border bg-secondary/50 animate-pulse" />
                    </li>
                  ))}
                </>
              )}
              {!loading && days.map((d) => (
                <li key={d.date}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded border border-border hover:bg-secondary transition-colors ${
                      active === d.date ? "bg-secondary" : "bg-card"
                    }`}
                    onClick={() => setActive(d.date)}
                  >
                    <span className="text-sm font-semibold text-foreground">{d.date}</span>
                  </button>
                </li>
              ))}
              {!loading && !days.length && (
                <li>
                  <div className="text-sm text-text-secondary">No recent release dates found.</div>
                </li>
              )}
            </ul>
          </aside>

          <div className="md:col-span-2">
            {error && (
              <div className="rounded border border-border bg-card p-4 text-sm text-destructive">
                {error}
              </div>
            )}
            {loading && (
              <ol className="divide-y divide-border rounded border border-border bg-card">
                {[...Array(6)].map((_, i) => (
                  <li key={i} className="flex items-center gap-3 p-3">
                    <div className="w-8 h-8 rounded bg-secondary animate-pulse" />
                    <div className="w-10 h-5 rounded bg-secondary animate-pulse" />
                    <div className="flex-1 h-5 rounded bg-secondary animate-pulse" />
                  </li>
                ))}
              </ol>
            )}
            {!loading && !error && activeDay && (
              <ol className="divide-y divide-border rounded border border-border bg-card">
                {activeDay.releases.map((r, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3">
                    <div className="w-8 h-8 rounded bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex flex-col items-center min-w-[52px]">
                      <div className={`px-2 py-1 rounded text-xs font-bold ${getScoreColor(r.score)}`}>
                        {r.score ?? "NR"}
                      </div>
                      <span className="mt-0.5 text-[10px] uppercase tracking-wide text-text-muted">Metascore</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{r.title}</p>
                      <p className="text-xs text-text-secondary truncate">{r.artist}</p>
                      <p className={`text-xs mt-0.5 ${getScoreTextColor(r.score)}`}>{getRatingText(r.score)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            {!loading && !error && !activeDay && days.length > 0 && (
              <div className="rounded border border-border bg-card p-4 text-sm text-text-secondary">
                Select a date to view releases.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}