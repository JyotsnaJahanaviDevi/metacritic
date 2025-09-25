"use client";

import { useState, useRef, FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TvShow {
  title: string;
  score: number;
  scoreText: string;
  imageUrl: string;
  href: string;
}

const tvShowsData: TvShow[] = [
  {
    title: "The Lowdown",
    score: 87,
    scoreText: "Universal Acclaim",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-969c3a33996f01da0aa07d4b41e8c157.jpg",
    href: "/tv/the-lowdown/",
  },
  {
    title: "Haunted Hotel",
    score: 54,
    scoreText: "Mixed or Average",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-4f7f631103c804f5ca68a2ab7286de9f.jpg",
    href: "/tv/haunted-hotel/",
  },
  {
    title: "Black Rabbit",
    score: 62,
    scoreText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-70b79ac747f5a0fb75988029d5b40dff.jpg",
    href: "/tv/black-rabbit/",
  },
  {
    title: "Human",
    score: 86,
    scoreText: "Universal Acclaim",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-5645053c84f5c35b801a2f646061c0d5.jpg",
    href: "/tv/human/",
  },
  {
    title: "Reunion (2025)",
    score: 77,
    scoreText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-a0ac787c88b776c94ad8a38b29ff5ce2.jpg",
    href: "/tv/reunion-2025/",
  },
  {
    title: "The Hardacres",
    score: 58,
    scoreText: "Mixed or Average",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-680c05febe3311681944cc8ed511c9ea.jpg",
    href: "/tv/the-hardacres/",
  },
  {
    title: "aka Charlie Sheen",
    score: 57,
    scoreText: "Mixed or Average",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-1111ea3d8aa53664d55bba91b0f959c5.jpg",
    href: "/tv/aka-charlie-sheen/",
  },
  {
    title: "Mussolini: Son of the Century",
    score: 74,
    scoreText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-570cd02e4822af4fba59089f21f5ee35.jpg",
    href: "/tv/mussolini-son-of-the-century/",
  },
  {
    title: "The Girlfriend",
    score: 70,
    scoreText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-b13c72d17c70c1e7a688975a5c66d217.jpg",
    href: "/tv/the-girlfriend/",
  },
  {
    title: "Tempest (2025)",
    score: 72,
    scoreText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-094ee73e5ffbba1f6b4d30c5e7552aa9.jpg",
    href: "/tv/tempest-2025/",
  },
  {
    title: "The Crow Girl",
    score: 71,
    scoreText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-07a5180db1c54b6c33e54b6f00db15d0.jpg",
    href: "/tv/the-crow-girl/",
  },
  {
    title: "Task",
    score: 77,
    scoreText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-44675b111a43a75871f76203cfb1b6d1.jpg",
    href: "/tv/task/",
  },
  {
    title: "NCIS: Tony & Ziva",
    score: 73,
    scoreText: "Generally Favorable",
    imageUrl: "https://www.metacritic.com/a/img/catalog/provider/2/13/2-d890479dd701a073f8b059f139049a4f.jpg",
    href: "/tv/ncis-tony-ziva/",
  },
];

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-score-green";
  if (score >= 50) return "bg-score-orange";
  return "bg-score-red";
};

const TvShowCard: FC<{ show: TvShow }> = ({ show }) => (
  <a href={show.href} className="flex-shrink-0 w-[150px] group">
    <div className="aspect-[2/3] w-full bg-secondary rounded-lg overflow-hidden">
      <img
        src={show.imageUrl}
        alt={show.title}
        className="w-full h-full object-cover"
        width={150}
        height={225}
      />
    </div>
    <h3 className="mt-2 text-sm font-bold text-foreground truncate group-hover:underline">
      {show.title}
    </h3>
    <div className="flex items-center mt-1">
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-sm text-white font-bold text-base mr-2 ${getScoreColor(
          show.score,
        )}`}
      >
        {show.score}
      </div>
      <span className="text-sm text-muted-foreground">{show.scoreText}</span>
    </div>
  </a>
);

const TvShowsSection = () => {
  const [activeTab, setActiveTab] = useState("New Releases");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-end gap-4">
            <h2 className="text-2xl font-bold text-foreground">TV Shows</h2>
            {/* <a
              href="/tv/"
              className="text-xs font-bold text-muted-foreground tracking-widest pb-1 hover:text-foreground"
            >
              TV HOME
            </a> */}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="border border-border rounded-full w-8 h-8 flex items-center justify-center hover:bg-secondary disabled:opacity-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="border border-border rounded-full w-8 h-8 flex items-center justify-center hover:bg-secondary disabled:opacity-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        <div className="border-b border-border">
          <nav className="flex space-x-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-base font-bold pb-2 -mb-px ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pt-4 pb-2 scrollbar-hide"
        >
          {tvShowsData.map((show, index) => (
            <TvShowCard key={index} show={show} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TvShowsSection;