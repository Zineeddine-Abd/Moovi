export default function SkeletonCard() {
  return (
    <div className="p-4 bg-[#1A1A1D] rounded-2xl shadow-md border border-[#333] flex items-start">

      <div className="w-24 h-36 rounded-md mr-4 bg-gray-700 animate-pulse"></div>

      <div className="flex-1">
        <div className="h-6 w-3/4 mb-3 bg-gray-700 rounded animate-pulse"></div>

        <div className="h-4 w-1/2 mb-4 bg-gray-700 rounded animate-pulse"></div>

        <div className="h-4 w-full mb-2 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-full mb-2 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
      </div>

    </div>
  );
}