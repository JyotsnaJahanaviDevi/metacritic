"use client";

import { useState, useRef, FC, useEffect } from "react";
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TvShow {
  id: number;
  title: string;
  score: number;
  scoreText: string;
  imageUrl: string;
  href: string;
}

// Data now fetched from API
const tvShowsData: TvShow[] = [];

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-score-green";
  if (score >= 50) return "bg-score-orange";
  return "bg-score-red";
};

const TvShowCard: FC<{ show: TvShow }> = ({ show }) => {
  return (
    <Link href={`/tv/${show.id}`} className="flex-shrink-0 w-[150px] group">
      <div className="aspect-[2/3] w-full bg-secondary rounded-lg overflow-hidden">
        <img
          src={show.imageUrl}
          alt={show.title}
          className="w-full h-full object-cover"
          width={150}
          height={225}
        />
      </div>
      <h3 className="mt-2 text-sm font-bold text-foreground truncate group-hover:underline">
        {show.title}
      </h3>
      <div className="flex items-center mt-1">
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-sm text-white font-bold text-base mr-2 ${getScoreColor(
            show.score,
          )}`}
        >
          {show.score}
        </div>
        <span className="text-sm text-muted-foreground">{show.scoreText}</span>
      </div>
    </Link>
  );
};

const TvShowsSection = () => {
  const [activeTab, setActiveTab] = useState("New Releases");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [shows, setShows] = useState<TvShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Record<string, TvShow[]>>({});

  const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setError(null);
      const cached = cacheRef.current[activeTab];
      if (cached && cached.length) {
        setShows(cached);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/tv?tab=${encodeURIComponent(activeTab)}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          const results = (data.results || []) as TvShow[];
          cacheRef.current[activeTab] = results;
          setShows(results);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load TV shows');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [activeTab]);

  // Prefetch other tabs
  useEffect(() => {
    const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];
    const otherTabs = TABS.filter(t => t !== activeTab);
    otherTabs.forEach(async (tab) => {
      if (cacheRef.current[tab]) return;
      try {
        const res = await fetch(`/api/tv?tab=${encodeURIComponent(tab)}`);
        if (!res.ok) return;
        const data = await res.json();
        cacheRef.current[tab] = (data.results || []) as TvShow[];
      } catch {}
    });
  }, [activeTab]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-end gap-4">
            <h2 className="text-2xl font-bold text-foreground">TV Shows</h2>
            {/* <a
              href="/tv/"
              className="text-xs font-bold text-muted-foreground tracking-widest pb-1 hover:text-foreground"
            >
              TV HOME
            </a> */}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="border border-border rounded-full w-8 h-8 flex items-center justify-center hover:bg-secondary disabled:opacity-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="border border-border rounded-full w-8 h-8 flex items-center justify-center hover:bg-secondary disabled:opacity-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        <div className="border-b border-border">
          <nav className="flex space-x-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-base font-bold pb-2 -mb-px ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pt-4 pb-2 scrollbar-hide"
        >
          {loading && !shows.length && (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`s-${i}`} className="flex-shrink-0 w-[150px] animate-pulse">
                  <div className="w-[150px] h-[222px] bg-secondary rounded" />
                  <div className="h-4 bg-secondary rounded mt-2 w-3/4" />
                </div>
              ))}
            </>
          )}
          {error && <div className="py-8 text-sm text-destructive">{error}</div>}
          {!loading && !error && shows.map((show, index) => (
            <TvShowCard key={index} show={show} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TvShowsSection;