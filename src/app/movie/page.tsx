import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import TrendingMoviesSection from "@/components/sections/trending-movies";
import MoviesSection from "@/components/sections/movies-section";
import LatestVideos from "@/components/sections/latest-videos";
import LatestNews from "@/components/sections/latest-news";

export default function MoviePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="container px-4 py-6">
          <h1 className="text-3xl font-bold">Movies</h1>
        </section>
        <div className="border-b border-border">
          <TrendingMoviesSection />
        </div>
        <div className="border-b border-border">
          <MoviesSection />
        </div>
        <div className="border-b border-border">
            <LatestVideos filterByTag="movie"/>
        </div>
        <LatestNews filterByTag="movie" />
      </main>
      <Footer />
    </div>
  );
}