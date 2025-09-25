"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Game {
  title: string;
  score: number;
  ratingText: string;
  href: string;
  imageUrl: string; 
}

const newReleases: Game[] = [
  {
    title: "Baby Steps",
    score: 77,
    ratingText: "Generally Favorable",
    href: "https://www.metacritic.com/game/baby-steps/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758607409.jpg",
  },
  {
    title: "Towa and the Guardians of the Sacred Tree",
    score: 74,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/game/towa-and-the-guardians-of-the-sacred-tree/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758838321.jpg",
  },
  {
    title: "Trails in the Sky 1st Chapter",
    score: 90,
    ratingText: "Universal Acclaim",
    href: "https://www.metacritic.com/game/trails-in-the-sky-1st-chapter/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758814761.jpg",
  },
  {
    title: "Moros Protocol",
    score: 67,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/game/moros-protocol/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758632646.jpg",
  },
  {
    title: "Formula Legends",
    score: 68,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/game/formula-legends/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758611181.jpg",
  },
  {
    title: "Arctic Awakening",
    score: 60,
    ratingText: "Mixed or Average",
    href: "https://www.metacritic.com/game/arctic-awakening/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758607621.jpg",
  },
  {
    title: "Platypus Reclayed",
    score: 85,
    ratingText: "Generally Favorable",
    href: "https://www.metacritic.com/game/platypus-reclayed/",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758815143.jpg",
  },
];

const topCriticsPicks: Game[] = [
    {
        title: "Dying Light: The Beast",
        score: 79,
        ratingText: "Generally Favorable",
        href: "https://www.metacritic.com/game/dying-light-the-beast/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758610530.jpg",
      },
      {
        title: "Deep Rock Galactic: Survivor",
        score: 86,
        ratingText: "Generally Favorable",
        href: "https://www.metacritic.com/game/deep-rock-galactic-survivor/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758610191.jpg",
      },
      {
        title: "Strange Antiquities",
        score: 83,
        ratingText: "Generally Favorable",
        href: "https://www.metacritic.com/game/strange-antiquities/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758815254.jpg",
      },
      {
        title: "Henry Halfhead",
        score: 73,
        ratingText: "Mixed or Average",
        href: "https://www.metacritic.com/game/henry-halfhead/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758611394.jpg",
      },
      {
        title: "Assassin's Creed Shadows: Claws of Awaji",
        score: 71,
        ratingText: "Mixed or Average",
        href: "https://www.metacritic.com/game/assassins-creed-shadows-claws-of-awaji/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758607736.jpg",
      },
      {
        title: "No, I'm not a Human",
        score: 77,
        ratingText: "Generally Favorable",
        href: "https://www.metacritic.com/game/no-im-not-a-human/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758814881.jpg",
      },
      {
        title: "LEGO Voyagers",
        score: 79,
        ratingText: "Generally Favorable",
        href: "https://www.metacritic.com/game/lego-voyagers/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758612130.jpg",
      },
];

const mostPopular: Game[] = [
    {
        title: "Gloomy Eyes",
        score: 77,
        ratingText: "Generally Favorable",
        href: "https://www.metacritic.com/game/gloomy-eyes/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758611295.jpg",
      },
      {
        title: "NHL 26",
        score: 74,
        ratingText: "Mixed or Average",
        href: "https://www.metacritic.com/game/nhl-26/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758633096.jpg",
      },
      {
        title: "Donkey Kong Bananza: DK Island & Emerald Rush",
        score: 63,
        ratingText: "Mixed or Average",
        href: "https://www.metacritic.com/game/donkey-kong-bananza-dk-island-and-emerald-rush/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758610444.jpg",
      },
      {
        title: "Borderlands 4",
        score: 82,
        ratingText: "Generally Favorable",
        href: "https://www.metacritic.com/game/borderlands-4/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758608031.jpg",
      },
      {
        title: "Chrono Gear: Warden of Time",
        score: 78,
        ratingText: "Generally Favorable",
        href: "https://www.metacritic.com/game/chrono-gear-warden-of-time/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758609559.jpg",
      },
      {
        title: "Dead Reset",
        score: 68,
        ratingText: "Mixed or Average",
        href: "https://www.metacritic.com/game/dead-reset/",
        imageUrl: "https://www.metacritic.com/a/img/catalog/provider/7/2/7-1758610057.jpg",
      },
];

const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];

const gameData: { [key: string]: Game[] } = {
  "New Releases": newReleases,
  "Top Critics' Picks": topCriticsPicks,
  "Most Popular": mostPopular,
};

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-score-green";
  if (score >= 50) return "bg-score-orange";
  return "bg-score-red";
};

const GameCard = ({ game }: { game: Game }) => (
  <a href={game.href} className="w-[160px] flex-shrink-0 group">
    <div className="w-[160px] h-[213px] rounded-lg overflow-hidden mb-2.5">
      <img
        src={game.imageUrl}
        alt={game.title}
        width={160}
        height={213}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
    </div>
    <h3 className="text-sm font-bold text-foreground truncate mb-1.5 group-hover:text-primary">{game.title}</h3>
    <div className="flex items-center space-x-2">
      <div className={`w-10 h-10 flex items-center justify-center rounded text-white font-bold text-lg ${getScoreColor(game.score)}`}>
        {game.score}
      </div>
      <span className="text-xs text-text-secondary flex-1">{game.ratingText}</span>
    </div>
  </a>
);

export default function GamesSection() {
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
            <h2 className="text-2xl font-bold text-foreground">Games</h2>
            <a href="/game/" className="text-xs font-semibold text-muted tracking-wider hover:text-primary">
              GAMES HOME
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
            {gameData[activeTab]?.map((game, index) => (
              <GameCard key={`${activeTab}-${index}`} game={game} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}