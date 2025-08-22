import os
import json
from smolagents import tool
from googleapiclient.discovery import build

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

@tool
def find_youtube_trailer(media_title: str, year: str = "") -> str:
    """
    Searches YouTube for the official trailer of a given movie or series.
    Args:
        media_title: The exact title of the movie or series to find a trailer for.
        year: The year the media was released to make the search more accurate.
    Returns:
        A JSON string containing the URL to the most relevant YouTube trailer.
    """
    if not YOUTUBE_API_KEY:
        return json.dumps({"error": "YouTube API key is not configured."})
    
    try:
        youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
        
        search_query = f"{media_title} {year} official trailer"
        
        request = youtube.search().list(
            q=search_query,
            part='snippet',
            type='video',
            maxResults=1
        )
        response = request.execute()
        
        if response.get('items'):
            video_id = response['items'][0]['id']['videoId']
            trailer_url = f"https://www.youtube.com/watch?v={video_id}"
            return json.dumps({"trailer_url": trailer_url})
        else:
            return json.dumps({"error": "No trailer found on YouTube."})
            
    except Exception as e:
        return json.dumps({"error": f"An error occurred while searching YouTube: {str(e)}"})