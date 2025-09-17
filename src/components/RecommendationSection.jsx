import React from "react";
import logo from "../assets/logo1.webp";

const ITEMS = [
  {
    id: "r1",
    person: { id: "Elon Musk", en: "Elon Musk" },
    note: {
      id: "Rekomendasi buku untuk berpikir 10x lebih besar.",
      en: "Book picks to think 10x bigger.",
    },
    cover: logo,
  },
  {
    id: "r2",
    person: { id: "Timothy Ferriss", en: "Timothy Ferriss" },
    note: {
      id: "Pilihan untuk produktivitas dan hidup efektif.",
      en: "Picks for productivity and lifestyle design.",
    },
    cover: logo,
  },
  {
    id: "r3",
    person: { id: "Naval Ravikant", en: "Naval Ravikant" },
    note: {
      id: "Rekomendasi untuk wealth & wisdom.",
      en: "Recommendations on wealth & wisdom.",
    },
    cover: logo,
  },
];

export default function RecommendationSection({ lang = "id", onSelect }) {
  const T = lang === "en" ? "Recommendations" : "Rekomendasi";

  // section
  return (
    <section className="mt-12">
      <style>{`
        @keyframes rec-spin { 
          from { transform: rotate(0deg); } 
          to   { transform: rotate(360deg); } 
        }
      `}</style>

      {/* judul */}
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          {T}
        </h2>
      </div>

      {/* grid */}
      <div className="mx-auto mt-6 w-full max-w-[1280px] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {ITEMS.map((it, i) => {
          const name = it.person?.[lang] ?? it.person?.id ?? "";
          const note = it.note?.[lang] ?? it.note?.id ?? "";
          const lift = i === 1 ? "md:-translate-y-3 lg:-translate-y-4" : "md:translate-y-1";

          return (
            <article
              key={it.id}
              className={`group relative overflow-hidden rounded-3xl p-[2px] ${lift} transition-transform duration-300`}
            >
              {/* border animasi */}
              <div
                className="
                  pointer-events-none absolute inset-0 rounded-3xl
                  opacity-0 group-hover:opacity-100
                "
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, #fde047 0deg, transparent 90deg, #fde047 180deg, transparent 270deg, #fde047 360deg)",
                  animation: "rec-spin 5s linear infinite",
                }}
              />

              {/* card */}
              <div
                className="
                  relative z-10 rounded-[calc(theme(borderRadius.3xl)-2px)]
                  bg-white text-neutral-900
                  transition-colors duration-300
                  group-hover:bg-neutral-900 group-hover:text-white
                "
              >
                {/* image */}
                <div className="relative w-full aspect-square overflow-hidden rounded-t-[calc(theme(borderRadius.3xl)-2px)] bg-gray-50">
                  <img
                    src={it.cover}
                    alt={name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable="false"
                  />
                </div>

                {/* body */}
                <div className="px-5 py-4">
                  <h3 className="text-lg font-bold tracking-tight">{name}</h3>
                  <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-300">
                    {note}
                  </p>

                  {/* tombol */}
                  <button
                    onClick={() => onSelect?.(it)}
                    className="
                      mt-4 inline-flex items-center gap-2 rounded-full
                      border border-gray-300 px-4 py-2 text-sm font-medium
                      hover:bg-gray-100 hover:text-black
                      group-hover:border-yellow-400 group-hover:hover:bg-yellow-400 group-hover:hover:text-black
                      transition-colors
                    "
                  >
                    {lang === "en" ? "See picks" : "Lihat pilihan"}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
