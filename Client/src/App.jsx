import './App.css'
import { useState } from "react";

function App() {
  
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = () => {

    setMovies([
      { id: 1, title: "Inception", year: "2010" },
      { id: 2, title: "The Dark Knight", year: "2008" },
      { id: 3, title: "Interstellar", year: "2014" },
    ]);
  };

  return (

    <div className="min-h-screen pb-10 bg-[#0D0D0F] flex flex-col items-center text-white">

      <div className="mt-20">
        <img
          src="../public/bot.jpg"
          alt="Ai Agent"
          className="w-100 h-100 rounded-2xl"
        />
      </div>

      <div className="mt-8 flex">
        <input
          type="text"
          placeholder="Describe what do you want to watch, or basicaly, whats your vibe ?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-l-2xl bg-[#1A1A1D] text-white w-200 h-20 border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 rounded-r-2xl bg-[#1DB954] text-white font-medium hover:bg-[#10d455] transition"
        >
          Search
        </button>
      </div>

      <div className="mt-10 w-full max-w-220">
        {movies.length > 0 && (
          <div className="grid gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="p-4 bg-[#1A1A1D] rounded-2xl shadow-md border border-[#333] hover:border-[#1DB954] transition"
              >
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-[#B3B3B3]">{movie.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
