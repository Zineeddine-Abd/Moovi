import MovieCard from "./MovieCard";

export default function SearchResults({ isLoading, error, movies }) {
  
    if (isLoading) {
        return <p className="text-center text-[#B3B3B3]">Moovi is searching the cosmos for you...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (movies.length > 0) {
        return (
        <div className="grid gap-4">
            {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
        );
    }

    return null;
}
