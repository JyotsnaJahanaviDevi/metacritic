"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Movie = {
  title: string;
  score: number;
  ratingText: string;
  imageUrl: string;
  link: string;
};

const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];
const getScoreColor = (score: number) => {
  if (score >= 75) return 'bg-score-green';
  if (score >= 50) return 'bg-score-orange';
  return 'bg-score-red';
};

const MovieCard = ({ movie }: { movie: Movie }) => (
  <div className="flex-shrink-0 w-[150px]">
    <a href={movie.link} className="group block">
      <div className="w-full aspect-[2/3] rounded-md overflow-hidden bg-muted">
        <Image
          src={movie.imageUrl}
          alt={movie.title}
          width={150}
          height={225}
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        />
      </div>
      <h3 className="font-bold text-sm text-foreground truncate mt-2">{movie.title}</h3>
    </a>
    <div className="flex items-center mt-1 gap-2">
      <div className={`w-8 h-8 flex items-center justify-center rounded font-bold text-lg text-white ${getScoreColor(movie.score)}`}>
        {movie.score}
      </div>
      <p className="text-xs text-muted-foreground">{movie.ratingText}</p>
    </div>
  </div>
);

export default function MoviesSection() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Record<string, Movie[]>>({});

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
      handleScroll(); // Initial check
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Reset scroll on tab change
  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0;
    }
    handleScroll();
  }, [activeTab, handleScroll]);

  // Fetch movies when tab changes with in-memory caching
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setError(null);
      const cached = cacheRef.current[activeTab];
      if (cached && cached.length) {
        setMovies(cached);
        setLoading(false);
        // Recalculate buttons after paint
        setTimeout(() => handleScroll(), 0);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/movies?tab=${encodeURIComponent(activeTab)}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          const results = (data.results || []) as Movie[];
          cacheRef.current[activeTab] = results;
          setMovies(results);
          setTimeout(() => handleScroll(), 0);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load movies');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [activeTab]);

  // Prefetch other tabs in background for instant switching
  useEffect(() => {
    const otherTabs = TABS.filter(t => t !== activeTab);
    otherTabs.forEach(async (tab) => {
      if (cacheRef.current[tab]) return;
      try {
        const res = await fetch(`/api/movies?tab=${encodeURIComponent(tab)}`);
        if (!res.ok) return;
        const data = await res.json();
        cacheRef.current[tab] = (data.results || []) as Movie[];
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
              <h2 className="text-2xl font-bold text-foreground">Movies</h2>
              {/* <a href="/game/" className="text-xs font-semibold text-muted tracking-wider hover:text-primary">
                GAMES HOME
              </a> */}
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
                  aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
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
                  className={`pb-2 text-lg font-semibold transition-colors
                    ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}`}
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
              {loading && !movies.length && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`s-${i}`} className="flex-shrink-0 w-[150px] animate-pulse">
                      <div className="w-[150px] h-[225px] bg-secondary rounded-md" />
                      <div className="h-4 bg-secondary rounded mt-2 w-3/4" />
                      <div className="h-3 bg-secondary rounded mt-2 w-1/2" />
                    </div>
                  ))}
                </>
              )}
              {error && <div className="py-8 text-sm text-destructive">{error}</div>}
              {!loading && !error && movies.map((movie, index) => (
                <MovieCard key={`${activeTab}-${index}`} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }