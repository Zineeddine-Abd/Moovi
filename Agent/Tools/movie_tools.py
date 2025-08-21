import os
import requests
import json
from smolagents import tool

OMDB_API_KEY = os.getenv("OMDB_API_KEY")
OMDB_BASE_URL = "http://www.omdbapi.com/"

@tool
def search_media_by_title(title: str, year: str = "") -> str:
    """
    Searches for movies or series by their title using the OMDb API.
    Args:
        title: The exact title to search for (e.g., "Inception", "Breaking Bad").
        year: An optional release year to narrow down the search.
    Returns:
        The full JSON response string from the OMDb API.
    """
    params = {
        "apikey": OMDB_API_KEY,
        "s": title,
        "y": year if year else None,
    }
    params = {k: v for k, v in params.items() if v is not None}
    try:
        response = requests.get(OMDB_BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        # --- THIS IS THE FIX ---
        # Return the entire JSON response as a raw string.
        # This allows the agent to see the "Response": "True" key.
        return response.text
    except requests.exceptions.Timeout:
        return json.dumps({"Error": "The request to OMDb API timed out."})
    except requests.exceptions.RequestException as e:
        return json.dumps({"Error": f"An API request error occurred: {e}"})


@tool
def get_media_details_by_id(imdb_id: str) -> str:
    """
    Gets detailed plot information, ratings, and more for a specific movie or series using its IMDb ID.
    Args:
        imdb_id: The IMDb ID of the media (e.g., tt1375666 for Inception).
    Returns:
        The full JSON response string from the OMDb API.
    """
    params = {
        "apikey": OMDB_API_KEY,
        "i": imdb_id,
        "plot": "full"
    }
    try:
        response = requests.get(OMDB_BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        # --- THIS IS THE FIX ---
        # Return the entire JSON response as a raw string.
        return response.text
    except requests.exceptions.Timeout:
        return json.dumps({"Error": "The request to OMDb API timed out."})
    except requests.exceptions.RequestException as e:
        return json.dumps({"Error": f"An API request error occurred: {e}"})