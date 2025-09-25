import Header from "@/components/sections/header";
import TrendingMoviesSection from "@/components/sections/trending-movies";
import MoviesSection from "@/components/sections/movies-section";
import LatestNews from "@/components/sections/latest-news";
import Footer from "@/components/sections/footer";

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
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}