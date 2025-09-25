"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Movie = {
  title: string;
  score: number;
  description: string;
  imageUrl: string;
  url: string;
};

const moviesData: Movie[] = [
  { title: "Plainclothes", score: 66, description: "Generally Favorable", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-e22a7f0525d88acc150d1e370dd54c41.jpg", url: "#" },
  { title: "Another End", score: 52, description: "Mixed or Average", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-0e1bd957c5f850d94f296ac5d2dc3b03.jpg", url: "#" },
  { title: "The Summer Book", score: 61, description: "Generally Favorable", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-4b8c9424bd0e49520a7cf6433e143048.jpg", url: "#" },
  { title: "Doin' It", score: 51, description: "Mixed or Average", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-02e071e626bb36c73c23ca5551c6ac40.jpg", url: "#" },
  { title: "Megadoc", score: 73, description: "Generally Favorable", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-72cd1a877567e7a83d0f075d5f1ff4bd.jpg", url: "#" },
  { title: "Steve", score: 65, description: "Generally Favorable", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-e3d8c11e03c2317b2f6381bc59b95be4.jpg", url: "#" },
  { title: "Him", score: 39, description: "Generally Unfavorable", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-f0fec85a22d25e0a0f0ce1fd27c62c90.jpg", url: "#" },
  { title: "The Senior", score: 60, description: "Mixed or Average", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-d6682672b988f6a911a3648a31802a83.jpg", url: "#" },
  { title: "Waltzing with Brando", score: 40, description: "Mixed or Average", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-8e54737d7a746522f7ed946e300ac3ce.jpg", url: "#" },
  { title: "Adulthood", score: 53, description: "Mixed or Average", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-2e9fe556bf6eaf2e88225586617a7ec4.jpg", url: "#" },
  { title: "Swiped", score: 42, description: "Mixed or Average", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-b45b4c4ba9825b41d2f7f9035c93d9b5.jpg", url: "#" },
  { title: "Predators", score: 83, description: "Universal Acclaim", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-25f0a59be083236e6113b28b78917e82.jpg", url: "#" },
  { title: "A Big Bold Beautiful Journey", score: 42, description: "Mixed or Average", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-216997a3cf1467406c4b2bda8571ea3a.jpg", url: "#" },
  { title: "The Lost Bus", score: 64, description: "Generally Favorable", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-c68e1ab046ddc73562419409fd843813.jpg", url: "#" },
  { title: "Sunfish (& Other Stories on Green Lake)", score: 79, description: "Generally Favorable", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-d0891dff320e8b15d2a6a133f8eff0eb.jpg", url: "#" },
  { title: "The Man in My Basement", score: 51, description: "Mixed or Average", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-be089aacbc01594916aab4b136d8d85f.jpg", url: "#" },
  { title: "Happyend", score: 75, description: "Generally Favorable", imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-6d601d0a520ff51d18f5044455f75e03.jpg", url: "#" },
];

const getScoreColor = (score: number) => {
  if (score >= 75) return 'bg-score-green';
  if (score >= 50) return 'bg-score-orange';
  return 'bg-score-red';
};

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <div className="flex-shrink-0 w-[150px]">
    <a href={movie.url} className="group block">
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
      <p className="text-xs text-muted-foreground">{movie.description}</p>
    </div>
  </div>
);

const MoviesSection: React.FC = () => {
  const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth -1);
    }
  }, []);

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);

    return () => {
      container?.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-baseline">
            <h2 className="text-2xl font-bold text-foreground">Movies</h2>
            {/* <a href="#" className="ml-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Movies Home</a> */}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center bg-card shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full border-2 border-foreground flex items-center justify-center bg-card shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div className="border-b border-border mb-6">
          <div className="flex items-center">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 mr-6 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 -mb-4 gap-4 scroll-smooth scrollbar-hide"
        >
          {moviesData.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesSection;