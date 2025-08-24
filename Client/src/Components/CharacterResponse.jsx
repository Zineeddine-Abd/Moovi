
export default function CharacterResponse({ text }) {

  if (!text) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mb-6 p-4 bg-[#1A1A1D] border border-[#333] rounded-2xl animate-fade-in">
      <p className="text-gray-300 font-rajdhani text-lg">
        {text}
      </p>
    </div>
  );
}