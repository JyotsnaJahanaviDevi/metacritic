import Header from "@/components/sections/header";
import TrendingShows from "@/components/sections/trending-shows";
import TvShowsSection from "@/components/sections/tv-shows-section";
import LatestNews from "@/components/sections/latest-news";
import Footer from "@/components/sections/footer";

export default function TvPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="container px-4 py-6">
          <h1 className="text-3xl font-bold">TV Shows</h1>
        </section>
        <div className="border-b border-border">
          <TrendingShows />
        </div>
        <div className="border-b border-border">
          <TvShowsSection />
        </div>
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}