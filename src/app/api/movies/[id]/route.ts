import { NextResponse } from 'next/server';

// Base URL for TMDB images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export async function GET(req: Request, { params }: { params: { id: string }}) {
  const { id } = params;
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    console.error('Missing TMDB_API_KEY');
    return NextResponse.json({ error: "Missing TMDB_API_KEY" }, { status: 500 });
  }

  try {
    // 1. Fetch Movie Details (including cast/crew)
    const detailsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits`);
    
    // 2. Fetch User Reviews (Requires a separate endpoint)
    const reviewsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US`);
    
    if (!detailsRes.ok) throw new Error(`TMDB Details API error: ${detailsRes.status}`);
    if (!reviewsRes.ok) throw new Error(`TMDB Reviews API error: ${reviewsRes.status}`);

    const movie = await detailsRes.json();
    const reviewsData = await reviewsRes.json();
    
    // --- TMDB User Reviews Mapping ---
    // --- TMDB User Reviews Mapping ---
const userReviews = reviewsData.results.slice(0, 5).map((review: any) => ({
    score: review.author_details.rating || 'N/A',
    reviewer: review.author,
    source: 'TMDB User',
    // ⬇️ REMOVED THE SUBSTRING TRUNCATION HERE ⬇️
    text: review.content, // Now returns the full content
    date: new Date(review.created_at).toLocaleDateString(),
    fullReviewLink: review.url,
}));
    
    // --- Data Mapping for Client Component ---
    const data = {
      id: movie.id,
      title: movie.title,
      description: movie.overview || 'No description available.',
      
      // NOTE: We use TMDB vote_average for the 'metascore' field on the client,
      // but the value is scaled (x10) for the 0-100 Metacritic look.
      metascore: Math.round((movie.vote_average || 0) * 10),
      userScore: (movie.vote_average || 0).toFixed(1), // TMDB average is the closest to a user score
      userReviewCount: movie.vote_count || 0, // TMDB total votes is used for user review count
      
      imageUrl: movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : '/placeholder.jpg',
      releaseDate: movie.release_date,
      runtime: `${movie.runtime} min`,
      genres: movie.genres?.map((g: any) => g.name) || [],
      tagline: movie.tagline || '',
      rating: movie.adult ? 'R' : 'PG-13', // Simplified rating
      productionCompany: movie.production_companies?.[0]?.name || 'Unknown Studio',
      director: movie.credits?.crew?.find((c: any) => c.job === 'Director')?.name || 'Unknown',
      
      // Cast Mapping
      cast: movie.credits?.cast?.slice(0, 15).map((c: any) => ({
        name: c.name,
        role: c.character,
        imageUrl: c.profile_path ? `${IMAGE_BASE_URL}w185${c.profile_path}` : '/placeholder-avatar.png'
      })) || [],
      
      // --- Reviews/Breakdown (Simulated since TMDB lacks this detail) ---
      criticReviews: [{
        score: 70, reviewer: 'Paste Magazine', source: 'Paste', 
        text: 'Hands us a frenzied combination of action, comedy and criminal caper, patently absurd but well served by knowingly silly performances and solid jokes.', 
        date: 'Sep 30, 2025', fullReviewLink: '#'
      }, {
        score: 55, reviewer: 'IndieWire', source: 'IndieWire', 
        text: 'While this film isn\'t quite the stuff of vintage Black, it\'s close enough that I wouldn\'t mind seeing him crank another one out every two years for the next decade.', 
        date: 'Sep 30, 2025', fullReviewLink: '#'
      },
      // ...add more mock reviews here if needed...
      ] as any, // Cast to any because this is mock data

      userReviews: userReviews, // TMDB reviews are mapped here

      scoreBreakdown: { 
        positive: 4, 
        mixed: 2, 
        negative: 1 
      } as any, // Mock for visual layout

      similarItems: [] as any, // You'd need another fetch for related/similar items
      relatedNews: [] as any, // Mock
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data for movie ID:', id, error);
    return NextResponse.json({ error: 'Failed to fetch movie details and reviews' }, { status: 500 });
  }
}