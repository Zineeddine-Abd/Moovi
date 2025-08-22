export default function MovieCard({ movie }) {

  const getRating = (source) => {
    const rating = movie.Ratings?.find(r => r.Source === source);
    return rating ? rating.Value : null;
  };

  const rottenTomatoesScore = getRating("Rotten Tomatoes");
  const imdbScore = getRating("Internet Movie Database");

  return (
    <div
      className="p-4 bg-[#1A1A1D] rounded-2xl shadow-md border border-[#333] hover:border-[#7626d7] transition"
    >
      <div className="flex items-start">
        <img 
          src={movie.Poster} 
          alt={`Poster for ${movie.Title}`} 
          className="w-20 h-28 object-cover rounded-md mr-4 bg-[#0D0D0F] flex-shrink-0"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/80x112?text=No+Image'; }}
        />
        <div>
          <h2 className="text-xl font-semibold">{movie.Title}</h2>
          <p className="text-[#B3B3B3] mb-1">{movie.Year}</p> 
          <p className="text-[#B3B3B3] mb-2">Runtime : {movie.Runtime}</p>
          
          <div className="flex items-center space-x-4 mt-2">
            {rottenTomatoesScore && (
              <div className="flex items-center space-x-1">
                <span className="text-lg" role="img" aria-label="Tomatometer">🍅</span>
                <span className="font-bold text-white">{rottenTomatoesScore}</span>
              </div>
            )}
            {imdbScore && (
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold text-yellow-400" aria-label="IMDb Score">IMDb</span>
                <span className="font-bold text-white">{imdbScore}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mt-4 border-t border-gray-700 pt-4">
        {movie.Plot}
      </p>
    </div>
  );
}