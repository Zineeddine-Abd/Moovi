import os
import requests
import json
from smolagents import tool

OMDB_API_KEY = os.getenv("OMDB_API_KEY")
OMDB_BASE_URL = "http://www.omdbapi.com/"

@tool
def search_movie_by_title(title: str, year: str = "") -> str:
    """
    Searches for movies by their title using the OMDb API. This tool requires a specific movie title to work effectively.
    Args:
        title: The exact movie title to search for (e.g., "Inception").
        year: An optional release year to narrow down the search.
    Returns:
        A JSON string of search results.
    """
    params = {
        "apikey": OMDB_API_KEY,
        "s": title,
        "y": year if year else None,
    }
    params = {k: v for k, v in params.items() if v is not None}
    try:
        # Added a 10-second timeout for robustness
        response = requests.get(OMDB_BASE_URL, params=params, timeout=10)
        response.raise_for_status() # Raise an exception for bad status codes (like 404 or 500)
        data = response.json()
        if data.get("Response") == "True":
            return json.dumps(data.get("Search", []))
        else:
            return json.dumps({"Error": data.get("Error", "Unknown error")})
    except requests.exceptions.Timeout:
        return json.dumps({"Error": "The request to OMDb API timed out."})
    except requests.exceptions.RequestException as e:
        return json.dumps({"Error": f"An API request error occurred: {e}"})


@tool
def get_movie_details_by_id(imdb_id: str) -> str:
    """
    Gets detailed plot information, ratings, and more for a specific movie using its IMDb ID.
    Args:
        imdb_id: The IMDb ID of the movie (e.g., tt1375666 for Inception).
    Returns:
        A JSON string containing detailed movie information.
    """
    params = {
        "apikey": OMDB_API_KEY,
        "i": imdb_id,
        "plot": "full"
    }
    try:
        # Added a 10-second timeout
        response = requests.get(OMDB_BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        return json.dumps(response.json())
    except requests.exceptions.Timeout:
        return json.dumps({"Error": "The request to OMDb API timed out."})
    except requests.exceptions.RequestException as e:
        return json.dumps({"Error": f"An API request error occurred: {e}"})