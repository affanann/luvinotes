import React from "react";

import ic1  from "../assets/iconkategori1.webp";
import ic2  from "../assets/iconkategori2.webp";
import ic3  from "../assets/iconkategori3.webp";
import ic4  from "../assets/iconkategori4.webp";
import ic5  from "../assets/iconkategori5.webp";
import ic6  from "../assets/iconkategori6.webp";
import ic7  from "../assets/iconkategori7.webp";
import ic8  from "../assets/iconkategori8.webp";
import ic9  from "../assets/iconkategori9.webp";
import ic10 from "../assets/iconkategori10.webp";

const CATS = [
  { id: "wealth",     label: { id: "Kekayaan",   en: "Wealth" },     icon: ic1,  q: "rich" },
  { id: "investment", label: { id: "Investasi",  en: "Investment" }, icon: ic2,  q: "investment" },
  { id: "mindset",    label: { id: "Mindset",    en: "Mindset" },    icon: ic3,  q: "psychology" },
  { id: "history",    label: { id: "Sejarah",    en: "History" },    icon: ic4,  q: "history" },
  { id: "education",  label: { id: "Edukasi",    en: "Education" },  icon: ic5,  q: "education" },
  { id: "science",    label: { id: "Sains",      en: "Science" },    icon: ic6,  q: "science" },
  { id: "family",     label: { id: "Keluarga",   en: "Family" },     icon: ic7,  q: "family" },
  { id: "cooking",    label: { id: "Memasak",    en: "Cooking" },    icon: ic8,  q: "cooking" },
  { id: "novel",      label: { id: "Novel",      en: "Novel" },      icon: ic9,  q: "fiction" },
  { id: "comics",     label: { id: "Komik",      en: "Comics" },     icon: ic10, q: "comics" },
];

export default function CategoryShowcase({ lang = "id", onPick }) {
  const title = lang === "en" ? "Book Categories" : "Kategori Buku";

  return (
    <section className="mt-12">
      <div className="mx-auto w-full max-w-[1280px] text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">
          {title}
        </h2>
      </div>

      {/* Grid kategori */}
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Mobile */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4 md:gap-5 place-items-center">
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => onPick?.(c.q)}
              className="group flex flex-col items-center focus:outline-none transition duration-200 hover:scale-105"
              aria-label={c.label[lang] || c.label.id}
            >
              {/* Kotak ikon */}
              <div
                className="
                  mt-4 w-14 h-14 sm:w-16 sm:h-16
                  rounded-xl border border-neutral-900 bg-white
                  overflow-hidden flex items-center justify-center
                  shadow-sm transition duration-200
                  group-hover:-translate-y-0.5 group-hover:shadow-md
                "
              >
                <img
                  src={c.icon}
                  alt={c.label[lang] || c.label.id}
                  className="w-8 h-8 object-contain select-none"
                  draggable="false"
                  loading="lazy"
                />
              </div>

              <span
                className="
                  mt-3 text-sm sm:text-base font-semibold text-gray-900 text-center
                  transition duration-200 group-hover:text-black group-hover:scale-105
                "
              >
                {c.label[lang] || c.label.id}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
