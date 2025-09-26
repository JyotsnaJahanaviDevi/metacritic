"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Album {
  title: string;
  artist: string;
  score: number;
  ratingText: string;
  href: string;
  imageUrl: string;
}

const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-score-green";
  if (score >= 50) return "bg-score-orange";
  return "bg-score-red";
};

const AlbumCard = ({ album }: { album: Album }) => (
  <a href={album.href} className="w-[160px] flex-shrink-0 group">
    <div className="w-[160px] h-[160px] rounded-lg overflow-hidden mb-2.5">
      <img
        src={album.imageUrl}
        alt={`${album.title} cover`}
        width={160}
        height={160}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
    </div>
    <h3 className="text-sm font-bold text-foreground truncate group-hover:text-primary">{album.title}</h3>
    <p className="text-xs text-text-secondary truncate mb-1.5">{album.artist}</p>
    <div className="flex items-center space-x-2">
      <div className={`w-10 h-10 flex items-center justify-center rounded text-white font-bold text-lg ${getScoreColor(album.score)}`}>
        {album.score}
      </div>
      <span className="text-xs text-text-secondary flex-1">{album.ratingText}</span>
    </div>
  </a>
);

export default function MusicSection() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Record<string, Album[]>>({});

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
    handleScroll();
  }, [activeTab, handleScroll]);

  // Fetch albums per tab with caching
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setError(null);
      const cached = cacheRef.current[activeTab];
      if (cached && cached.length) {
        setAlbums(cached);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/music?tab=${encodeURIComponent(activeTab)}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          const results = (data.results || []) as Album[];
          cacheRef.current[activeTab] = results;
          setAlbums(results);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load music');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [activeTab]);

  // Prefetch other tabs
  useEffect(() => {
    const otherTabs = TABS.filter(t => t !== activeTab);
    otherTabs.forEach(async (tab) => {
      if (cacheRef.current[tab]) return;
      try {
        const res = await fetch(`/api/music?tab=${encodeURIComponent(tab)}`);
        if (!res.ok) return;
        const data = await res.json();
        cacheRef.current[tab] = (data.results || []) as Album[];
      } catch {}
    });
  }, [activeTab]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -550 : 550;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8">
      <div className="container px-4">
        <div className="flex justify-between items-baseline mb-4">
          <div className="flex items-baseline space-x-4">
            <h2 className="text-2xl font-bold text-foreground">Music</h2>
            {/* <a href="/music/" className="text-xs font-semibold text-muted tracking-wider hover:text-primary">
              MUSIC HOME
            </a> */}
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
        <div className="border-b border-border">
          <div className="flex space-x-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-lg font-semibold transition-colors ${
                  activeTab === tab ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="relative mt-6">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scroll-smooth pb-2 -mb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading && !albums.length && (
              <>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`s-${i}`} className="flex-shrink-0 w-[160px] animate-pulse">
                    <div className="w-[160px] h-[160px] bg-secondary rounded-lg" />
                    <div className="h-4 bg-secondary rounded mt-2 w-3/4" />
                    <div className="h-3 bg-secondary rounded mt-2 w-1/2" />
                  </div>
                ))}
              </>
            )}
            {error && <div className="py-8 text-sm text-destructive">{error}</div>}
            {!loading && !error && albums.map((album, index) => (
              <AlbumCard key={`${activeTab}-${index}`} album={album} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}