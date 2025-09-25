import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBarGlass from "./SearchBarGlass";

const BASE_SUGGESTIONS = [
  "business",
  "investment",
  "fiction",
  "science",
  "history",
  "self-help",
  "parenting",
  "novel indonesia",
  "biografi",
  "komik",
];

export default function SearchExperience({ lang = "id" }) {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const initialQ = params.get("q") || "";
  const [value, setValue] = useState(initialQ);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const filtered = useMemo(() => {
    const v = value.trim().toLowerCase();
    if (!v) return BASE_SUGGESTIONS.slice(0, 6);
    return BASE_SUGGESTIONS.filter((s) => s.toLowerCase().includes(v)).slice(
      0,
      8
    );
  }, [value]);

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const submit = (q) => {
    const query = (q ?? value).trim();
    if (!query) return;
    setOpen(false);
    nav(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative">
      <SearchBarGlass
        lang={lang}
        value={value}
        onChange={(v) => {
          setValue(v);
          if (!open) setOpen(true);
        }}
        onSubmit={() => submit()}
        placeholder={lang === "en" ? "Search books…" : "Cari buku…"}
      />

      {open && (
        <div
          ref={boxRef}
          className="absolute left-1/2 -translate-x-1/2 z-40 mt-2 w-[min(92vw,700px)] rounded-2xl border border-black/10 bg-white shadow-2xl"
        >
          <div className="px-4 py-3 border-b bg-white/80 backdrop-blur">
            <p className="text-sm font-semibold">
              {lang === "en" ? "Suggestions" : "Rekomendasi"}
            </p>
          </div>

          <ul className="max-h-[50vh] overflow-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500">
                {lang === "en" ? "No suggestions" : "Tidak ada saran"}
              </li>
            )}
            {filtered.map((s) => (
              <li key={s}>
                <button
                  onClick={() => submit(s)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border text-xs">
                    ↵
                  </span>
                  <span className="truncate">{s}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
