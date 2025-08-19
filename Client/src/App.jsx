import { useState } from "react";
import './App.css'
import SearchResults from './Components/SearchResults'
import SearchBar from './Components/SearchBar'

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
        headers: { 'Content-Type': 'application/json' },
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
          alt="Moovi, your friendly AI agent"
          className="w-40 h-40 rounded-2xl object-cover"
        />
      </div>

      <SearchBar 
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />

      <div className="mt-10 w-full max-w-2xl">
        <SearchResults 
          isLoading={isLoading}
          error={error}
          movies={movies}
        />
      </div>
    </div>
  );
}

export default App;