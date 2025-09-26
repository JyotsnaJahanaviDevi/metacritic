"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";




// Helper function to match Metacritic's color scheme
const getScoreColor = (score: number) => {
    if (score >= 81) return "bg-green-600"; // Green for 81-100 (Metacritic's 'universal acclaim')
    if (score >= 61) return "bg-yellow-600"; // Yellow/Orange for 61-80 ('generally favorable')
    if (score >= 40) return "bg-orange-600"; // Orange for 40-60 ('mixed or average')
    return "bg-red-600"; // Red for 0-39 ('generally unfavorable')
};

// Helper function for NewReleasesByDate to handle optional score
const getScoreColorByDate = (score?: number) => {
    if (score === undefined) return "bg-gray-200 text-gray-700"; // Changed text/bg to better fit 'NR'
    if (score >= 75) return "bg-green-600 text-white";
    if (score >= 50) return "bg-yellow-600 text-white";
    return "bg-red-600 text-white";
};

// --- MUSIC SECTION (TOP OF PAGE) DATA AND COMPONENTS ---

interface Album {
    title: string;
    artist: string;
    score: number;
    ratingText: string;
    href: string;
    imageUrl: string;
}

const NEW_RELEASES_ALBUMS: Album[] = [
    { title: "Jeff Tweedy Album", artist: "Jeff Tweedy", score: 84, ratingText: "Based on 7 critics", href: "#", imageUrl: "https://placehold.co/160x160/2563eb/white?text=Jeff+Tweedy" },
    { title: "Desk of Wonders", artist: "Caroline Polachek", score: 89, ratingText: "Based on 10 critics", href: "#", imageUrl: "https://placehold.co/160x160/3b82f6/white?text=C.+Polachek+1" },
    { title: "Chairlift", artist: "Caroline Polachek", score: 90, ratingText: "Based on 10 critics", href: "#", imageUrl: "https://placehold.co/160x160/60a5fa/white?text=C.+Polachek+2" },
    { title: "The Door", artist: "Geese", score: 88, ratingText: "Based on 14 critics", href: "#", imageUrl: "https://placehold.co/160x160/93c5fd/white?text=Geese" },
    { title: "Vol. 1", artist: "Artist E", score: 79, ratingText: "Based on 8 critics", href: "#", imageUrl: "https://placehold.co/160x160/bfdbfe/white?text=Album+E" },
    { title: "Vol. 2", artist: "Artist F", score: 72, ratingText: "Based on 5 critics", href: "#", imageUrl: "https://placehold.co/160x160/eff6ff/black?text=Album+F" },
    { title: "Vol. 3", artist: "Artist G", score: 91, ratingText: "Based on 12 critics", href: "#", imageUrl: "https://placehold.co/160x160/2563eb/white?text=Album+G" },
    { title: "Vol. 4", artist: "Artist H", score: 85, ratingText: "Based on 9 critics", href: "#", imageUrl: "https://placehold.co/160x160/3b82f6/white?text=Album+H" },
];

const TOP_CRITICS_PICKS_ALBUMS: Album[] = [
    { title: "The Making Of Five Leaves Left [Box Set]", artist: "Nick Drake", score: 100, ratingText: "Based on 20 critics", href: "#", imageUrl: "https://placehold.co/160x160/0d9488/white?text=Nick+Drake" },
    { title: "Tracks II: The Lost Albums [Box Set]", artist: "Bruce Springsteen", score: 95, ratingText: "Based on 18 critics", href: "#", imageUrl: "https://placehold.co/160x160/14b8a6/white?text=Bruce+Springsteen" },
    { title: "Baby", artist: "Dijon", score: 94, ratingText: "Based on 15 critics", href: "#", imageUrl: "https://placehold.co/160x160/47c8b2/white?text=Dijon" },
    { title: "I Can't Give Everything Away (2002 - 2016) [Box Set]", artist: "David Bowie", score: 92, ratingText: "Based on 17 critics", href: "#", imageUrl: "https://placehold.co/160x160/80e1d0/white?text=David+Bowie" },
    { title: "Ego Death At A Bachelorette Party", artist: "Hayley Williams", score: 91, ratingText: "Based on 14 critics", href: "#", imageUrl: "https://placehold.co/160x160/b2e9e0/black?text=H.+Williams" },
    { title: "Good Dye Young", artist: "Various", score: 91, ratingText: "Based on 12 critics", href: "#", imageUrl: "https://placehold.co/160x160/d9f3ef/black?text=Good+Dye+Young" },
];

const MOST_POPULAR_ALBUMS: Album[] = [
    { title: "Current Pop Hit", artist: "Current Artist", score: 78, ratingText: "Based on 25 critics", href: "#", imageUrl: "https://placehold.co/160x160/be123c/white?text=Popular+1" },
    { title: "Summer Vibe", artist: "Summer Singer", score: 81, ratingText: "Based on 30 critics", href: "#", imageUrl: "https://placehold.co/160x160/e11d48/white?text=Popular+2" },
    { title: "Track 3", artist: "The Group", score: 75, ratingText: "Based on 22 critics", href: "#", imageUrl: "https://placehold.co/160x160/f43f5e/white?text=Popular+3" },
    { title: "Deep Cuts", artist: "Indie Star", score: 88, ratingText: "Based on 19 critics", href: "#", imageUrl: "https://placehold.co/160x160/fb7185/white?text=Popular+4" },
];

const MOCK_DATA: Record<string, Album[]> = {
    "New Releases": NEW_RELEASES_ALBUMS,
    "Top Critics' Picks": TOP_CRITICS_PICKS_ALBUMS,
    "Most Popular": MOST_POPULAR_ALBUMS,
};

const TABS = ["New Releases", "Top Critics' Picks", "Most Popular"];

const AlbumCard = ({ album }: { album: Album }) => (
    <a href={album.href} className="w-[160px] flex-shrink-0 group">
        <div className="w-[160px] h-[160px] rounded-lg overflow-hidden mb-2.5">
            <img
                src={album.imageUrl}
                alt={`${album.title} cover`}
                width={160}
                height={160}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
        </div>
        <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-red-600">{album.title}</h3>
        <p className="text-xs text-gray-500 truncate mb-1.5">{album.artist}</p>
        <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 flex items-center justify-center rounded text-white font-bold text-lg ${getScoreColor(album.score)}`}>
                {album.score}
            </div>
            <span className="text-xs text-gray-500 flex-1">{album.ratingText}</span>
        </div>
    </a>
);

const TOP_ALBUMS_LIST: Album[] = [
    { title: "The Making Of Five Leaves Left [Box Set]", artist: "Nick Drake", score: 100, ratingText: "July 25, 2025", href: "#", imageUrl: "https://placehold.co/60x60/0d9488/white?text=ND" },
    { title: "Tracks II: The Lost Albums [Box Set]", artist: "Bruce Springsteen", score: 95, ratingText: "June 27, 2025", href: "#", imageUrl: "https://placehold.co/60x60/14b8a6/white?text=BS" },
    { title: "Baby", artist: "Dijon", score: 94, ratingText: "August 15, 2025", href: "#", imageUrl: "https://placehold.co/60x60/47c8b2/white?text=D" },
    { title: "I Can't Give Everything Away (2002 - 2016) [Box Set]", artist: "David Bowie", score: 92, ratingText: "September 12, 2025", href: "#", imageUrl: "https://placehold.co/60x60/80e1d0/white?text=DB" },
    { title: "Ego Death At A Bachelorette Party", artist: "Hayley Williams", score: 91, ratingText: "August 28, 2025", href: "#", imageUrl: "https://placehold.co/60x60/b2e9e0/black?text=HW" },
    { title: "Good Dye Young", artist: "Mock/Drake", score: 91, ratingText: "August 26, 2025", href: "#", imageUrl: "https://placehold.co/60x60/d9f3ef/black?text=MD" },
    { title: "LSD", artist: "Cardiaks", score: 90, ratingText: "September 19, 2025", href: "#", imageUrl: "https://placehold.co/60x60/2563eb/white?text=Cardiaks" },
    { title: "Blurrr", artist: "Joanne Robertson", score: 90, ratingText: "September 19, 2025", href: "#", imageUrl: "https://placehold.co/60x60/3b82f6/white?text=JR" },
    { title: "Buckingham Nicks", artist: "Buckingham Nicks", score: 89, ratingText: "September 19, 2025", href: "#", imageUrl: "https://placehold.co/60x60/60a5fa/white?text=BN" },
];

const TopAlbumListItem = ({ album, index }: { album: Album, index: number }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="py-4 border-t border-gray-200">
            <div className="flex space-x-4 items-start">
                <span className="text-xl font-bold text-gray-500 w-6 flex-shrink-0">{index + 1}.</span>
                <img src={album.imageUrl} alt={`${album.title} cover`} className="w-16 h-16 object-cover flex-shrink-0" />
                <div className="flex-grow">
                    <h3 className="text-lg font-bold text-red-600 hover:underline cursor-pointer">{album.title}</h3>
                    <p className="text-sm text-gray-900">{album.artist}</p>
                    <p className="text-xs text-gray-500 mb-2">{album.ratingText}</p>
                    <div className="text-sm text-gray-700">
                        {/* Mock description text for a replica */}
                        {index === 0 && (
                            <p>The four-disc box set features demos, studio outtakes and previously unreleased songs from recording...</p>
                        )}
                        {index === 1 && (
                            <p>The seven unreleased albums 1983–2018 from Bruce Springsteen features 82 previously unreleased songs.</p>
                        )}
                        {index === 2 && (
                            <p>The second full-length release from Los Angeles-based R&B artist/producer Dijon features...</p>
                        )}
                        <button 
                            onClick={() => setExpanded(!expanded)} 
                            className="text-red-600 font-semibold text-xs mt-1 block"
                        >
                            {expanded ? 'Collapse' : 'Expand...'}
                        </button>
                    </div>
                </div>
                <div className={`w-14 h-14 flex items-center justify-center rounded text-white font-bold text-2xl flex-shrink-0 ${getScoreColor(album.score)}`}>
                    {album.score}
                </div>
            </div>
        </div>
    );
};

const BrowseByGenre = () => {
    const GENRES = ["alt-country", "alternative", "blues", "comedy", "country", "dance", "electronic", "experimental", "folk", "house", "indie", "jazz", "latin", "metal", "pop", "psychedelic", "punk", "rap", "r&b", "rock", "singer-songwriter", "soul", "soundtrack", "techno", "vocal", "world"];
    return (
        <div className="p-4 bg-gray-50">
            <h4 className="text-xs font-bold text-gray-500 mb-2">Browse by Genre</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {GENRES.map(genre => (
                    <a key={genre} href={`#genre-${genre}`} className="text-sm text-red-600 hover:text-red-800">{genre}</a>
                ))}
            </div>
        </div>
    );
};

function MusicSection() {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [albums, setAlbums] = useState<Album[]>(MOCK_DATA["New Releases"]); 
    
    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
        }
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            handleScroll();
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = 0;
        }
        setAlbums(MOCK_DATA[activeTab] || []);
        handleScroll();
    }, [activeTab, handleScroll]);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -550 : 550;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                
                {/* NEW ALBUM RELEASES Header and Carousel */}
                <div className="flex justify-between items-baseline mb-4">
                    <h2 className="text-lg font-bold text-gray-500 tracking-wider">NEW ALBUM RELEASES</h2>
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-900" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-900" />
                        </button>
                    </div>
                </div>
                
                {/* Albums Carousel */}
                <div className="relative mt-2 mb-8">
                    <div
                        ref={scrollContainerRef}
                        className="flex space-x-4 overflow-x-auto scroll-smooth pb-2 -mb-2"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {albums.map((album, index) => (
                            <AlbumCard key={`${activeTab}-${index}`} album={album} />
                        ))}
                    </div>
                </div>

                {/* The rest of the page structure (main content and sidebar) */}
                <div className="flex space-x-8">
                    {/* Main Content Column */}
                    <div className="w-2/3">
                        {/* METACRITIC REPORTS */}
                        <div className="mb-8 p-4 border border-gray-200 bg-white">
                            <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-2">METACRITIC REPORTS</h2>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        The 20 Best Albums of 2023 So Far
                                    </h3>
                                    <p className="text-sm text-gray-700 mt-1">
                                        We rank the 20 highest-scoring albums released during the first half of 2023.
                                    </p>
                                    <p className="text-xs text-red-600 mt-2">
                                        ALSO <a href="#" className="hover:underline font-semibold">The 40 Best Albums of 2022</a>
                                    </p>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    <img src="https://placehold.co/100x120/cc3333/white?text=BEST+OF+23" alt="Best of 23 Badge" className="border-2 border-black" />
                                </div>
                            </div>
                        </div>

                        {/* TOP ALBUMS */}
                        <div className="mb-8">
                            <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-2">TOP ALBUMS</h2>
                            <div className="border-b border-gray-200 flex space-x-4 mb-4">
                                <button className="pb-2 text-sm font-bold text-red-600 border-b-2 border-red-600">By Metascore</button>
                                <button className="pb-2 text-sm font-semibold text-gray-500 hover:text-red-600">By user score</button>
                            </div>
                            
                            <div className="flex space-x-6">
                                {/* Top 10 List */}
                                <div className="w-2/3 divide-y divide-gray-200">
                                    {TOP_ALBUMS_LIST.map((album, index) => (
                                        <TopAlbumListItem key={index} album={album} index={index} />
                                    ))}
                                    <div className="pt-4 text-xs font-semibold text-gray-500">Albums filtered by release date in the last 90 days.</div>
                                </div>
                                
                                {/* Browse by Genre Sidebar */}
                                <div className="w-1/3">
                                    <BrowseByGenre />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar Column */}
                    <div className="w-1/3">
                        
                        {/* MORE RECENT RELEASES */}
                        <div className="mb-8">
                            <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-2">More recent releases</h2>
                            <ul className="space-y-1">
                                {[
                                    { score: 74, artist: "Cardi B", title: "Am I The Drama?" },
                                    { score: 86, artist: "Wednesday", title: "Weeds" },
                                    { score: 82, artist: "The Divine Comedy", title: "Rainy Sunday Afternoon" },
                                    { score: 41, artist: "Helen Holmes + William Tyler", title: "Longfield Street Lines Bob" },
                                    { score: 90, artist: "Buckingham Nicks", title: "Buckingham Nicks" },
                                    { score: 79, artist: "Lana Young", title: "I'm Only Fixing Myself" },
                                ].map((item, index) => (
                                    <li key={index} className="flex space-x-2 items-start">
                                        <div className={`w-8 h-8 flex items-center justify-center rounded text-white font-bold text-sm flex-shrink-0 ${getScoreColor(item.score)}`}>
                                            {item.score}
                                        </div>
                                        <a href="#" className="text-sm text-gray-700 hover:text-red-600 leading-tight">
                                            <span className="font-semibold">{item.title}</span> - {item.artist}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <a href="#" className="text-xs text-red-600 font-semibold mt-2 block">see all <span className="text-base leading-none">»</span></a>
                        </div>

                        {/* ESSENTIAL LINKS */}
                        <div className="mb-8">
                            <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-2">ESSENTIAL LINKS</h2>
                            <ul className="space-y-1">
                                {[
                                    "New & Recent Releases A-Z by Artist",
                                    "New & Recent Releases by Date",
                                    "Upcoming Release Calendar",
                                    "2025 High Scores",
                                    "All-Time High Scores",
                                    "A-Z Index of Artists",
                                ].map((link, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-sm text-red-600 hover:underline">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}


// --- BEST ALBUMS WEEK COMPONENT (PROVIDED) ---

type AlbumWeek = {
    title: string;
    artist: string;
    score: number;
    href?: string;
};

const albumsWeek: AlbumWeek[] = [
    { title: "Northern Lights", artist: "Aurora Fields", score: 88 },
    { title: "Night Arcade", artist: "Sundown Drive", score: 87 },
    { title: "Glass Waves", artist: "Prism Harbor", score: 83 },
    { title: "Golden Hour", artist: "Sun Motel", score: 82 },
    { title: "Green Skies", artist: "Neon Rivers", score: 81 },
    { title: "Polychrome", artist: "Colorwheel", score: 79 },
    { title: "Monochrome City", artist: "Grey Avenue", score: 78 },
];

function BestAlbumsWeek() {
    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-baseline justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Best Albums This Week</h2>
                </div>

                <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {albumsWeek.map((a, idx) => (
                        <li key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow transition-shadow">
                            <div className="w-8 h-8 rounded bg-gray-200 text-gray-700 flex items-center justify-center font-bold">
                                {idx + 1}
                            </div>
                            <div className={`w-10 h-10 rounded text-white font-bold flex items-center justify-center ${getScoreColor(a.score)}`}>
                                {a.score}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{a.title}</p>
                                <p className="text-xs text-gray-500 truncate">{a.artist}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

// --- NEW RELEASES BY DATE COMPONENT (PROVIDED) ---

type Release = {
    title: string;
    artist: string;
    score?: number;
};

type Day = {
    date: string; // e.g. "Sep 24, 2025"
    releases: Release[];
};

const DATA: Day[] = [
    {
        date: "Sep 24, 2025",
        releases: [
            { title: "Static Bloom", artist: "Violet Echo", score: 85 },
            { title: "Paper Suns", artist: "Golden Motel", score: 72 },
            { title: "Low Tide High", artist: "Seafoam", score: 64 },
        ],
    },
    {
        date: "Sep 23, 2025",
        releases: [
            { title: "Northern Lights", artist: "Aurora Fields", score: 88 },
            { title: "Afterimages", artist: "Neon Motif", score: 74 },
            { title: "Polychrome", artist: "Colorwheel", score: 79 },
        ],
    },
    {
        date: "Sep 22, 2025",
        releases: [
            { title: "Green Skies", artist: "Neon Rivers", score: 81 },
            { title: "Echoes of Dawn", artist: "Horizon Lines", score: 76 },
            { title: "Midnight Parade", artist: "City Lights", score: 69 },
        ],
    },
];

function NewReleasesByDate() {
    const [active, setActive] = useState<string>(DATA[0].date);
    const activeDay = DATA.find((d) => d.date === active) ?? DATA[0];

    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                <div className="mb-4 flex items-baseline justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">New Releases by Date</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <aside className="md:col-span-1">
                        <ul className="space-y-2">
                            {DATA.map((d) => (
                                <li key={d.date}>
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded border border-gray-200 hover:bg-gray-100 transition-colors ${
                                            active === d.date ? "bg-gray-100" : "bg-white"
                                        }`}
                                        onClick={() => setActive(d.date)}
                                    >
                                        <span className="text-sm font-semibold text-gray-900">{d.date}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <div className="md:col-span-2">
                        <ol className="divide-y divide-gray-200 rounded border border-gray-200 bg-white">
                            {activeDay.releases.map((r, idx) => (
                                <li key={idx} className="flex items-center gap-3 p-3">
                                    <div className="w-8 h-8 rounded bg-gray-200 text-gray-700 flex items-center justify-center font-bold">
                                        {idx + 1}
                                    </div>
                                    <div className={`min-w-0 px-2 py-1 rounded text-xs font-bold ${getScoreColorByDate(r.score)}`}>
                                        {r.score ?? "NR"}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-gray-900 truncate">{r.title}</p>
                                        <p className="text-xs text-gray-500 truncate">{r.artist}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MusicSection;
