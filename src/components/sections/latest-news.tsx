import Link from 'next/link';
import React from 'react';

type NewsArticle = {
  title: string;
  author: string;
  description: string;
  category: 'movie' | 'game' | 'tv show';
  url: string;
  categoryUrl: string;
};

const newsArticles: NewsArticle[] = [
  {
    title: "Every Paul Thomas Anderson Movie, Ranked",
    author: "Nick Hyman",
    description: "We rank every film directed by Paul Thomas Anderson from worst to best by Metascore, including his newest feature, One Battle After Another.",
    category: 'movie',
    url: "/pictures/every-paul-thomas-anderson-movie-ranked-worst-to-best/",
    categoryUrl: "/movie/"
  },
  {
    title: "Notable Video Game Releases: New and Upcoming",
    author: "Jason Dietz",
    description: "Find release dates and scores for every major upcoming and recent video game release for all platforms, updated weekly.",
    category: 'game',
    url: "/news/major-new-and-upcoming-video-games-ps5-xbox-switch-pc/",
    categoryUrl: "/game/"
  },
  {
    title: "2025-26 Movie Release Calendar",
    author: "Jason Dietz",
    description: "Find a schedule of release dates for every movie coming to theaters, VOD, and streaming throughout 2025 and beyond, updated daily.",
    category: 'movie',
    url: "/news/upcoming-movie-release-dates-schedule/",
    categoryUrl: "/movie/"
  },
  {
    title: "Matthew McConaughey's 15 Best Movies",
    author: "Liam Mathews",
    description: "With the arrival of his newest film, The Lost Bus, we rank the 15 best-reviewed movies starring Matthew McConaughey.",
    category: 'movie',
    url: "/pictures/best-films-starring-matthew-mcconaughey/",
    categoryUrl: "/movie/"
  },
  {
    title: "What to Watch on Hulu Right Now",
    author: "Jason Dietz",
    description: "Get a list of the best movies and TV shows recently added (and coming soon) to Hulu, updated frequently.",
    category: 'tv show',
    url: "/news/what-to-watch-on-hulu-right-now/",
    categoryUrl: "/tv/"
  },
  {
    title: "What to Watch on Disney+ Right Now",
    author: "Jason Dietz",
    description: "Get a list of the best movies and TV shows recently added (and coming soon) to Disney's streaming service, updated frequently.",
    category: 'tv show',
    url: "/news/what-to-watch-on-disney-plus-right-now/",
    categoryUrl: "/tv/"
  },
  {
    title: "Margot Robbie's 15 Best Movies",
    author: "Liam Mathews",
    description: "With this week's arrival of her latest release, A Big Bold Beautiful Journey, we rank the 15 highest-scoring films in Margot Robbie's career to date.",
    category: 'movie',
    url: "/pictures/best-films-starring-margot-robbie/",
    categoryUrl: "/movie/"
  },
  {
    title: "Every Game Available for Xbox Game Pass",
    author: "Jason Dietz",
    description: "Find an up-to-date list of every game available in the Xbox Game Pass (and PC Game Pass) library at all membership levels, and find out which games are coming soon and leaving soon.",
    category: 'game',
    url: "/news/xbox-game-pass-library/",
    categoryUrl: "/game/"
  },
  {
    title: "Every Borderlands Game, Ranked",
    author: "Phil Owen",
    description: "We rank every main and spinoff game in the Borderlands series, including the newest game, Borderlands 4.",
    category: 'game',
    url: "/pictures/every-borderlands-game-ranked-worst-to-best/",
    categoryUrl: "/game/"
  },
  {
    title: "Every Rob Reiner Movie, Ranked",
    author: "Nick Hyman",
    description: "We rank all 22 films directed by Rob Reiner, from his debut This Is Spinal Tap to his newest film, a Spinal Tap sequel.",
    category: 'movie',
    url: "/pictures/every-rob-reiner-movie-ranked-worst-to-best/",
    categoryUrl: "/movie/"
  },
  {
    title: "DVD/Blu-ray Releases: New & Upcoming",
    author: "Jason Dietz",
    description: "Find a list of new movie and TV releases on DVD and Blu-ray (updated weekly) as well as a calendar of upcoming releases on home video.",
    category: 'movie',
    url: "/news/dvd-blu-ray-new-and-upcoming-release-calendar/",
    categoryUrl: "/movie/"
  },
  {
    title: "New Free & Subscription Games for All Platforms",
    author: "Jason Dietz",
    description: "Our frequently updated list shows the latest free games available from Epic Games Store, IndieGala, Steam, Fanatical, GOG, and more as well as new and upcoming titles added to subscription services like Game Pass, PlayStation Plus, Prime Gaming, and Humble.",
    category: 'game',
    url: "/news/new-free-games-playstation-xbox-pc/",
    categoryUrl: "/game/"
  },
];

const LatestNews = () => {
  return (
    <section className="bg-background">
      <div className="container py-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-10">
          {newsArticles.map((article) => (
            <article key={article.title}>
              <Link href={article.url} className="block font-bold text-sm text-foreground hover:underline mb-2">
                {article.title}
              </Link>
              <p className="font-bold text-xs text-muted-foreground mb-2">{article.author}</p>
              <p className="text-xs text-muted-foreground leading-snug">
                {article.description}
              </p>
              <hr className="border-t border-border my-4" />
              <Link href={article.categoryUrl} className="inline-block border border-border rounded-sm px-3 py-1 text-xs text-muted-foreground bg-background hover:bg-secondary capitalize transition-colors">
                {article.category}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;