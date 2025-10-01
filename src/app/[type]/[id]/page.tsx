'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

// --- Type Definitions ---
type ScoreColor = 'green' | 'yellow' | 'red' | 'gray';

interface ScoreBadgeProps {
  score: number | string;
  type: 'metascore' | 'userscore';
}

interface CastMember {
  name: string;
  role: string;
  imageUrl: string;
}

interface Review {
  score: number | string;
  reviewer: string;
  source: string;
  text: string;
  date: string;
  fullReviewLink: string;
}

interface ScoreBreakdown {
  positive: number;
  mixed: number;
  negative: number;
}

interface SimilarItem {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  metascore: number;
  publisher: string;
}

// Data structure expected after API fetch/mapping
interface DetailsData {
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  metascore: number | string;
  userScore: number | string;
  rating: string;
  runtime: string;
  releaseDate: string;
  genres: string[];
  tagline: string;
  director?: string;
  writers?: string[];
  creators?: string[];
  developers?: string[];
  artist?: string;
  productionCompany: string;
  cast: CastMember[];
  criticReviews: Review[];
  userReviews: Review[];
  similarItems: SimilarItem[];
  scoreBreakdown: ScoreBreakdown;
  userReviewCount: number;
  relatedNews: any[];
}

// --- Badge Helpers ---
const getMetascoreColor = (score: number): ScoreColor => {
  if (score >= 81) return 'green';
  if (score >= 61) return 'yellow';
  if (score >= 40) return 'red';
  return 'gray';
};

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, type }) => {
  const isMetascore = type === 'metascore';
  const numScore = typeof score === 'string' ? parseFloat(score) : score;

  const color = isMetascore
    ? getMetascoreColor(numScore as number)
    : 'gray'; // Userscore badge in the video is always TBD/Gray for unrated

  const colorClasses = {
    green: 'bg-[#66CC33] text-white',
    yellow: 'bg-[#FFCC33] text-white',
    red: 'bg-[#FF3333] text-white',
    gray: 'bg-[#AAAAAA] text-white',
  }[color];

  const displayScore = score === 'TBD' ? 'tbd' : score;

  return (
    <div className={`w-[40px] h-[40px] flex items-center justify-center font-bold rounded-sm text-xl ${colorClasses}`}>
      {displayScore}
    </div>
  );
};

// --- Review Breakdown Component ---
interface BreakdownProps {
    breakdown: ScoreBreakdown;
    totalReviews: number;
}

const MetascoreBreakdown: React.FC<BreakdownProps> = ({ breakdown, totalReviews }) => {
    if (totalReviews === 0) return null;

    const getPercent = (count: number) => Math.round((count / totalReviews) * 100);

    const positive = getPercent(breakdown.positive);
    const mixed = getPercent(breakdown.mixed);
    const negative = getPercent(breakdown.negative);
    
    return (
        <div className="flex flex-col space-y-1 text-sm text-gray-700">
            <div className="flex justify-between">
                <span>{positive}% Positive</span>
                <span className="font-semibold">{breakdown.positive} Review{breakdown.positive !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between">
                <span>{mixed}% Mixed</span>
                <span className="font-semibold">{breakdown.mixed} Review{breakdown.mixed !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between">
                <span>{negative}% Negative</span>
                <span className="font-semibold">{breakdown.negative} Review{breakdown.negative !== 1 ? 's' : ''}</span>
            </div>
        </div>
    );
};


// --- Skeleton Loader ---
const SkeletonLoader = () => (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-pulse">
        <div className="flex space-x-4 mb-8">
            <div className="w-[180px] h-[270px] bg-gray-200"></div>
            <div className="flex-1 space-y-3">
                <div className="h-10 bg-gray-300 w-3/4"></div>
                <div className="h-4 bg-gray-200 w-1/2"></div>
                <div className="flex space-x-4">
                    <div className="w-[40px] h-[40px] bg-gray-300"></div>
                    <div className="w-[40px] h-[40px] bg-gray-300"></div>
                </div>
            </div>
        </div>
        <div className="h-60 bg-gray-200 mb-8"></div>
        <div className="h-40 bg-gray-200"></div>
    </div>
);

// --- Main Component ---
export default function DetailPage() {
    const params = useParams();
    const type = Array.isArray(params.type) ? params.type[0] : params.type;
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    
    // Set a very basic initial structure for data to prevent errors during rendering
    const initialData: DetailsData = useMemo(() => ({
        title: 'Loading...', year: '', description: '', imageUrl: '/placeholder.jpg',
        metascore: 0, userScore: 'TBD', rating: 'N/A', runtime: 'N/A', releaseDate: 'N/A',
        genres: [], tagline: '', productionCompany: 'N/A', cast: [], criticReviews: [],
        userReviews: [], similarItems: [], relatedNews: [],
        scoreBreakdown: { positive: 0, mixed: 0, negative: 0 }, userReviewCount: 0
    }), []);

    const [data, setData] = useState<DetailsData>(initialData);
    const [loading, setLoading] = useState(true);

    const castRef = useRef<HTMLDivElement>(null);
    const relatedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!type || !id) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch data from your local API route
                const res = await fetch(`/api/${type}/${id}`);
                if (!res.ok) throw new Error(`API Error: ${res.status}`);
                
                const json = await res.json();
                
                // --- Data Mapping (Adjust as needed based on your API's actual response structure) ---
                const mappedData: DetailsData = {
                    title: json.title || 'Unknown Title',
                    // Use actual data if available, otherwise use reasonable fallbacks to match the layout
                    year: json.year || new Date(json.releaseDate || json.firstAirDate || '').getFullYear().toString(),
                    description: json.description || 'No summary available.',
                    imageUrl: json.imageUrl || '/placeholder.jpg',
                    metascore: json.metascore || json.score || 0,
                    userScore: json.userScore || 'TBD',
                    rating: json.rating || 'R', 
                    runtime: json.runtime || '2 h 5 m', 
                    releaseDate: json.releaseDate || json.firstAirDate || 'Oct 1, 2025', 
                    genres: json.genres || ['Action', 'Drama', 'Thriller'], 
                    tagline: json.tagline || 'Even robbers get robbed.', 
                    director: json.director,
                    writers: json.writers,
                    creators: json.creators,
                    developers: json.developers,
                    artist: json.artist,
                    productionCompany: json.productionCompany || 'Amazon MGM Studios', 
                    
                    // Arrays are crucial for the new layout
                    cast: (json.cast || []).map((c: any) => ({ name: c.name, role: c.role || c.character, imageUrl: c.imageUrl || '/placeholder-avatar.png' })).slice(0, 15),
                    criticReviews: (json.criticReviews || []).slice(0, 5), 
                    userReviews: (json.userReviews || []).slice(0, 5), 
                    similarItems: (json.similarItems || []).map((i: any) => ({ ...i, publisher: i.publisher || 'Universal Acclaim' })).slice(0, 15),
                    scoreBreakdown: json.scoreBreakdown || { positive: 4, mixed: 2, negative: 1 }, 
                    userReviewCount: json.userReviewCount || 4, 
                    relatedNews: json.relatedNews || [],
                };

                setData(mappedData);
            } catch (err) {
                console.error('Fetch error:', err);
                setData(initialData); 
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [type, id, initialData]);

    const scrollHorizontally = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
        if (ref.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    const typeSummaryDetails = useMemo(() => {
        const details: { label: string; value: string | undefined; isLink: boolean }[] = [];
        
        if (data.director) details.push({ label: 'Directed by', value: data.director, isLink: true });
        if (data.writers && data.writers.length > 0) details.push({ label: 'Written by', value: data.writers.join(', '), isLink: true });
        if (data.creators && data.creators.length > 0) details.push({ label: 'Created by', value: data.creators.join(', '), isLink: true });
        if (data.developers && data.developers.length > 0) details.push({ label: 'Developed by', value: data.developers.join(', '), isLink: true });
        if (data.artist) details.push({ label: 'Artist', value: data.artist, isLink: true });

        return details.map((detail, i) => (
            <p key={i} className="text-sm font-medium text-gray-700">
                {detail.label}: <span className={detail.isLink ? 'text-[#00529C] font-normal cursor-pointer hover:underline' : 'font-normal'}>
                    {detail.value}
                </span>
            </p>
        ));
    }, [data]);


    if (loading) return (
        <div className="bg-white min-h-screen">
            <Header />
            <SkeletonLoader />
            <Footer />
        </div>
    );

    if (data.title === 'Loading...') return (
        <div className="bg-white min-h-screen">
            <Header />
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
                <p>The requested {type} with ID {id} could not be found. Check your API response.</p>
            </div>
            <Footer />
        </div>
    );

    const totalCriticReviews = data.scoreBreakdown.positive + data.scoreBreakdown.mixed + data.scoreBreakdown.negative;
    const metascoreLabel = getMetascoreColor(parseFloat(data.metascore as string));
    const metascoreText = {
        green: 'Universal Acclaim',
        yellow: 'Mixed or Average',
        red: 'Generally Unfavorable',
        gray: 'Mixed or Average'
    }[metascoreLabel];


    return (
        <div className="bg-white min-h-screen text-gray-800">
            <Header />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

                {/* Breadcrumbs/Top Bar (Simulated) */}
                <div className="text-sm text-gray-500 mb-4">
                    <span className="cursor-pointer hover:underline">Home</span> &gt; <span className="cursor-pointer hover:underline">{type}</span> &gt; <span className="font-semibold">{data.title}</span>
                </div>

                {/* === SECTION 1: SUMMARY BLOCK === */}
                <div className="flex space-x-6 mb-8">
                    {/* Poster Column */}
                    <div className="w-[180px] flex-shrink-0 relative aspect-[2/3] shadow-lg rounded-sm overflow-hidden">
                        <Image 
                            src={data.imageUrl} 
                            alt={data.title} 
                            fill 
                            className="object-cover" 
                            priority
                        />
                    </div>
                    
                    {/* Title & Score Column */}
                    <div className="flex-1">
                        {/* Title and Secondary Info */}
                        <h1 className="text-5xl font-extrabold text-[#003366] mb-1">{data.title}</h1>
                        <p className="text-lg font-semibold text-gray-600 mb-3">
                            {data.rating} • {data.productionCompany} • {data.runtime} • {data.year}
                        </p>
                        
                        {/* Scores */}
                        <div className="flex space-x-8 mb-6 border-b pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-700 mb-1">METASCORE</h3>
                                <div className="flex items-center space-x-3">
                                    <ScoreBadge score={data.metascore} type="metascore" />
                                    <div className="text-sm">
                                        <p className="font-bold">{metascoreText}</p>
                                        <p className="text-gray-500">Based on {totalCriticReviews} Critic Reviews</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-700 mb-1">USER SCORE</h3>
                                <div className="flex items-center space-x-3">
                                    {/* User Score TBD/Gray Badge */}
                                    <div className="w-[40px] h-[40px] flex items-center justify-center font-bold rounded-sm bg-[#AAAAAA] text-white text-xl">
                                        {data.userScore === 'TBD' ? 'tbd' : data.userScore}
                                    </div>
                                    <p className="text-sm text-gray-500">Available after {data.userReviewCount} ratings</p>
                                </div>
                            </div>
                        </div>

                        {/* Summary Block */}
                        <div className="text-base text-gray-700 leading-relaxed mb-4">
                            <h2 className="text-lg font-bold mb-1">Summary</h2>
                            <p>{data.description}</p>
                        </div>
                        
                        {typeSummaryDetails}
                        
                        {/* Genres/Tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {data.genres.map((genre) => (
                                <span key={genre} className="text-xs font-semibold text-gray-600 hover:text-[#00529C] cursor-pointer">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* === SECTION 2: TOP CAST CAROUSEL === */}
                {data.cast.length > 0 && (
                    <div className="mt-8 mb-8 border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#003366]">Top Cast</h2>
                            <span className="text-sm font-semibold text-[#00529C] cursor-pointer hover:underline">VIEW ALL</span>
                        </div>
                        <div className="relative">
                            <div ref={castRef} className="flex overflow-x-scroll space-x-4 pb-4 scroll-smooth custom-scrollbar">
                                {data.cast.map((member, i) => (
                                    <div key={i} className="flex-shrink-0 w-[100px] text-center">
                                        <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-gray-100">
                                            <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                                        </div>
                                        <p className="text-xs font-semibold mt-2">{member.name}</p>
                                        <p className="text-[10px] text-gray-500">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="absolute left-0 top-[40%] -translate-y-1/2 p-2 rounded-full bg-white shadow-lg opacity-80 hover:opacity-100 hidden sm:block" onClick={() => scrollHorizontally(castRef, 'left')}>◀</button>
                            <button className="absolute right-0 top-[40%] -translate-y-1/2 p-2 rounded-full bg-white shadow-lg opacity-80 hover:opacity-100 hidden sm:block" onClick={() => scrollHorizontally(castRef, 'right')}>▶</button>
                        </div>
                    </div>
                )}
                
                {/* === SECTION 3: REVIEWS (CRITIC & USER) === */}
                <div className="flex space-x-8 mt-10">
                    {/* Critic Reviews */}
                    <div className="w-1/2">
                        <h2 className="text-xl font-bold text-[#003366] mb-4 border-b pb-2">Critic Reviews <span className="text-sm font-semibold text-[#00529C] cursor-pointer hover:underline ml-2">VIEW ALL</span></h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                                <span>METASCORE:</span>
                                <span>{data.metascore}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-base">{metascoreText}</span>
                                <span className="text-sm font-semibold text-gray-500">Based on {totalCriticReviews} Critic Reviews</span>
                            </div>
                            <MetascoreBreakdown breakdown={data.scoreBreakdown} totalReviews={totalCriticReviews} />
                        </div>

                        <div className="space-y-6">
                            {data.criticReviews.map((review, i) => (
                                <div key={i} className="border-t pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="w-[30px] h-[30px] flex items-center justify-center font-bold text-white text-base rounded-sm"
                                             style={{ backgroundColor: getMetascoreColor(parseFloat(review.score as string)) === 'gray' ? '#AAAAAA' : getMetascoreColor(parseFloat(review.score as string)) === 'green' ? '#66CC33' : getMetascoreColor(parseFloat(review.score as string)) === 'yellow' ? '#FFCC33' : '#FF3333' }}>
                                            {review.score}
                                        </div>
                                        <span className="text-xs text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="text-base text-gray-700 mb-2 italic">"{review.text}"</p>
                                    <p className="text-sm text-gray-600">By <span className="font-semibold">{review.reviewer}</span> from <span className="font-semibold">{review.source}</span></p>
                                    <a href={review.fullReviewLink || '#'} target="_blank" rel="noopener noreferrer" className="text-xs text-[#00529C] hover:underline mt-1 block">FULL REVIEW</a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Reviews */}
                    <div className="w-1/2">
                        <h2 className="text-xl font-bold text-[#003366] mb-4 border-b pb-2">User Reviews <span className="text-sm font-semibold text-[#00529C] cursor-pointer hover:underline ml-2">VIEW ALL</span></h2>
                        
                        <div className="bg-gray-50 p-4 rounded-lg text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-600">{data.userScore === 'TBD' ? 'tbd' : data.userScore}</h3>
                            <p className="text-sm text-gray-500 mt-1">Based on {data.userReviewCount} User Rating{data.userReviewCount !== 1 ? 's' : ''}</p>
                            {data.userReviewCount === 0 && (
                                <p className="text-sm text-gray-500 mt-2">There are no user reviews yet.</p>
                            )}
                        </div>

                        <div className="space-y-6">
                            {data.userReviews.map((review, i) => (
                                <div key={i} className="border-t pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        {/* User Score is often just a simple circle or number */}
                                        <div className="w-[30px] h-[30px] flex items-center justify-center font-bold text-white text-base rounded-full bg-[#66CC33]">
                                            {review.score}
                                        </div>
                                        <span className="text-xs text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="text-base text-gray-700 mb-2">{review.text}</p>
                                    <p className="text-sm text-gray-600">By <span className="font-semibold">{review.reviewer}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* === SECTION 4: DETAILS === */}
                <div className="mt-10 mb-8 border-t pt-6">
                    <h2 className="text-xl font-bold text-[#003366] mb-4 border-b pb-2">Details <span className="text-sm font-semibold text-[#00529C] cursor-pointer hover:underline ml-2">VIEW ALL</span></h2>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p className="font-semibold">Production Company</p>
                        <p className="text-base">{data.productionCompany}</p>
                        
                        <p className="font-semibold pt-2">Release Date</p>
                        <p className="text-base">{data.releaseDate}</p>

                        <p className="font-semibold pt-2">Duration</p>
                        <p className="text-base">{data.runtime}</p>

                        <p className="font-semibold pt-2">Rating</p>
                        <p className="text-base">{data.rating}</p>

                        <p className="font-semibold pt-2">Genres</p>
                        <p className="text-base flex flex-wrap gap-2">
                            {data.genres.map((genre) => (
                                <span key={genre} className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-600 cursor-pointer">{genre}</span>
                            ))}
                        </p>

                        <p className="font-semibold pt-2">Tagline</p>
                        <p className="text-base">{data.tagline}</p>
                    </div>
                </div>

                {/* === SECTION 5: RELATED MOVIES CAROUSEL === */}
                {data.similarItems.length > 0 && (
                    <div className="mt-10 mb-8 border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#003366]">Related {type === 'movie' ? 'Movies' : 'Items'}</h2>
                            <button className="text-xl text-gray-600 hover:text-[#00529C]" onClick={() => scrollHorizontally(relatedRef, 'right')}>→</button>
                        </div>
                        <div className="relative">
                            <div ref={relatedRef} className="flex overflow-x-scroll space-x-6 pb-4 scroll-smooth custom-scrollbar">
                                {data.similarItems.map((item, i) => (
                                    <div 
                                        key={i} 
                                        className="flex-shrink-0 w-[120px] cursor-pointer hover:shadow-xl transition-shadow"
                                        onClick={() => window.location.href = `/${item.type}/${item.id}`}
                                    >
                                        <div className="relative w-full aspect-[2/3] rounded-sm overflow-hidden shadow-lg">
                                            <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                            <div className="absolute top-2 left-2 w-[30px] h-[30px] flex items-center justify-center font-bold rounded-sm bg-[#66CC33] text-white text-sm">
                                                {item.metascore}
                                            </div>
                                        </div>
                                        <p className="text-xs font-semibold mt-2 text-[#00529C]">{item.title}</p>
                                        <p className="text-[10px] text-gray-500">{item.publisher}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* === SECTION 6: RELATED NEWS (Simulated) === */}
                <div className="mt-10 mb-8 border-t pt-6">
                    <h2 className="text-xl font-bold text-[#003366] mb-4 border-b pb-2">Related News</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* News Items mapped from data.relatedNews (currently using mock data) */}
                        {/* REPLACE THIS MOCK BLOCK WITH: {data.relatedNews.map((newsItem, i) => (...))} */}
                        <div className="p-3 border rounded">
                            <h3 className="text-sm font-bold text-[#00529C]">DVD/Blu-ray Releases: New & Upcoming</h3>
                            <p className="text-xs text-gray-600 mt-1">A find a list of new movie and TV releases...</p>
                        </div>
                        <div className="p-3 border rounded">
                            <h3 className="text-sm font-bold text-[#00529C]">October 2025 Movie Preview</h3>
                            <p className="text-xs text-gray-600 mt-1">October is close, finding the perfect film for...</p>
                        </div>
                        <div className="p-3 border rounded">
                            <h3 className="text-sm font-bold text-[#00529C]">Every Paul Thomas Anderson Movie, Ranked</h3>
                            <p className="text-xs text-gray-600 mt-1">We rank every film directed by Paul Thomas Anderson from worst to best...</p>
                        </div>
                        <div className="p-3 border rounded">
                            <h3 className="text-sm font-bold text-[#00529C]">Matthew McConaughey's 15 Best Movies</h3>
                            <p className="text-xs text-gray-600 mt-1">With the arrival of his newest film, we look back...</p>
                        </div>
                    </div>
                </div>

            </div>
            
            <Footer />
        </div>
    );
}