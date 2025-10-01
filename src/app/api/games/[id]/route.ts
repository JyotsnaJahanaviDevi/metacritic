import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string }}) {
  const { id } = params;
  console.log('Games API called with ID:', id);
  
  const apiKey = process.env.RAWG_API_KEY;
  if (!apiKey) {
    console.error('Missing RAWG_API_KEY');
    return NextResponse.json({ error: "Missing RAWG_API_KEY" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
    if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
    
    const game = await res.json();
    
    const data = {
      id: game.id,
      title: game.name,
      description: game.description_raw || game.description || 'No description available.',
      score: Math.round((game.rating || 0) * 20),
      ratingText: game.ratings_count > 200 ? (game.rating >= 3.75 ? "Universal Acclaim" : game.rating >= 2.5 ? "Generally Favorable" : "Mixed or Average") : "",
      imageUrl: game.background_image || '',
      releaseDate: game.released,
      platforms: game.platforms?.map((p: any) => p.platform.name) || [],
      genres: game.genres?.map((g: any) => g.name) || [],
      developers: game.developers?.map((d: any) => d.name) || [],
      publishers: game.publishers?.map((p: any) => p.name) || [],
      esrbRating: game.esrb_rating?.name || 'Not Rated',
      playtime: game.playtime,
      website: game.website
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch game details' }, { status: 500 });
  }
}