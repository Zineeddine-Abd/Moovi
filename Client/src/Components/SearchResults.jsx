import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

export default function SearchResults({ isLoading, error, movies }) {
  
    if (isLoading) {
        return (
            <div className="grid gap-4">
                {[...Array(3)].map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        )
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
