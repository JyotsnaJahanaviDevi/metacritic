"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

interface NotableItem {
  imageSrc: string | null;
  title: string;
  type: 'tv show' | 'game' | 'movie' | 'season';
  metascore: number;
  scoreText: string;
  reviewCount: number;
  url: string;
}

const notableData: NotableItem[] = [
  {
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/33948b3a-03f0-422c-8a95-9c28dffaf395-metacritic-com/assets/images/poster-14.jpg?',
    title: 'The Lowdown',
    type: 'tv show',
    metascore: 87,
    scoreText: 'Universal Acclaim',
    reviewCount: 24,
    url: 'https://www.metacritic.com/tv/the-lowdown/',
  },
  {
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/33948b3a-03f0-422c-8a95-9c28dffaf395-metacritic-com/assets/images/poster-15.jpg?',
    title: 'Silent Hill f',
    type: 'game',
    metascore: 86,
    scoreText: 'Generally Favorable',
    reviewCount: 80,
    url: 'https://www.metacritic.com/game/silent-hill-f/',
  },
  {
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/33948b3a-03f0-422c-8a95-9c28dffaf395-metacritic-com/assets/images/poster-11.jpg?',
    title: 'One Battle After Another',
    type: 'movie',
    metascore: 96,
    scoreText: 'Universal Acclaim',
    reviewCount: 40,
    url: 'https://www.metacritic.com/movie/one-battle-after-another/',
  },
  {
    imageSrc: null,
    title: 'Baby Steps',
    type: 'game',
    metascore: 77,
    scoreText: 'Generally Favorable',
    reviewCount: 19,
    url: 'https://www.metacritic.com/game/baby-steps/',
  },
  {
    imageSrc: null,
    title: 'Slow Horses: Season 5',
    type: 'season',
    metascore: 85,
    scoreText: 'Universal Acclaim',
    reviewCount: 6,
    url: 'https://www.metacritic.com/tv/slow-horses/season-5/',
  },
  {
    imageSrc: null,
    title: 'Dying Light: The Beast',
    type: 'game',
    metascore: 79,
    scoreText: 'Generally Favorable',
    reviewCount: 56,
    url: 'https://www.metacritic.com/game/dying-light-the-beast/',
  },
  {
    imageSrc: null,
    title: 'Hollow Knight: Silksong',
    type: 'game',
    metascore: 92,
    scoreText: 'Universal Acclaim',
    reviewCount: 33,
    url: 'https://www.metacritic.com/game/hollow-knight-silksong/',
  },
  {
    imageSrc: null,
    title: 'Trails in the Sky 1st Chapter',
    type: 'game',
    metascore: 90,
    scoreText: 'Universal Acclaim',
    reviewCount: 14,
    url: 'https://www.metacritic.com/game/trails-in-the-sky-1st-chapter/',
  },
  {
    imageSrc: null,
    title: 'Sonic Racing: CrossWorlds',
    type: 'game',
    metascore: 83,
    scoreText: 'Generally Favorable',
    reviewCount: 57,
    url: 'https://www.metacritic.com/game/sonic-racing-crossworlds/',
  },
  {
    imageSrc: null,
    title: 'EA Sports FC 26',
    type: 'game',
    metascore: 83,
    scoreText: 'Generally Favorable',
    reviewCount: 22,
    url: 'https://www.metacritic.com/game/ea-sports-fc-26/',
  },
  {
    imageSrc: null,
    title: 'Him',
    type: 'movie',
    metascore: 39,
    scoreText: 'Generally Unfavorable',
    reviewCount: 33,
    url: 'https://www.metacritic.com/movie/him/',
  },
  {
    imageSrc: null,
    title: 'Borderlands 4',
    type: 'game',
    metascore: 82,
    scoreText: 'Generally Favorable',
    reviewCount: 82,
    url: 'https://www.metacritic.com/game/borderlands-4/',
  },
  {
    imageSrc: null,
    title: 'Black Rabbit',
    type: 'tv show',
    metascore: 62,
    scoreText: 'Generally Favorable',
    reviewCount: 22,
    url: 'https://www.metacritic.com/tv/black-rabbit/',
  },
  {
    imageSrc: null,
    title: 'Demon Slayer -Kimetsu no Yaiba- The Movie: Infinity Castle',
    type: 'movie',
    metascore: 69,
    scoreText: 'Generally Favorable',
    reviewCount: 9,
    url: 'https://www.metacritic.com/movie/demon-slayer--kimetsu-no-yaiba--the-movie-infinity-castle/',
  },
  {
    imageSrc: null,
    title: 'Cronos: The New Dawn',
    type: 'game',
    metascore: 77,
    scoreText: 'Generally Favorable',
    reviewCount: 76,
    url: 'https://www.metacritic.com/game/cronos-the-new-dawn/',
  },
  {
    imageSrc: null,
    title: 'Hell is Us',
    type: 'game',
    metascore: 77,
    scoreText: 'Generally Favorable',
    reviewCount: 54,
    url: 'https://www.metacritic.com/game/hell-is-us/',
  },
];

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300 + 16;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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
        {notableData.map((item, index) => (
          <div key={index} className="snap-start">
            <NotableCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}