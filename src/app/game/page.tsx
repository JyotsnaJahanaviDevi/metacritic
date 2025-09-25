import Header from "@/components/sections/header";
import GamesSection from "@/components/sections/games-section";
import EditorialSpotlight from "@/components/sections/editorial-spotlight";
import LatestNews from "@/components/sections/latest-news";
import Footer from "@/components/sections/footer";

export default function GamePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="container px-4 py-6">
          <h1 className="text-3xl font-bold">Games</h1>
        </section>
        <div className="border-b border-border">
          <GamesSection />
        </div>
        <div className="border-b border-border">
          <EditorialSpotlight />
        </div>
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}