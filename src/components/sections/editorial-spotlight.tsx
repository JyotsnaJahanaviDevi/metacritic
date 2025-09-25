"use client";
interface EditorialSpotlightProps {
  filterByTag?: string;
}

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

type EditorialItem = {
  imageUrl: string;
  overlayTitle: string;
  title: string;
  author: string;
  description: string;
  tag: string;
  href: string;
};

const editorialData: EditorialItem[] = [
  {
    imageUrl: "https://www.metacritic.com/a/img/resize/5a3c1649727a368483e4e21b5b3653612d54cd9e/hub/2025/09/23/c235787a-4b6a-41b3-9628-da286110f289/mainpaulthomasanderson.jpg?auto=webp&fit=crop&height=170&width=300",
    overlayTitle: "Every Paul Thomas Anderson Movie",
    title: "Every Paul Thomas Anderson Movie, Ranked",
    author: "Nick Hyman",
    description: "We rank every film directed by Paul Thomas Anderson from worst to best by Metascore, including his newest feature, One Battle After Another.",
    tag: "movie",
    href: "/pictures/every-paul-thomas-anderson-movie-ranked-worst-to-best/",
  },
  {
    imageUrl: "https://www.metacritic.com/a/img/resize/9c7caab4682e0e7368e05fa681fd802342067bdb/hub/2025/09/23/7c38ae01-c7ad-435e-8d5f-f4c92b45fedc/mainleonardodicapriorev.jpg?auto=webp&fit=crop&height=170&width=300",
    overlayTitle: "Every Leonardo DiCaprio Movie",
    title: "Every Leonardo DiCaprio Movie, Ranked From Worst to Best",
    author: "Joal Ryan",
    description: "(Updated September 2025) We rank every film in Leonardo DiCaprio's filmography from worst to best by Metascore.",
    tag: "movie",
    href: "/pictures/leonardo-dicaprio-movies-ranked-worst-to-best/",
  },
  {
    imageUrl: "https://www.metacritic.com/a/img/resize/8fd7a309c3860349a131ded331e8490b889d1820/hub/2025/09/22/68798557-b481-4653-9506-cb11a232de0b/mainsilenthillgamesrankedrev.jpg?auto=webp&fit=crop&height=170&width=300",
    overlayTitle: "Every Silent Hill Game",
    title: "Every Silent Hill Game, Ranked",
    author: "Nick Hyman",
    description: "(Updated September 2025) We rank every video game in Konami's Silent Hill franchise from worst to best by Metascore.",
    tag: "game",
    href: "/pictures/every-silent-hill-game-ranked-worst-to-best/",
  },
  {
    imageUrl: "https://www.metacritic.com/a/img/resize/27d110646940f7fe2bec3fd414f0e9f1e96e3351/hub/2025/09/18/4a578b6f-ec4f-4c05-846d-a696814b17aa/mainmcconaughey.jpg?auto=webp&fit=crop&height=170&width=300",
    overlayTitle: "The Best Matthew McConaughey Movies",
    title: "Matthew McConaughey's 15 Best Movies",
    author: "Liam Mathews",
    description: "With the arrival of his newest film, The Lost Bus, we rank the 15 best-reviewed movies starring Matthew McConaughey.",
    tag: "movie",
    href: "/pictures/best-films-starring-matthew-mcconaughey/",
  },
  {
    imageUrl: "https://www.metacritic.com/a/img/resize/c1d37374e3fcdabd3afbef5da0fd597e5affb10b/hub/2025/09/16/7eb533f3-fd2d-486e-9111-c76d4d737c04/mainmargotrobbie.jpg?auto=webp&fit=crop&height=170&width=300",
    overlayTitle: "The Best Margot Robbie Movies",
    title: "Margot Robbie's 15 Best Movies",
    author: "Liam Mathews",
    description: "With this week's arrival of her latest release, A Big Bold Beautiful Journey, we rank the 15 highest-scoring films in Margot Robbie's career to date.",
    tag: "movie",
    href: "/pictures/best-films-starring-margot-robbie/",
  },
  {
    imageUrl: "https://www.metacritic.com/a/img/resize/4321cc01e2868097665a4ea3709144f83ad7342a/hub/2025/09/11/ad852186-661d-4652-bf15-cadd8b2728bd/mainborderlands.jpg?auto=webp&fit=crop&height=170&width=300",
    overlayTitle: "Every Borderlands Game",
    title: "Every Borderlands Game, Ranked",
    author: "Phil Owen",
    description: "We rank every main and spinoff game in the Borderlands series, including the newest game, Borderlands 4.",
    tag: "game",
    href: "/pictures/every-borderlands-game-ranked-worst-to-best/",
  },
];

const MetacriticLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="11" height="12" viewBox="0 0 21 22" fill="currentColor" {...props}>
    <path d="M2.03.18C.89.18 0 .97 0 2.1v17.8C0 21.03.89 22 2.03 22h16.94c1.14 0 2.03-.97 2.03-2.1V2.1C21 1.05 20.03.18 18.97.18H2.03z"></path>
    <path d="M6.87 18.06V7.12h2.5v10.94H6.87zm7.38 0l-3.3-6.6a.4.4 0 01.35-.61h6.58a.4.4 0 01.35.6l-3.3 6.6h-1a.41.41 0 01-.7 0z" fill="#fff"></path>
  </svg>
);


const EditorialSpotlight = ({ filterByTag }: EditorialSpotlightProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const displayData = filterByTag 
    ? editorialData.filter(item => item.tag === filterByTag)
    : editorialData;

  if (displayData.length === 0) return null;

  const checkForScrollPosition = useCallback(() => {
    const { current } = scrollContainerRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const { current } = scrollContainerRef;
    if (current) {
      checkForScrollPosition();
      current.addEventListener('scroll', checkForScrollPosition);
    }
    
    return () => {
      if (current) {
        current.removeEventListener('scroll', checkForScrollPosition);
      }
    };
  }, [checkForScrollPosition]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
     const { current } = scrollContainerRef;
     // Scroll by 80% of the container width for a smooth, multi-item scroll
     const scrollAmount = current.clientWidth * 0.8 * (direction === 'left' ? -1 : 1);
     current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold text-foreground">Editorial Spotlight</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleScroll('left')} 
              disabled={!canScrollLeft}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-border disabled:opacity-40 disabled:cursor-default"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-border disabled:opacity-40 disabled:cursor-default"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-2 px-2"
        >
          {displayData.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[300px] snap-start px-2">
              <a href={item.href} className="block bg-card rounded-lg border border-border overflow-hidden h-full group transition-shadow duration-200 hover:shadow-lg">
                <div className="relative h-[170px]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-2">
                    <div className="text-white">
                      <span className="flex items-center text-[10px] uppercase font-bold mb-1">
                        <ImageIcon className="w-3 h-3 mr-1.5" />
                        {item.overlayTitle}
                      </span>
                      <span className="flex items-center text-[9px] uppercase font-bold">
                        ranked by
                        <MetacriticLogoIcon className="ml-1 text-accent" />
                        <span className="ml-[2px]">metacritic</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="body-main flex-grow">
                      <h3 className="text-base font-bold text-foreground mb-2 leading-tight">{item.title}</h3>
                      <div className="text-xs text-muted-foreground mb-2">{item.author}</div>
                      <p className="text-xs text-muted-foreground line-clamp-3 leading-snug">{item.description}</p>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block border border-border rounded-full px-3 py-1 text-xs text-muted-foreground capitalize">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialSpotlight;