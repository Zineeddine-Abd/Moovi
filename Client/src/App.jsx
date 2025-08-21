import { useState } from "react";
import './App.css'
import SearchResults from './Components/SearchResults'
import SearchBar from './Components/SearchBar'
import MooviCharacter from "./Components/MooviCharacter";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('pre-welcome');

  const handleStart = () => {
    setStatus('welcome');
  };

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setMovies([]);
    setStatus('searching');

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
      const foundMovies = finalAnswerObject.movies || [];
      setMovies(foundMovies);

      if (foundMovies.length > 0) {
        setStatus('success'); // <-- Moovi is proud of the results!
      } else {
        setStatus('idle'); // <-- Moovi is waiting again if no results found
      }

    } catch (err) {
      setError(err.message);
      setStatus('idle');
    } finally {
      setIsLoading(false);
    }
  };

  // If the app hasn't started yet, show the welcome button.
  if (status === 'pre-welcome') {
    return (
      <div className="min-h-screen bg-[#0D0D0F] flex flex-col items-center justify-center text-white">
        <img src="/moovi-static.png" alt="Moovi" className="w-40 h-40 rounded-2xl object-cover mb-8" />
        <h1 className="text-3xl font-bold mb-4">Welcome to Moovi</h1>
        <p className="text-lg text-gray-400 mb-8">Your personal AI movie and series guide.</p>
        <button
          onClick={handleStart}
          className="px-8 py-3 rounded-xl bg-[#7626d7] text-white font-bold text-lg hover:bg-[#6712d0] cursor-pointer transition"
        >
          Start
        </button>
      </div>
    );
  }

  // Otherwise, show the main application.
  return (
    <div className="min-h-screen pb-10 bg-[#0D0D0F] flex flex-col items-center text-white">
      
      <MooviCharacter status={status} />

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