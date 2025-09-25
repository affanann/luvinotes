import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import logo from "../assets/logo1.webp";

const ITEMS = [
  { id: "r1", person: { id: "Elon Musk", en: "Elon Musk" }, note: { id: "Rekomendasi buku untuk berpikir 10x lebih besar.", en: "Book picks to think 10x bigger." }, cover: logo },
  { id: "r2", person: { id: "Timothy Ferriss", en: "Timothy Ferriss" }, note: { id: "Pilihan untuk produktivitas dan hidup efektif.", en: "Picks for productivity and lifestyle design." }, cover: logo },
  { id: "r3", person: { id: "Naval Ravikant", en: "Naval Ravikant" }, note: { id: "Rekomendasi untuk wealth & wisdom.", en: "Recommendations on wealth & wisdom." }, cover: logo },
];

export default function RecommendationSection({ lang = "id", onSelect }) {
  const T = lang === "en" ? "Celebrity Book Picks" : "Rekomendasi Buku Artis";
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(1);
  const [enterAnim, setEnterAnim] = useState(null);

  const styles = `
  @keyframes enter-from-left{0%{transform:translate(-18px,24px) scale(.96) rotate(-1.2deg);opacity:0}100%{transform:translate(0,0) scale(1) rotate(0);opacity:1}}
  @keyframes enter-from-right{0%{transform:translate(18px,24px) scale(.96) rotate(1.2deg);opacity:0}100%{transform:translate(0,0) scale(1) rotate(0);opacity:1}}
  .anim-left{animation:enter-from-left .35s ease-out both}
  .anim-right{animation:enter-from-right .35s ease-out both}
  .no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
  `;

  // pusatkan kartu index 1 saat mount (mobile)
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const sc = scrollerRef.current;
    const el = cardRefs.current[1];
    if (!sc || !el) return;
    const target = el.offsetLeft - (sc.clientWidth - el.clientWidth) / 2;
    sc.scrollLeft = Math.max(0, target);
  }, []);

  // update activeIdx + anim saat swipe
  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const mid = sc.scrollLeft + sc.clientWidth / 2;
        let best = 0, bestDist = Infinity;
        cardRefs.current.forEach((c, i) => {
          if (!c) return;
          const center = c.offsetLeft + c.clientWidth / 2;
          const d = Math.abs(center - mid);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        if (best !== activeIdx) {
          const dir = best > activeIdx ? "right" : "left";
          setActiveIdx(best);
          setEnterAnim({ idx: best, dir });
          setTimeout(() => setEnterAnim(null), 420);
        }
      });
    };
    sc.addEventListener("scroll", onScroll, { passive: true });
    return () => sc.removeEventListener("scroll", onScroll);
  }, [activeIdx]);

  const mobileCardClass = (i) => {
    const isActive = i === activeIdx;
    const base = "group relative p-[2px] rounded-3xl min-w-[80%] snap-center transition-transform duration-200";
    const depth = isActive ? "z-10 scale-[1] translate-y-0" : "z-0 scale-[.94] translate-y-3";
    const shadow = isActive ? "shadow-xl" : "shadow";
    const tilt = !isActive ? (i < activeIdx ? "-rotate-[0.6deg]" : "rotate-[0.6deg]") : "";
    const anim = enterAnim && enterAnim.idx === i ? (enterAnim.dir === "right" ? "anim-right" : "anim-left") : "";
    return `${base} ${depth} ${shadow} ${tilt} ${anim}`;
  };

  return (
    <section className="mt-12">
      <style>{styles}</style>

      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">{T}</h2>
      </div>

      {/* MOBILE */}
      <div
        ref={scrollerRef}
        className="mt-6 md:hidden no-scrollbar overflow-x-auto overflow-y-visible snap-x snap-mandatory"
        /* 10% = (100% - 80%) / 2 agar gutter kiri/kanan simetris */
        style={{ scrollPaddingInline: "10%" }}
      >
        <div className="flex gap-4">
          {ITEMS.map((it, i) => {
            const name = it.person?.[lang] ?? it.person?.id ?? "";
            const note = it.note?.[lang] ?? it.note?.id ?? "";
            return (
              <article
                key={it.id}
                ref={(el) => (cardRefs.current[i] = el)}
                className={mobileCardClass(i)}
                style={{ transformOrigin: "50% 50%" }}
              >
                <div
                  className={`pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200 ${
                    i === activeIdx ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "conic-gradient(from 0deg at 50% 50%, #fde047 0deg, transparent 90deg, #fde047 180deg, transparent 270deg, #fde047 360deg)",
                    filter: "blur(6px)",
                  }}
                />
                <div className="relative z-10 rounded-[calc(theme(borderRadius.3xl)-2px)] bg-white text-neutral-900 transition-colors duration-200">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-[calc(theme(borderRadius.3xl)-2px)] bg-gray-50">
                    <img src={it.cover} alt={name} className="h-full w-full object-cover" loading="lazy" draggable="false" />
                  </div>
                  <div className="px-5 py-4">
                    <h3 className="text-lg font-bold tracking-tight">{name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{note}</p>
                    <button
                      onClick={() => onSelect?.(it)}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      {lang === "en" ? "See picks" : "Lihat pilihan"}
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="mx-auto mt-6 w-full max-w-[1280px] hidden md:grid grid-cols-3 gap-8">
        {ITEMS.map((it, i) => {
          const name = it.person?.[lang] ?? it.person?.id ?? "";
          const note = it.note?.[lang] ?? it.note?.id ?? "";
          const lift = i === 1 ? "md:-translate-y-3 lg:-translate-y-4" : "md:translate-y-1";
          return (
            <article key={it.id} className={`group relative overflow-hidden rounded-3xl p-[2px] ${lift}`}>
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, #fde047 0deg, transparent 90deg, #fde047 180deg, transparent 270deg, #fde047 360deg)",
                }}
              />
              <div className="relative z-10 rounded-[calc(theme(borderRadius.3xl)-2px)] bg-white text-neutral-900 transition-colors duration-300 group-hover:bg-neutral-900 group-hover:text-white">
                <div className="relative w-full aspect-square overflow-hidden rounded-t-[calc(theme(borderRadius.3xl)-2px)] bg-gray-50">
                  <img src={it.cover} alt={name} className="h-full w-full object-cover" loading="lazy" draggable="false" />
                </div>
                <div className="px-5 py-4">
                  <h3 className="text-lg font-bold tracking-tight">{name}</h3>
                  <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-300">{note}</p>
                  <button
                    onClick={() => onSelect?.(it)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black group-hover:border-yellow-400 group-hover:hover:bg-yellow-400 group-hover:hover:text-black transition-colors"
                  >
                    {lang === "en" ? "See picks" : "Lihat pilihan"}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
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
