// music section

"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Album {
  id: string;
  title: string;
  artist: string;
  score: number;
  ratingText: string;
  href: string;
  imageUrl: string;
}

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-score-green";
  if (score >= 50) return "bg-score-orange";
  return "bg-score-red";
};

const AlbumCard = ({ album }: { album: Album }) => {
  return (
    <Link href={`/music/${album.id}`} className="w-[160px] flex-shrink-0 group">
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
    </Link>
  );
};

export default function MusicSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  // Re-check scroll state when albums load
  useEffect(() => {
    if (albums.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(handleScroll, 100);
    }
  }, [albums, handleScroll]);

  // Fetch Most Popular albums from API
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setError(null);
      setLoading(true);
      try {
        const res = await fetch(`/api/music?tab=${encodeURIComponent("Most Popular")}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          const results = (data.results || []) as Album[];
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
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -550 : 550;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      
      // Update scroll state after scrolling
      setTimeout(handleScroll, 300);
    }
  };

  return (
    <section className="py-8">
      <div className="container px-4">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold text-foreground">Most Popular</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
        <div className="relative">
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
              <AlbumCard key={`most-popular-${index}`} album={album} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}