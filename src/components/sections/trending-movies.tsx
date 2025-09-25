"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Movie = {
  title: string;
  score: number;
  ratingText: string;
  imageUrl: string;
  link: string;
};

const trendingMovies: Movie[] = [
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
  {
    title: "Lucky",
    score: 80,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-879109.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/lucky-2017/",
  },
  {
    title: "Warfare",
    score: 78,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1758416049.jpeg?auto=webp",
    link: "https://www.metacritic.com/movie/warfare/",
  },
  {
    title: "The Square",
    score: 73,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-880629.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/the-square-2017/",
  },
  {
    title: "Friendship",
    score: 72,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1758416047.jpeg?auto=webp",
    link: "https://www.metacritic.com/movie/friendship/",
  },
  {
    title: "28 Weeks Later",
    score: 78,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-724131.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/28-weeks-later/",
  },
  {
    title: "Sinners",
    score: 84,
    ratingText: "Universal Acclaim",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1758532450.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/sinners/",
  },
  {
    title: "The Thursday Murder Club",
    score: 60,
    ratingText: "Mixed or Average",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1758550189.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/the-thursday-murder-club/",
  },
  {
    title: "Thunderbolts*",
    score: 68,
    ratingText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1758603610.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/thunderbolts/",
  },
  {
    title: "Mister America",
    score: 42,
    ratingText: "Mixed or Average",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1748259838.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/mister-america/",
  },
  {
    title: "Black Bag",
    score: 85,
    ratingText: "Universal Acclaim",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/6/1/6-1758550175.jpg?auto=webp",
    link: "https://www.metacritic.com/movie/black-bag/",
  },
];

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-score-green";
  if (score >= 50) return "bg-score-orange";
  return "bg-score-red";
};

const WhereToWatchIcon = () => (
    <svg viewBox="0 0 20 20" className="w-4 h-4 mr-1 fill-current" aria-hidden="true">
        <path d="M14.17 4.31A.5.5 0 0013.5 4H.5a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V4.81a.5.5 0 00-.33-.47zM13 15H1V5h12v10z"></path>
        <path d="M19.5 7H15V6h4.5a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H15v-1h4V7zM8.53 11.83a.5.5 0 00.74-.02l3-3a.5.5 0 000-.69l-3-3a.5.5 0 00-.72.71L11.05 9 8.52 11.14a.5.5 0 00.01.69z"></path>
    </svg>
);

const JustWatchLogo = () => (
    <svg viewBox="0 0 76 18" className="h-[11px] w-auto" aria-labelledby="justwatch-logo-title">
        <title id="justwatch-logo-title">JustWatch</title>
        <path d="M64.3 12.3c0-2-1.7-3.9-4.2-3.9s-4.2 1.9-4.2 3.9c0 2 1.7 3.9 4.2 3.9s4.2-1.8 4.2-3.9zm-6.2 0c0-1 .8-1.7 2-1.7s2 .7 2 1.7-.8 1.7-2 1.7-2-.7-2-1.7z" fill="#2c2c2c"></path>
        <path d="M60.1 2.3v5.6h-1.6V4.4L55.3 16h-1.8L50.4 4.4v11.6h-1.6V2.3h3.5l2.6 7.7 2.6-7.7zM75.8 8.4h-3.3V6.3h2.6V4.4h-2.6V2.3h3.3c.7 0 1.2.6 1.2 1.2v3.7c0 .6-.5 1.2-1.2 1.2M34.7 15.6V0h6.2c3.2 0 4.8 1.6 4.8 4.3s-1.6 4.3-4.8 4.3h-4.6v7zm4.6-6.5c2.3 0 3-1 3-2.2s-.7-2.1-3-2.1h-4.6v4.3h4.6zm-17 6.5V0h1.6v6.9h4.3V0h1.6v15.6h-1.6V8.5h-4.3v7.1h-1.6zm6.3-15.6l-5.6 15.6h-1.6L7.2 0h1.7l4.8 13.5 4.8-13.5H24zm22.9 11.2c0-2.6 1.8-4.5 4.6-4.5 1.5 0 2.8.5 3.7 1.4V0h1.6v15.6h-1.4c-.9-1-2.2-1.5-3.8-1.5-2.8.1-4.7 2-4.7 4.6s1.9 4.6 4.7 4.6c1.6 0 2.9-.5 3.8-1.5h1.4v2.1c-.9.9-2.2 1.4-3.7 1.4-4.5 0-7.8-3.3-7.8-7.2zm4.7 7.2c-2 0-3.1-1.3-3.1-2.6s1.1-2.6 3.1-2.6 3.1 1.3 3.1 2.6-1.1 2.6-3.1 2.6zM0 15.6V0h1.6v15.6H0z" fill="#2c2c2c"></path>
    </svg>
);

const MovieCard = ({ movie }: { movie: Movie }) => (
    <div className="flex-shrink-0 w-[150px] flex flex-col space-y-2 group">
        <a href={movie.link} target="_blank" rel="noopener noreferrer">
            <div className="w-[150px] h-[225px] relative rounded-lg overflow-hidden border border-border bg-hover-gray">
                <Image
                    src={movie.imageUrl}
                    alt={`Poster for ${movie.title}`}
                    width={150}
                    height={225}
                    className="object-cover w-full h-full"
                />
            </div>
        </a>
        <a href={movie.link} target="_blank" rel="noopener noreferrer" className="block text-sm font-bold text-foreground leading-tight hover:underline">
            {movie.title}
        </a>
        <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 flex items-center justify-center font-bold text-lg text-white rounded ${getScoreColor(movie.score)}`}>
                {movie.score}
            </div>
            <span className="text-xs text-text-secondary">{movie.ratingText}</span>
        </div>
        <a href="#" className="flex items-center justify-center text-xs text-foreground bg-white border border-border rounded-md px-3 py-[7px] w-full hover:bg-secondary">
            <WhereToWatchIcon />
            Where to Watch
        </a>
    </div>
);

const TrendingMoviesSection = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-foreground">Trending Movies This Week</h2>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => scroll('left')} className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-50" aria-label="Scroll left">
                            <ChevronLeft className="w-5 h-5 text-foreground" />
                        </button>
                        <button onClick={() => scroll('right')} className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-card hover:bg-secondary disabled:opacity-50" aria-label="Scroll right">
                            <ChevronRight className="w-5 h-5 text-foreground" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex space-x-4 overflow-x-auto pb-4 -mb-4 scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {trendingMovies.map((movie, index) => (
                            <MovieCard key={index} movie={movie} />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end items-center mt-4 pt-4">
                    <span className="text-xs text-text-muted mr-2">Powered by</span>
                    <JustWatchLogo />
                </div>
            </div>
        </section>
    );
};

export default TrendingMoviesSection;