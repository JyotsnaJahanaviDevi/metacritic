"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LatestVideosProps {
  filterByTag?: string;
}

type Video = {
  id: number;
  title: string;
  thumbnail?: string; // optional, can auto-fetch from YouTube
  duration: string;
  type: 'movie' | 'game' | 'tv show';
  metascore?: 'tbd';
  metascoreInfo?: string;
  youtubeUrl?: string; // new field
};

// Check your video data - make sure movie videos have type: "movie"
const videosData: Video[] = [
  {
    id: 1,
    title: "Spider-Man: Beyond the Spider-Verse",
    thumbnail: "/videos/spiderman.jpg",
    duration: "2:31",
    type: "movie", // Ensure correct type
    metascore: "tbd"
  },
  {
    id: 2,
    title: 'SILENT HILL f | Official Launch Trailer',
    thumbnail: 'https://cdn.jwplayer.com/v2/media/zJMvXDvR/poster.jpg?width=720',
    duration: '2:10',
    type: 'game'
  },
  {
    id: 3,
    title: 'FINAL FANTASY TACTICS: The Ivalice Chronicles – Official Story Trailer',
    thumbnail: 'https://cdn.jwplayer.com/v2/media/kPjNbUfg/poster.jpg?width=720',
    duration: '1:54',
    type: 'game'
  },
  {
    id: 4,
    title: 'Ghost of Yotei - 19 Minute Gameplay Deep Dive',
    thumbnail: 'https://cdn.jwplayer.com/v2/media/VmLr4Tss/poster.jpg?width=720',
    duration: '19:12',
    type: 'game'
  },
  {
    id: 5,
    title: 'One Battle After Another (Trailer 2)',
    thumbnail: 'https://cdn.jwplayer.com/v2/media/yaUNlgRi/poster.jpg?width=720',
    duration: '2:24',
    type: 'movie'
  }
];

export default function LatestVideos({ filterByTag }: LatestVideosProps) {
  const [activeVideo, setActiveVideo] = useState<Video>(videosData[0]);

  // Add console.log to debug
  console.log('filterByTag:', filterByTag);
  
  // Filter videos based on the tag
  const filteredVideos = filterByTag 
    ? videosData.filter(video => video.type === filterByTag.toLowerCase())
    : videosData;

  console.log('filtered videos:', filteredVideos);

  // Use filtered videos instead of videosData directly
  const displayVideos = filterByTag ? filteredVideos : videosData;

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold text-foreground mb-1">Latest Videos</h2>
      <hr className="border-t border-border mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video w-full bg-black group rounded-lg overflow-hidden border border-border">
            <Image
              src={activeVideo.thumbnail}
              alt={`Thumbnail for ${activeVideo.title}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-sm cursor-pointer">
              <Play className="h-4 w-4 fill-white text-white" />
              <span>Play Sound</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center border-2 border-white/50 group-hover:bg-black/70 transition-colors">
                <Play className="h-10 w-10 fill-white text-white ml-2" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-start gap-4">
            <div className="flex-grow">
              <a href="#" className="hover:underline">
                <h3 className="text-xl font-bold text-foreground leading-tight">
                  {activeVideo.title}
                </h3>
              </a>
              <a href="#" className="mt-2 inline-block rounded-sm border border-border px-2 py-0.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
                {activeVideo.type}
              </a>
            </div>
            {activeVideo.metascore && (
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">METASCORE</p>
                  <p className="text-xs text-muted-foreground">{activeVideo.metascoreInfo}</p>
                </div>
                <a href="#" className="flex items-center justify-center w-[52px] h-[52px] border-2 border-foreground text-foreground text-2xl font-bold rounded-md">
                  tbd
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="flex flex-col gap-1">
            {displayVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={cn(
                  'w-full text-left p-2 rounded-md hover:bg-secondary transition-colors',
                  activeVideo.id === video.id ? 'border-l-4 border-chart-1 bg-secondary' : 'border-l-4 border-transparent'
                )}
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-32 h-[72px] flex-shrink-0 bg-black rounded-md overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-5 w-5 fill-white text-white opacity-80" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-semibold">
                      {video.duration}
                    </span>
                  </div>
                  <div>
                    {activeVideo.id === video.id && (
                       <p className="text-[11px] text-chart-1 font-bold">Now Playing:</p>
                    )}
                    <p className={cn(
                        "text-sm font-bold leading-tight",
                        activeVideo.id === video.id ? 'text-chart-1' : 'text-foreground'
                      )}>
                      {video.title}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}