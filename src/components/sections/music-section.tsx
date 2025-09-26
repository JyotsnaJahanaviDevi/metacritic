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

const newReleases: Album[] = [
  {
    title: "Green Skies",
    artist: "Neon Rivers",
    score: 81,
    ratingText: "Generally Favorable",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758610530.jpg",
  },
  {
    title: "Echoes of Dawn",
    artist: "Horizon Lines",
    score: 76,
    ratingText: "Generally Favorable",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758607621.jpg",
  },
  {
    title: "Midnight Parade",
    artist: "City Lights",
    score: 69,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758610191.jpg",
  },
  {
    title: "Static Bloom",
    artist: "Violet Echo",
    score: 85,
    ratingText: "Universal Acclaim",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758612130.jpg",
  },
  {
    title: "Paper Suns",
    artist: "Golden Motel",
    score: 72,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758632646.jpg",
  },
  {
    title: "Low Tide High",
    artist: "Seafoam",
    score: 64,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758814761.jpg",
  },
];

const topCriticsPicks: Album[] = [
  {
    title: "Northern Lights",
    artist: "Aurora Fields",
    score: 88,
    ratingText: "Universal Acclaim",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758815254.jpg",
  },
  {
    title: "Glass Waves",
    artist: "Prism Harbor",
    score: 83,
    ratingText: "Generally Favorable",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758610444.jpg",
  },
  {
    title: "Monochrome City",
    artist: "Grey Avenue",
    score: 78,
    ratingText: "Generally Favorable",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758633096.jpg",
  },
  {
    title: "Afterimages",
    artist: "Neon Motif",
    score: 74,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758611295.jpg",
  },
  {
    title: "Polychrome",
    artist: "Colorwheel",
    score: 79,
    ratingText: "Generally Favorable",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758611181.jpg",
  },
];

const mostPopular: Album[] = [
  {
    title: "Electric Map",
    artist: "Atlas Drive",
    score: 71,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758608031.jpg",
  },
  {
    title: "Golden Hour",
    artist: "Sun Motel",
    score: 82,
    ratingText: "Generally Favorable",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758609559.jpg",
  },
  {
    title: "City Circuit",
    artist: "Analog Park",
    score: 66,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758610057.jpg",
  },
  {
    title: "Night Arcade",
    artist: "Sundown Drive",
    score: 87,
    ratingText: "Universal Acclaim",
    href: "https://www.metacritic.com/music/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758814881.jpg",
  },
];

const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];

const albumData: { [key: string]: Album[] } = {
  "New Releases": newReleases,
  "Top Critics' Picks": topCriticsPicks,
  "Most Popular": mostPopular,
};

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
            <h2 className="text-2xl font-bold text-foreground">Top Albums Right Now</h2>
            <a href="/music/" className="text-xs font-semibold text-muted tracking-wider hover:text-primary">
              MUSIC HOME
            </a>
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
            {albumData[activeTab]?.map((album, index) => (
              <AlbumCard key={`${activeTab}-${index}`} album={album} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}