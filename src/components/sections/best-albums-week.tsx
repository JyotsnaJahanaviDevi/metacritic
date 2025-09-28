"use client";

import React, { useEffect, useState } from "react";

type Album = {
  title: string;
  artist: string;
  score: number;
  imageUrl: string;
  href: string;
};

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-score-green text-white";
  if (score >= 50) return "bg-score-orange text-white";
  return "bg-score-red text-white";
};

export default function BestAlbumsWeek() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/albums", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch albums");
        const data = await res.json();
        if (!cancelled) setAlbums(Array.isArray(data?.albums) ? data.albums : []);
      } catch (e) {
        if (!cancelled) setError("Unable to load albums right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-8">
      <div className="container px-4">
        <div className="mb-4 flex items-baseline justify-between">
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-bold text-foreground">Best Albums This Week</h2>
            <a
              href="/music/"
              className="text-xs font-semibold text-muted tracking-wider hover:text-primary"
            >
              MUSIC HOME
            </a>
          </div>
          <a href="/music/" className="text-xs font-semibold text-primary hover:underline">
            SEE ALL
          </a>
        </div>

        {loading ? (
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="flex gap-3 rounded border border-border bg-card p-3 animate-pulse">
                <div className="flex flex-col items-center w-10 shrink-0">
                  <div className="w-8 h-8 rounded bg-secondary" />
                </div>
                <div className="w-16 h-16 rounded overflow-hidden shrink-0 bg-secondary" />
                <div className="min-w-0 flex-1">
                  <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
                  <div className="h-3 bg-secondary rounded w-1/2" />
                  <div className="mt-3 h-6 bg-secondary rounded w-20" />
                </div>
              </li>
            ))}
          </ol>
        ) : error ? (
          <div className="text-sm text-text-secondary">{error}</div>
        ) : (
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {albums.map((album, idx) => (
              <li key={album.title + idx} className="group">
                <a
                  href={album.href}
                  className="flex gap-3 rounded border border-border bg-card p-3 hover:bg-secondary transition-colors"
                >
                  <div className="flex flex-col items-center w-10 shrink-0">
                    <div className="w-8 h-8 rounded bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                  </div>

                  <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                    <img
                      src={album.imageUrl}
                      alt={`${album.title} cover`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-foreground truncate group-hover:text-primary">
                      {album.title}
                    </h3>
                    <p className="text-xs text-text-secondary truncate">{album.artist}</p>

                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className={`px-2 py-1 rounded text-xs font-bold ${getScoreColor(
                          album.score
                        )}`}
                      >
                        {album.score}
                      </div>
                      <span className="text-[11px] text-text-muted">Metascore</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}