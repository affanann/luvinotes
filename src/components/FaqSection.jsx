import React, { useState } from "react";

const DEFAULTS = {
  id: {
    title: "FAQ",
    subtitle: "Pertanyaan yang Sering Diajukan",
    items: [
      { q: "Apa itu Luvinotes?", a: "Luvinotes adalah situs pencarian dan kurasi buku berbasis Google Books API dengan desain minimalis. Kamu bisa mencari, menjelajah kategori, dan melihat detail buku." },
      { q: "Bagaimana cara mencari buku?", a: "Ketik judul/penulis/kata kunci pada kotak pencarian di navbar, lalu tekan Enter atau tombol Cari. Kamu juga bisa memilih kategori yang tersedia." },
      { q: "Apakah Luvinotes berbayar?", a: "Fitur pencarian dan penjelajahan gratis. Jika ada item berbayar, harganya akan ditampilkan jelas pada kartu produk atau bagian promosi khusus." },
      { q: "Apakah datanya akurat?", a: "Data bersumber dari Google Books. Terkadang metadata berbeda-beda tergantung penerbit; kami menampilkan yang paling relevan dari API." },
      { q: "Bagaimana menghubungi dukungan?", a: "Kamu bisa kirim pesan melalui form kontak (coming soon) atau lewat email support resmi yang akan kami sediakan di footer." },
    ],
  },
  en: {
    title: "FAQ",
    subtitle: "Frequently Asked Questions",
    items: [
      { q: "What is Luvinotes?", a: "Luvinotes is a minimalist book search & curation site powered by the Google Books API. You can search, browse categories, and view book details." },
      { q: "How do I find books?", a: "Type a title/author/keyword in the navbar search box, then press Enter or click Search. You can also pick from the available categories." },
      { q: "Is Luvinotes paid?", a: "Search and browsing are free. If there are paid items, prices will be clearly shown on product cards or promo sections." },
      { q: "Is the data accurate?", a: "Data comes from Google Books. Metadata can vary by publisher; we show the most relevant information from the API." },
      { q: "How can I contact support?", a: "Send us a message via the contact form (coming soon) or the official support email that will be available in the footer." },
    ],
  },
};

export default function FaqSection({ lang = "id" }) {
  const content = DEFAULTS[lang] ?? DEFAULTS.id;
  const [openSet, setOpenSet] = useState(() => new Set()); // indeks terbuka

  const toggle = (i) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section className="mt-12">
      <div className="mx-auto w-full max-w-[1280px] mt-3">
        <div className="h-px bg-gray-200" />
      </div>

      <div className="mx-auto w-full max-w-[1280px] text-center mt-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{content.title}</h2>
      </div>

      <div className="mx-auto w-full max-w-[1280px] text-center mt-3">
        <p className="text-sm text-gray-500">{content.subtitle}</p>
      </div>

      <div className="mx-auto w-full max-w-[1280px] mt-6">
        <ul className="space-y-3">
          {content.items.map((it, i) => {
            const isOpen = openSet.has(i);
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 sm:px-5 py-4 transition-colors flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-900">{it.q}</span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}
                >
                  <div className="px-4 sm:px-5 pt-3 pb-5 bg-white border-x border-b border-gray-200 rounded-b-xl text-gray-700">
                    <p className="leading-relaxed">{it.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
