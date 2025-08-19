import './App.css';
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch('http://localhost:3001/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong with the request!');
      }
      
      const finalAnswerObject = JSON.parse(data.response);

      setMovies(finalAnswerObject.movies || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-10 bg-[#0D0D0F] flex flex-col items-center text-white">
      <div className="mt-20">
        <img
          src="/bot.jpg"
          alt="Ai Agent"
          className="w-40 h-40 rounded-2xl object-cover"
        />
      </div>

      <div className="mt-8 flex w-full max-w-2xl">
        <input
          type="text"
          placeholder="Describe what you want to watch..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 rounded-l-2xl bg-[#1A1A1D] text-white h-12 border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-6 py-2 rounded-r-2xl bg-[#1DB954] text-white font-medium hover:bg-[#10d455] transition disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {movies.length > 0 && (
          <div className="grid gap-4">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="p-4 bg-[#1A1A1D] rounded-2xl shadow-md border border-[#333] hover:border-[#1DB954] transition flex items-center"
              >
                <img 
                  src={movie.Poster} 
                  alt={`Poster for ${movie.Title}`} 
                  className="w-20 h-auto rounded-md mr-4 bg-[#0D0D0F]"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div>
                  <h2 className="text-xl font-semibold">{movie.Title}</h2>
                  <p className="text-[#B3B3B3]">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;