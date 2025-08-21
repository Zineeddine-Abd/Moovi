export default function SearchBar({ query, setQuery, handleSearch, isLoading }) {
    
    return (
        <div className="mt-8 flex w-full max-w-2xl">
        <input
            type="text"
            placeholder="Describe a movie or series you want to watch..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 rounded-l-2xl bg-[#1A1A1D] text-white h-12 border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#7626d7]"
        />
        <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-2 rounded-r-2xl bg-[#7626d7] text-white font-medium hover:bg-[#6712d0] cursor-pointer transition disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            {isLoading ? 'Searching...' : 'Search'}
        </button>
        </div>
    );
}
