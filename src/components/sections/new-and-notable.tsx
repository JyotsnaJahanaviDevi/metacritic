"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

interface NotableItem {
  imageSrc: string | null;
  title: string;
  type: 'tv show' | 'game' | 'movie' | 'season' | 'music';
  metascore: number;
  scoreText: string;
  reviewCount: number;
  url: string;
}

const notableData: NotableItem[] = [];

const getScoreColorClass = (score: number) => {
  if (score >= 75) return 'bg-score-green';
  if (score >= 50) return 'bg-score-orange';
  return 'bg-score-red';
};

const NotableCard = ({ item }: { item: NotableItem }) => {
  const scoreColorClass = getScoreColorClass(item.metascore);

  return (
    <a href={item.url} className="block w-[300px] flex-shrink-0 bg-secondary rounded-lg border-t-4 border-chart-1 overflow-hidden group">
      <div className="relative w-full h-[170px] bg-gray-200">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.title}
            width={300}
            height={170}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4 bg-card h-full">
        <h3 className="font-bold text-xl text-foreground mb-2 truncate leading-tight">{item.title}</h3>
        <span className="text-xs text-muted-foreground border border-border rounded-sm px-1.5 py-0.5">{item.type}</span>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-end">
            <div className="text-left w-[180px]">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Metascore</p>
              <p className="text-sm font-bold text-foreground mt-1 leading-tight">{item.scoreText}</p>
              <small className="text-xs text-muted-foreground">Based on {item.reviewCount} Critic Reviews</small>
            </div>
            <div className={`w-10 h-10 flex items-center justify-center rounded-md text-white font-bold text-2xl ${scoreColorClass}`}>
              {item.metascore}
            </div>
          </div>
          <div className={`mt-2 h-1 rounded w-full ${scoreColorClass}`}></div>
        </div>
      </div>
    </a>
  );
};

export default function NewAndNotable() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<NotableItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<NotableItem[] | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300 + 16;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setError(null);
      if (cacheRef.current) {
        setItems(cacheRef.current);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch('/api/new-and-notable');
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        const results = (data.results || []) as NotableItem[];
        cacheRef.current = results;
        if (!cancelled) setItems(results);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="container mx-auto py-8 border-b border-border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">New and Notable</h2>
        <div className="flex items-center space-x-2">
          <button onClick={() => scroll('left')} aria-label="Scroll left" className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={() => scroll('right')} aria-label="Scroll right" className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {loading && !items.length && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`s-${i}`} className="snap-start block w-[300px] flex-shrink-0">
                <div className="w-[300px] h-[170px] bg-secondary rounded" />
                <div className="h-5 bg-secondary rounded mt-3 w-5/6" />
                <div className="h-4 bg-secondary rounded mt-2 w-1/3" />
              </div>
            ))}
          </>
        )}
        {error && <div className="py-8 text-sm text-destructive">{error}</div>}
        {!loading && !error && items.map((item, index) => (
          <div key={index} className="snap-start">
            <NotableCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}