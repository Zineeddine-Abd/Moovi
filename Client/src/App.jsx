import { useState } from "react";
import './App.css'
import SearchResults from './Components/SearchResults'
import SearchBar from './Components/SearchBar'
import MooviCharacter from "./Components/MooviCharacter";
import Footer from './Components/Footer'
import CharacterResponse from "./Components/CharacterResponse";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('pre-welcome');
   const [characterResponse, setCharacterResponse] = useState("");

  const handleStart = () => {
    setStatus('welcome');
  };

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setMovies([]);
    setCharacterResponse("");
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

      setCharacterResponse(finalAnswerObject.character_response || "");
      setMovies(foundMovies);

      if (foundMovies.length > 0) {
        setStatus('success');
      } else {
        setStatus('idle');
      }

    } catch (err) {
      setError(err.message);
      setStatus('idle');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'pre-welcome') {
    return (
      <div className="min-h-screen bg-[#0D0D0F] flex flex-col items-center justify-center text-white">
        <img src="/moovi-static.png" alt="Moovi" className="h-50 w-50 md:h-70 md:w-70 rounded-2xl object-cover mb-8 neon-border" />
        <h1 className="text-3xl font-bold mb-2">Welcome to Moovi</h1>
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

  return (
    <div className="min-h-screen pb-10 flex flex-col items-center text-white">
      
      <main className="w-full flex flex-col items-center flex-grow px-6">

        <h1 className="text-4xl md:text-6xl font-bold mt-10 font-orbitron tracking-widest uppercase text-center">
          Moovi
        </h1>

        <MooviCharacter status={status} />

        <SearchBar 
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />

        <div className="mt-10 w-full max-w-2xl">

          <CharacterResponse text={characterResponse} />

          <SearchResults 
            isLoading={isLoading}
            error={error}
            movies={movies}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;