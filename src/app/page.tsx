import Header from "@/components/sections/header";
import NewAndNotable from "@/components/sections/new-and-notable";
import EditorialSpotlight from "@/components/sections/editorial-spotlight";
import LatestVideos from "@/components/sections/latest-videos";
import GamesSection from "@/components/sections/games-section";
import TrendingMoviesSection from "@/components/sections/trending-movies";
import MoviesSection from "@/components/sections/movies-section";
import TrendingShows from "@/components/sections/trending-shows";
import TvShowsSection from "@/components/sections/tv-shows-section";
import MetascoreBreakdown from "@/components/sections/metascore-breakdown";
import LatestNews from "@/components/sections/latest-news";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <NewAndNotable />
        
        <div className="border-b border-border">
          <EditorialSpotlight />
        </div>
        
        <div className="border-b border-border">
          <LatestVideos />
        </div>
        
        <div className="border-b border-border">
          <GamesSection />
        </div>
        
        <div className="border-b border-border">
          <TrendingMoviesSection />
        </div>
        
        <div className="border-b border-border">
          <MoviesSection />
        </div>
        
        <div className="border-b border-border">
          <TrendingShows />
        </div>
        
        <div className="border-b border-border">
          <TvShowsSection />
        </div>
        
        <div className="container mx-auto px-4">
          <MetascoreBreakdown />
        </div>
        
        <LatestNews />
      </main>
      
      <Footer />
    </div>
  );
}