export default function SkeletonCard() {
  return (
    <div
      className="p-4 bg-[#1A1A1D] rounded-2xl shadow-md border border-[#333]"
    >
      <div className="flex items-start">
        <div className="w-20 h-28 rounded-md mr-4 bg-gray-700 animate-pulse flex-shrink-0"></div>
        <div className="flex-1">

          <div className="h-6 w-3/4 mb-2 bg-gray-700 rounded animate-pulse"></div>

          <div className="h-4 w-1/3 mb-2 bg-gray-700 rounded animate-pulse"></div>

          <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse"></div>

        </div>
      </div>
      
      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="h-4 w-full mb-2 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-full mb-2 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
}