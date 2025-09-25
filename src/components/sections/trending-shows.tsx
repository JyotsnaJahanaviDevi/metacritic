"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this utility exists, if not, it can be defined as (...classes) => classes.filter(Boolean).join(' ')

interface Show {
  title: string;
  score: number | 'tbd';
  ratingText: string;
  imageUrl: string;
  url: string;
  watchUrl: string;
}

const trendingShowsData: Show[] = [
  {
    title: "Black Rabbit",
    score: 62,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/resize/4d414a93f545417641d8e0689b9d3d3b76e5c949/catalog/provider/6/1/6-3a57a6279f53e5f416ab0c1f55b1bde8.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/black-rabbit/",
    watchUrl: "#"
  },
  {
    title: "Alien: Earth",
    score: 85,
    ratingText: "Universal Acclaim",
    imageUrl: "https://www.metacritic.com/a/img/resize/f243048598463eacc765f05b584a25d6e24ddd67/catalog/provider/2/13/2-996ff6bf60742d477bb5500e5251648a.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/alien-earth/",
    watchUrl: "#"
  },
  {
    title: "Task",
    score: 77,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/resize/924f705597a7e7ac8aa83416f0cd1706f3531b78/catalog/provider/2/13/2-748507ee7d2f3cd229340f1a6fcf7446.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/task/",
    watchUrl: "#"
  },
  {
    title: "Only Murders in the Building",
    score: 77,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/resize/2e8c281358043685e1329a174fde3d4c38d4ed0c/catalog/provider/2/13/2-9f37c222bf0504149e8cbc04d5503099.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/only-murders-in-the-building/",
    watchUrl: "#"
  },
  {
    title: "Marvel's Daredevil",
    score: 72,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/resize/624c4e0b021d7b38d3ca24d86898b0f7193240e5/catalog/provider/2/13/2-386b6ac4f469950d9990868f0a1c3d0b.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/marvels-daredevil/",
    watchUrl: "#"
  },
  {
    title: "Gen V",
    score: 73,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/resize/fedfd95914fa036e55bbdfb6033328e83b482352/catalog/provider/2/13/2-a5ec08c903a4b6bf5cb3ccbaaa289656.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/gen-v/",
    watchUrl: "#"
  },
  {
    title: "Slow Horses",
    score: 83,
    ratingText: "Universal Acclaim",
    imageUrl: "https://www.metacritic.com/a/img/resize/060b86a83688cd2677d206259e80c65511cbdd17/catalog/provider/2/13/2-3907e7b6d92f9e4142fd24177d64380b.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/slow-horses/",
    watchUrl: "#"
  },
  {
    title: "Peacemaker",
    score: 73,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/resize/2311855a90ad11cafff475b6838a34241e7f3427/catalog/provider/2/13/2-fb68c8577041aa2a945d8b2d8d80f682.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/peacemaker/",
    watchUrl: "#"
  },
  {
    title: "Jimmy Kimmel Live",
    score: "tbd",
    ratingText: "",
    imageUrl: "https://www.metacritic.com/a/img/resize/8f203dd01789c67ce7b489a81e3751a1cd40aede/catalog/provider/2/13/2-9e96fbb5de7dbf3d1b0922881a705141.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/jimmy-kimmel-live/",
    watchUrl: "#"
  },
  {
    title: "Tulsa King",
    score: 65,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/resize/81e57a3e7902d515a4b1248eb3a9e63c7886d7bc/catalog/provider/2/13/2-f8312521f1589255a02256df2cf3578b.jpg?auto=webp&fit=crop&height=222&width=150",
    url: "/tv/tulsa-king/",
    watchUrl: "#"
  }
];

const getScoreColor = (score: number | 'tbd') => {
  if (score === 'tbd') return 'border border-border bg-white text-foreground';
  if (score >= 75) return 'bg-score-green text-white';
  if (score >= 50) return 'bg-score-orange text-white';
  return 'bg-score-red text-white';
};

const WhereToWatchIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-4 w-auto">
    <path d="M17 1H1a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V2a1 1 0 00-1-1zM6 12V4l7 4-7 4z"></path>
  </svg>
);

const JustWatchLogo = () => (
    <a href="https://www.justwatch.com/" target="_blank" rel="noopener noreferrer" className="ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="80.37" height="11.95" viewBox="0 0 80.37 11.95" role="img" aria-label="JustWatch" className="fill-current">
            <path d="M63.51 11.6h-2.34l-3.21-4.73-3.21 4.73h-2.34l4.47-6.27-4.22-5.33h2.37l3 4.41 3-4.41h2.37l-4.22 5.33 4.47 6.27zm-14.2 0h-2.09v-11.6h2.09v11.6zm-3.66 0h-2.09v-11.6h2.09v11.6zm-3.69 0h-2.09v-7.1h-4.07v7.1h-2.09v-11.6h2.09v3.47h4.07v-3.47h2.09v11.6zm-17.65-4.14c-1.4 0-2.45-.96-2.45-2.31s1.05-2.31 2.45-2.31 2.45.96 2.45 2.31-1.05 2.31-2.45 2.31zm0 .35c2.58 0 4.54-1.87 4.54-4.45s-1.96-4.48-4.54-4.48-4.54 1.9-4.54 4.48 1.96 4.45 4.54 4.45zm5.95 3.79h-2.09v-11.6h2.09v11.6zm-13.88 0h-2.09v-11.6h8.05v1.94h-5.96v2.5h5.5v1.9H20v3.22h6.14v1.98h-8.23v-11.54zm-9.04 0h-2.09v-7.1h-4.07v7.1h-2.09v-11.6h2.09v3.47h4.07v-3.47h2.09v11.6zm-11.75 0h-2.09v-11.6h2.09v11.6zm-3.29 0h-2.09l-3.34-11.6h2.2l2.31 8.79 2.31-8.79h2.2l-3.59 11.6zm63.74-.29c.14.07.27.11.41.11.44 0 .8-.25.8-.92v-3.8h1.22v3.91c0 1.2-.8 1.87-2.09 1.87-.72 0-1.28-.27-1.74-.71l.4-1.16zM74.45 0v11.6h-1.22v-4.19c-.4.5-1.07.78-1.74.78-1.42 0-2.58-1.05-2.58-2.67s1.15-2.67 2.58-2.67c.67 0 1.34.28 1.74.78v-3.63h1.22zm-2.92 6.8c.85 0 1.36-.5 1.36-1.45s-.5-1.45-1.36-1.45-1.36.5-1.36 1.45.52 1.45 1.36 1.45z"></path>
        </svg>
    </a>
);


const TrendingShows = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      <section className="container mx-auto my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground">Trending Shows This Week</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-card hover:bg-secondary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-border bg-card hover:bg-secondary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
        <div className="relative">
          <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {trendingShowsData.map((show, index) => (
              <div key={index} className="flex-shrink-0 w-[150px]">
                <Link href={show.url}>
                    <Image
                      src={show.imageUrl}
                      alt={show.title}
                      width={150}
                      height={222}
                      className="rounded-lg object-cover w-[150px] h-[222px] border border-border"
                    />
                </Link>
                <Link href={show.url} className="block mt-2 text-sm font-bold text-foreground hover:text-accent transition-colors">
                  {show.title}
                </Link>
                <div className="flex items-center mt-1 h-8">
                  <div className={cn('w-8 h-8 flex items-center justify-center rounded font-bold text-base', getScoreColor(show.score))}>
                    {show.score}
                  </div>
                  {show.ratingText && <p className="text-xs text-muted-foreground ml-2 leading-tight">{show.ratingText}</p>}
                </div>
                <a href={show.watchUrl} className="mt-2 w-full border border-border rounded flex items-center justify-center py-1.5 text-xs text-foreground hover:bg-secondary transition-colors">
                  <WhereToWatchIcon />
                  <span>Where to Watch</span>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end items-center mt-2 text-xs text-muted-foreground pr-4">
          <span>Powered by</span>
          <JustWatchLogo />
        </div>
      </section>
    </>
  );
};

export default TrendingShows;