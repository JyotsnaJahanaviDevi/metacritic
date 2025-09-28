import { NextRequest, NextResponse } from 'next/server';

// Mock video data as fallback
const mockVideosData = [
  {
    id: 1,
    title: "Spider-Man: Beyond the Spider-Verse",
    thumbnail: "https://picsum.photos/seed/spiderman/720/405",
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    duration: "2:31",
    type: "movie",
    metascore: "tbd"
  },
  {
    id: 2,
    title: 'SILENT HILL f | Official Launch Trailer',
    thumbnail: 'https://cdn.jwplayer.com/v2/media/zJMvXDvR/poster.jpg?width=720',
    videoUrl: "https://youtu.be/rpMdiGYIIXY?si=hBeZf16wNO36tOJB",
    duration: '2:10',
    type: 'game'
  },
  {
    id: 3,
    title: 'FINAL FANTASY TACTICS: The Ivalice Chronicles – Official Story Trailer',
    thumbnail: 'https://cdn.jwplayer.com/v2/media/kPjNbUfg/poster.jpg?width=720',
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    duration: '1:54',
    type: 'game'
  },
  {
    id: 4,
    title: 'Ghost of Yotei - 19 Minute Gameplay Deep Dive',
    thumbnail: 'https://cdn.jwplayer.com/v2/media/VmLr4Tss/poster.jpg?width=720',
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    duration: '19:12',
    type: 'game'
  },
  {
    id: 5,
    title: 'One Battle After Another (Trailer 2)',
    thumbnail: 'https://cdn.jwplayer.com/v2/media/yaUNlgRi/poster.jpg?width=720',
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    duration: '2:24',
    type: 'movie'
  }
];

// Function to fetch videos from external APIs
async function fetchVideosFromAPI(): Promise<typeof mockVideosData> {
  try {
    // In a real implementation, you would call actual API endpoints here
    // For now, we'll use the mock data since we don't have real API keys
    return mockVideosData;
  } catch (error) {
    console.error('Error fetching videos from API:', error);
    // Fallback to mock data if API call fails
    return mockVideosData;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get limit parameter from request URL
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    
    // Fetch videos
    const videos = await fetchVideosFromAPI();
    
    // Limit the number of videos returned
    const limitedVideos = videos.slice(0, limit);
    
    // Return the videos as JSON
    return NextResponse.json(limitedVideos);
  } catch (error) {
    console.error('Error in GET /api/videos:', error);
    // Return mock data as fallback
    const limit = parseInt(new URL(request.url).searchParams.get('limit') || '20', 10);
    return NextResponse.json(mockVideosData.slice(0, limit));
  }
}