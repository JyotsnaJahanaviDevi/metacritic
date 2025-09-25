"use client";

import React, { useState } from "react";

type Release = {
  title: string;
  artist: string;
  score?: number;
};

type Day = {
  date: string; // e.g. "Sep 24, 2025"
  releases: Release[];
};

const DATA: Day[] = [
  {
    date: "Sep 24, 2025",
    releases: [
      { title: "Static Bloom", artist: "Violet Echo", score: 85 },
      { title: "Paper Suns", artist: "Golden Motel", score: 72 },
      { title: "Low Tide High", artist: "Seafoam", score: 64 },
    ],
  },
  {
    date: "Sep 23, 2025",
    releases: [
      { title: "Northern Lights", artist: "Aurora Fields", score: 88 },
      { title: "Afterimages", artist: "Neon Motif", score: 74 },
      { title: "Polychrome", artist: "Colorwheel", score: 79 },
    ],
  },
  {
    date: "Sep 22, 2025",
    releases: [
      { title: "Green Skies", artist: "Neon Rivers", score: 81 },
      { title: "Echoes of Dawn", artist: "Horizon Lines", score: 76 },
      { title: "Midnight Parade", artist: "City Lights", score: 69 },
    ],
  },
];

const getScoreColor = (score?: number) => {
  if (score === undefined) return "bg-secondary text-secondary-foreground";
  if (score >= 75) return "bg-score-green text-white";
  if (score >= 50) return "bg-score-orange text-white";
  return "bg-score-red text-white";
};

export default function NewReleasesByDate() {
  const [active, setActive] = useState<string>(DATA[0].date);
  const activeDay = DATA.find((d) => d.date === active) ?? DATA[0];

  return (
    <section className="py-8">
      <div className="container px-4">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-foreground">New Releases by Date</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="md:col-span-1">
            <ul className="space-y-2">
              {DATA.map((d) => (
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
            </ul>
          </aside>

          <div className="md:col-span-2">
            <ol className="divide-y divide-border rounded border border-border bg-card">
              {activeDay.releases.map((r, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3">
                  <div className="w-8 h-8 rounded bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div className={`min-w-0 px-2 py-1 rounded text-xs font-bold ${getScoreColor(r.score)}`}>
                    {r.score ?? "NR"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{r.title}</p>
                    <p className="text-xs text-text-secondary truncate">{r.artist}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}