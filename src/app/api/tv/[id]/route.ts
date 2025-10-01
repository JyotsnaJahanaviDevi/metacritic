import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string }}) {
  const { id } = params;
  
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing TMDB_API_KEY" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits`);
    if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
    
    const show = await res.json();
    
    const data = {
      id: show.id,
      title: show.name,
      description: show.overview || 'No description available.',
      score: Math.round((show.vote_average || 0) * 10),
      ratingText: show.vote_count > 200 ? (show.vote_average >= 7.5 ? "Universal Acclaim" : show.vote_average >= 5 ? "Generally Favorable" : "Mixed or Average") : "",
      imageUrl: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '',
      backdropUrl: show.backdrop_path ? `https://image.tmdb.org/t/p/w1280${show.backdrop_path}` : '',
      firstAirDate: show.first_air_date,
      lastAirDate: show.last_air_date,
      numberOfSeasons: show.number_of_seasons,
      numberOfEpisodes: show.number_of_episodes,
      genres: show.genres?.map((g: any) => g.name) || [],
      creators: show.created_by?.map((c: any) => c.name) || [],
      cast: show.credits?.cast?.slice(0, 10).map((c: any) => c.name) || [],
      networks: show.networks?.map((n: any) => n.name) || [],
      status: show.status,
      type: show.type,
      tagline: show.tagline
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch TV show details' }, { status: 500 });
  }
}