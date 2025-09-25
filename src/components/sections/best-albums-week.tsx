"use client";

import React from "react";

type Album = {
  title: string;
  artist: string;
  score: number;
  href?: string;
};

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-score-green";
  if (score >= 50) return "bg-score-orange";
  return "bg-score-red";
};

const albums: Album[] = [
  { title: "Northern Lights", artist: "Aurora Fields", score: 88 },
  { title: "Night Arcade", artist: "Sundown Drive", score: 87 },
  { title: "Glass Waves", artist: "Prism Harbor", score: 83 },
  { title: "Golden Hour", artist: "Sun Motel", score: 82 },
  { title: "Green Skies", artist: "Neon Rivers", score: 81 },
  { title: "Polychrome", artist: "Colorwheel", score: 79 },
  { title: "Monochrome City", artist: "Grey Avenue", score: 78 },
];

export default function BestAlbumsWeek() {
  return (
    <section className="py-8">
      <div className="container px-4">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Best Albums This Week</h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((a, idx) => (
            <li key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card shadow-sm hover:shadow transition-shadow">
              <div className="w-8 h-8 rounded bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div className={`w-10 h-10 rounded text-white font-bold flex items-center justify-center ${getScoreColor(a.score)}`}>
                {a.score}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{a.title}</p>
                <p className="text-xs text-text-secondary truncate">{a.artist}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}