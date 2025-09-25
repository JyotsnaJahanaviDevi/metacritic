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

const newReleases: Movie[] = [
  {
    title: "28 Years Later",
    score: 77,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1758550186.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/28-years-later/",
  },
  {
    title: "Superman",
    score: 68,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1758603611.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/superman-2025/",
  },
  {
    title: "Zero Days",
    score: 77,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-gbi_0_6-896803.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/zero-days/",
  },
];

const topCriticsPicks: Movie[] = [
    {
    title: "Airplane!",
    score: 78,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-m_0_6-11883.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/airplane!/",
  },
  {
    title: "28 Days Later...",
    score: 73,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-m_0_6-8869.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/28-days-later/",
  },
];

const mostPopular: Movie[] = [
    {
    title: "Warfare",
    score: 78,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1758416049.jpeg?auto=webp",
    link: "https://www.metacritic.com/movie/warfare/",
  },
];

const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];

const movieData: { [key: string]: Movie[] } = {
  "New Releases": newReleases,
  "Top Critics' Picks": topCriticsPicks,
  "Most Popular": mostPopular,
};
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
              {movieData[activeTab]?.map((movie, index) => (
                <MovieCard key={`${activeTab}-${index}`} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }