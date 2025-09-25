import Header from "@/components/sections/header";
import NewAndNotable from "@/components/sections/new-and-notable";
import LatestVideos from "@/components/sections/latest-videos";
import LatestNews from "@/components/sections/latest-news";
import Footer from "@/components/sections/footer";
import MusicSection from "@/components/sections/music-section";

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="container px-4 py-6">
          <h1 className="text-3xl font-bold">Music</h1>
        </section>
        <div className="border-b border-border">
          <MusicSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}