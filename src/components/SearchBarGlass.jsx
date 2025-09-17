import { useId } from "react";

export default function SearchBarGlass({
  value,
  onChange,
  onSubmit,
  placeholder,
  lang = "id",
}) {
  const id = useId();
  const isID = lang === "id";
  const buttonText = isID ? "Cari" : "Search";
  const srLabel = isID ? "Pencarian" : "Search";

  // form
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="relative"
    >
      <label htmlFor={id} className="sr-only">
        {srLabel}
      </label>

      {/* input group */}
      <div className="flex items-center gap-2 rounded-full border-2 border-gray-500 bg-white/40 px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur supports-[backdrop-filter]:bg-white/30 overflow-hidden">
        {/* icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        {/* input */}
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder ?? (isID ? "Cari buku…" : "Search books…")}
          className="w-full bg-transparent outline-none placeholder:text-gray-500 border-none rounded-none p-0"
        />

        {/* button */}
        <button
          type="submit"
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 border-none"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
