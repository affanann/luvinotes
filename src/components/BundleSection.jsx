import React from "react";
import logo from "../assets/logo1.webp";

const ITEMS = [
  { id: "p1", title: { id: "Bundle 1400+ Procreate Brushes", en: "Bundle 1400+ Procreate Brushes" }, seller: "FUPstudio", price: 445418, strike: 891036, thumb: logo },
  { id: "p2", title: { id: "Buku Anak Personal – Goodnight Little", en: "Personalized Kid Book – Goodnight Little" }, seller: "MyKidsDream", price: 508659, strike: 678268, thumb: logo },
  { id: "p3", title: { id: "Entire Shop Bundle – Lifetime Access", en: "Entire Shop Bundle – Lifetime Access" }, seller: "TheAgentSiteShop", price: 12212903, strike: 18788964, thumb: logo },
  { id: "p4", title: { id: "Digital Product Creator Kit: E-Book & Template", en: "Digital Product Creator Kit: E-Book & Template" }, seller: "ElevateCreateLab", price: 141256, strike: 565365, thumb: logo },
  { id: "p5", title: { id: "Paket Panduan Desain Sosmed 600+ Template", en: "Social Design Guide 600+ Templates" }, seller: "BrightDesign", price: 99000, strike: 599000, thumb: logo },
  { id: "p6", title: { id: "Bundle Copywriting & Headline Generator", en: "Copywriting & Headline Generator Bundle" }, seller: "CopyLab", price: 99000, strike: 599000, thumb: logo },
  { id: "p7", title: { id: "Preset Foto & LUTs Sinematik", en: "Cinematic Photo Presets & LUTs" }, seller: "ColorForge", price: 99000, strike: 599000, thumb: logo },
  { id: "p8", title: { id: "Bundle Icon & Illustration Pack", en: "Icon & Illustration Mega Pack" }, seller: "VectorHub", price: 99000, strike: 599000, thumb: logo },
];

function money(n) { return "Rp " + (n || 0).toLocaleString("id-ID"); }

export default function BundleSection({ lang = "id", onAdd }) {
  const T = lang === "en"
    ? { title: "BUNDLES & CATALOG", digital: "Digital download", add: "Add to cart", by: "By" }
    : { title: "BUNDLE & KATALOG", digital: "Unduhan digital", add: "Tambah ke keranjang", by: "Oleh" };

  // section
  return (
    <section className="mt-12">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          {T.title}
        </h2>
      </div>

      {/* grid */}
      <div className="mx-auto mt-6 w-full max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ITEMS.map(p => {
          const title = p.title?.[lang] ?? p.title?.id ?? "";
          return (
            <article
              key={p.id}
              className="h-full rounded-3xl bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] transition flex flex-col"
            >
              {/* image */}
              <div className="relative w-full aspect-square bg-gray-50 overflow-hidden rounded-t-3xl">
                <img
                  src={p.thumb}
                  alt={title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  draggable="false"
                />
              </div>

              {/* content */}
              <div className="flex-1 px-4 pb-4 pt-3 flex flex-col">
                <p className="text-xs text-emerald-700 font-semibold tracking-wide">{T.digital}</p>

                <h3 className="mt-1 text-base sm:text-lg font-semibold tracking-tight line-clamp-2 min-h-[3.2rem]">
                  {title}
                </h3>

                <p className="mt-1 text-sm text-gray-500 min-h-[1.25rem]">
                  {T.by} {p.seller}
                </p>

                <div className="mt-auto" />

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-emerald-700 text-xl font-extrabold">{money(p.price)}</span>
                  {p.strike ? <span className="text-sm text-gray-500 line-through">{money(p.strike)}</span> : null}
                </div>

                {/* tombol */}
                <button
                  onClick={() => onAdd?.(p)}
                  className="
                    mt-4 w-full h-12 rounded-full
                    bg-white text-gray-900 border border-gray-300
                    hover:bg-gray-100 active:bg-gray-200
                    inline-flex items-center justify-center gap-3
                    font-semibold transition-colors
                  "
                >
                  <span className="inline-grid place-items-center h-7 w-7 rounded-full border border-gray-300">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                  <span>{T.add}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
