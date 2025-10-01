import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string }}) {
  const { id } = params;
  
  // Enhanced mock data with more albums
  const mockAlbums = [
    {
      id: '1',
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      description: 'The eighth studio album by the English rock band Pink Floyd, released on 1 March 1973 by Harvest Records.',
      score: 92,
      ratingText: 'Universal Acclaim',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png',
      releaseDate: '1973-03-01',
      genres: ['Progressive Rock', 'Psychedelic Rock'],
      label: 'Harvest Records',
      tracks: [
        'Speak to Me',
        'Breathe (In the Air)',
        'On the Run',
        'Time',
        'The Great Gig in the Sky',
        'Money',
        'Us and Them',
        'Any Colour You Like',
        'Brain Damage',
        'Eclipse'
      ]
    },
    {
      id: '2',
      title: 'Abbey Road',
      artist: 'The Beatles',
      description: 'The eleventh studio album by the English rock band the Beatles, released on 26 September 1969.',
      score: 94,
      ratingText: 'Universal Acclaim',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg',
      releaseDate: '1969-09-26',
      genres: ['Rock', 'Pop'],
      label: 'Apple Records',
      tracks: [
        'Come Together',
        'Something',
        'Maxwell\'s Silver Hammer',
        'Oh! Darling',
        'Octopus\'s Garden',
        'I Want You (She\'s So Heavy)',
        'Here Comes the Sun',
        'Because',
        'You Never Give Me Your Money',
        'Sun King',
        'Mean Mr. Mustard',
        'Polythene Pam',
        'She Came in Through the Bathroom Window',
        'Golden Slumbers',
        'Carry That Weight',
        'The End',
        'Her Majesty'
      ]
    }
  ];

  // Check if it's an Apple Music ID (starts with 'apple-')
  let album = mockAlbums.find(a => a.id === id);
  
  if (!album && id.startsWith('apple-')) {
    // Generate mock data for Apple Music albums
    const index = parseInt(id.replace('apple-', '')) || 0;
    const mockScore = Math.max(60, 95 - (index * 2));
    
    album = {
      id,
      title: `Popular Album ${index + 1}`,
      artist: `Artist ${index + 1}`,
      description: `This is a popular album currently trending on the charts. It showcases the artist's unique style and has been well-received by both critics and fans.`,
      score: mockScore,
      ratingText: mockScore >= 75 ? 'Universal Acclaim' : mockScore >= 60 ? 'Generally Favorable' : 'Mixed or Average',
      imageUrl: `https://picsum.photos/400/400?random=${index}`,
      releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      genres: ['Pop', 'Alternative', 'Rock'][Math.floor(Math.random() * 3)] ? ['Pop'] : ['Alternative'],
      label: 'Universal Music Group',
      tracks: Array.from({ length: 10 + Math.floor(Math.random() * 5) }, (_, i) => `Track ${i + 1}`)
    };
  }
  
  if (!album) {
    return NextResponse.json({ error: 'Album not found' }, { status: 404 });
  }

  return NextResponse.json(album);
}