import { useId } from "react";

export default function SearchBarGlass({
  value,
  onChange,
  onSubmit,
  placeholder,
}) {
  const id = useId();

  // section
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="relative"
    >
      <label htmlFor={id} className="sr-only">
        Search
      </label>

      {/* input group */}
      <div className="flex items-center gap-2 rounded-full border-black border-2 bg-white/40 px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur supports-[backdrop-filter]:bg-white/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder || "Search…"}
          className="w-full bg-transparent outline-none placeholder:text-gray-500"
        />
        <button
          type="submit"
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Cari
        </button>
      </div>
    </form>
  );
}
