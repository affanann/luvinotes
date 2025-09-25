import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RightDrawer({ open, onClose, lang = "id" }) {
  const nav = useNavigate();
  const loc = useLocation();
  const isID = lang === "id";

  // kategori
  const CATS = useMemo(
    () => [
      { id: "wealth",    label: { id: "Kekayaan",    en: "Wealth" },      q: "rich" },
      { id: "investment",label: { id: "Investasi",   en: "Investment" },  q: "investment" },
      { id: "mindset",   label: { id: "Mindset",     en: "Mindset" },     q: "psychology" },
      { id: "history",   label: { id: "Sejarah",     en: "History" },     q: "history" },
      { id: "education", label: { id: "Edukasi",     en: "Education" },   q: "education" },
      { id: "science",   label: { id: "Sains",       en: "Science" },     q: "science" },
      { id: "kids",      label: { id: "Anak-anak",   en: "Kids" },        q: "children" },
      { id: "cooking",   label: { id: "Memasak",     en: "Cooking" },     q: "cooking" },
      { id: "novel",     label: { id: "Novel",       en: "Novel" },       q: "fiction" },
      { id: "comics",    label: { id: "Komik",       en: "Comics" },      q: "comics" },
    ],
    []
  );

  const [catOpen, setCatOpen] = useState(true);

  function goAnchor(id) {
    if (loc.pathname !== "/") {
      nav("/" + `#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClose?.();
  }

  function goSearch(q) {
    nav(`/search?q=${encodeURIComponent(q)}`);
    onClose?.();
  }

  // section
  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 z-[58] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* drawer */}
      <aside
        className={`
          fixed right-0 top-0 z-[59] h-dvh w-[85vw] max-w-[380px]
          bg-white shadow-2xl border-l border-black/10
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* header */}
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold">
            {isID ? "Menu" : "Menu"}
          </h3>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full hover:bg-black/5 grid place-items-center"
            aria-label={isID ? "Tutup" : "Close"}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {/* kategori */}
          <div className="mb-3">
            <button
              onClick={() => setCatOpen((v) => !v)}
              className="w-full px-3 py-3 rounded-xl hover:bg-gray-50 flex items-center justify-between"
            >
              <span className="font-semibold">
                {isID ? "Kategori Buku" : "Book Categories"}
              </span>
              <svg
                className={`h-4 w-4 transition-transform ${catOpen ? "rotate-180" : "rotate-0"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div
              className={`grid transition-all duration-300 ${catOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <ul className="px-1 py-1">
                  {CATS.map((c) => (
                    <li key={c.id}>
                      <button
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                        onClick={() => goSearch(c.q)}
                      >
                        {c.label[lang] || c.label.id}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* bundle */}
          <button
            className="w-full px-3 py-3 rounded-xl hover:bg-gray-50 text-left font-semibold"
            onClick={() => goAnchor("bundle")}
          >
            {isID ? "Bundle & Katalog" : "Bundles & Catalog"}
          </button>
        </div>

        {/* footer */}
        <div className="px-5 py-3 border-t text-xs text-gray-500">
          {isID
            ? "Gunakan menu ini untuk menjelajah kategori dan bagian halaman."
            : "Use this menu to explore categories and jump to page sections."}
        </div>
      </aside>
    </>
  );
}
