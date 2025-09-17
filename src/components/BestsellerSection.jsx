import React from "react";
import logo1 from "../assets/logo1.webp";
import logo2 from "../assets/logo1.webp";
import logo3 from "../assets/logo1.webp";
import logo4 from "../assets/logo1.webp";
import logo5 from "../assets/logo1.webp";

const DEFAULT_ITEMS = [
  {
    id: "b1",
    title: {
      id: "KOLEKSI 43+ JUTA E-BOOK BERBAGAI KATEGORI",
      en: "COLLECTION OF 43+ MILLION E-BOOKS ACROSS CATEGORIES",
    },
    thumbnail: logo1,
  },
  {
    id: "b2",
    title: {
      id: "KOLEKSI NOVEL BESTSELLER: Tere Liye, Pramoedya & Lainnya",
      en: "BESTSELLING NOVEL COLLECTION: Tere Liye, Pramoedya & More",
    },
    thumbnail: logo5,
  },
  {
    id: "b3",
    title: {
      id: "30 Buku Rahasia Membangun Kekayaan & Investasi",
      en: "30 Books Secret on How to Build Wealth & Investing",
    },
    thumbnail: logo2,
  },
  {
    id: "b4",
    title: {
      id: "30 Buku Panduan Parenting & Keluarga Bahagia",
      en: "30 Books for Parenting Guides & Happy Family",
    },
    thumbnail: logo3,
  },
  {
    id: "b5",
    title: {
      id: "30 Buku Cara Networking & Berkomunikasi",
      en: "30 Books on Networking & Communication",
    },
    thumbnail: logo4,
  },
];

export default function BestsellerSection({ items, onAdd, lang = "id" }) {
  const data = items && items.length ? items : DEFAULT_ITEMS;
  const TITLE = "BESTSELLER!!";
  const BTN_LABEL = lang === "en" ? "Buy Now" : "Beli Sekarang";

  // section
  return (
    <section className="mt-12">
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* banner judul */}
      <div className="mx-auto w-full max-w-[1280px] rounded-3xl bg-neutral-900 text-white ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.18)] px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <h2
          className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ffffff, #fde68a, #ffffff, #f59e0b, #ffffff)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            backgroundSize: "300% 100%",
            animation: "gradientShift 6s linear infinite",
          }}
        >
          {TITLE}
        </h2>

        {/* grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {data.map((b) => {
            const titleText = (b.title && (b.title[lang] || b.title.id)) || "";
            return (
              // kartu
              <article
                key={b.id}
                className="
                  rounded-3xl bg-white text-black
                  border-4 border-transparent
                  shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                  transition-colors
                  hover:border-yellow-400
                  hover:outline-[6px] hover:outline-black
                "
                aria-label={titleText}
              >
                {/* wrapper */}
                <div className="overflow-hidden rounded-[1.25rem]">
                  {/* gambar */}
                  <div className="relative w-full aspect-square bg-gray-50">
                    {b.thumbnail ? (
                      <img
                        src={b.thumbnail}
                        alt={titleText}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        draggable="false"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="h-16 w-16 rounded-xl bg-black/10" />
                      </div>
                    )}
                  </div>

                  {/* body */}
                  <div className="px-4 pb-4 pt-3">
                    <h3 className="line-clamp-3 min-h-[3.5rem] text-base sm:text-lg font-bold tracking-tight">
                      {titleText}
                    </h3>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-emerald-700 text-xl font-extrabold">
                        Rp 99.000
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        Rp 599.000
                      </span>
                    </div>

                    {/* tombol */}
                    <button
                      onClick={() => onAdd?.(b)}
                      className="
                        mt-4 w-full rounded-full
                        bg-yellow-400 text-neutral-900
                        px-4 py-3 font-bold
                        transition-colors duration-200
                        hover:bg-neutral-900 hover:text-white
                        focus:outline-none focus:ring-2 focus:ring-black/20
                      "
                    >
                      {BTN_LABEL}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
