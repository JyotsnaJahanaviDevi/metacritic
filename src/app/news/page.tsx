import Header from "@/components/sections/header";
import EditorialSpotlight from "@/components/sections/editorial-spotlight";
import LatestNews from "@/components/sections/latest-news";
import Footer from "@/components/sections/footer";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="container px-4 py-6">
          <h1 className="text-3xl font-bold">News</h1>
        </section>
        <div className="border-b border-border">
          <EditorialSpotlight />
        </div>
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}