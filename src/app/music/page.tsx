import Header from "@/components/sections/header";
import NewAndNotable from "@/components/sections/new-and-notable";
import LatestVideos from "@/components/sections/latest-videos";
import LatestNews from "@/components/sections/latest-news";
import Footer from "@/components/sections/footer";
import MusicSection from "@/components/sections/music-section";
import BestAlbumsWeek from "@/components/sections/best-albums-week";
import NewReleasesByDate from "@/components/sections/new-releases-by-date";

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="border-b border-border">
          <MusicSection />
        </div>
        <div className="border-b border-border">
          <BestAlbumsWeek />
        </div>
        <div className="border-b border-border">
          <NewReleasesByDate />
        </div>
        
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}