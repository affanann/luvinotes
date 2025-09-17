import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookGrid from "../components/BookGrid";

const API_BASE = "https://www.googleapis.com/books/v1";
const PAGE_SIZE = 20;

export default function SearchResults({ lang = "id" }) {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchBooks(keyword, p = 0) {
    const startIndex = p * PAGE_SIZE;
    try {
      setLoading(true);
      setError(null);
      const key = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
      const url = `${API_BASE}/volumes?q=${encodeURIComponent(
        keyword
      )}&maxResults=${PAGE_SIZE}&startIndex=${startIndex}${
        key ? `&key=${key}` : ""
      }`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setItems(json.items || []);
      setTotal(json.totalItems || 0);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(0);
    if (q) fetchBooks(q, 0);
  }, [q]);

  const totalPages = useMemo(() => Math.ceil(total / PAGE_SIZE), [total]);

  const L =
    lang === "en"
      ? {
          title: "Search Results",
          loading: "Loading…",
          found: (n) => `${n.toLocaleString()} books found`,
          prev: "Prev",
          next: "Next",
          page: "Page",
          failed: "Failed to load data.",
          empty: "No results. Try another keyword.",
        }
      : {
          title: "Hasil Pencarian",
          loading: "Memuat…",
          found: (n) => `Ditemukan ${n.toLocaleString()} buku`,
          prev: "Sebelumnya",
          next: "Berikutnya",
          page: "Hal",
          failed: "Gagal memuat data.",
          empty: "Tidak ada hasil. Coba kata kunci lain.",
        };

  // section
  return (
    <section className="min-h-[60vh]">
      {/* header */}
      <header className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {L.title}: <span className="text-gray-600">“{q}”</span>
        </h1>
      </header>

      {/* status */}
      {error && (
        <div className="mt-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {L.failed} {String(error?.message || error)}
        </div>
      )}
      <div className="mt-2 text-sm text-gray-600">
        {loading ? L.loading : total ? L.found(total) : L.empty}
      </div>

      {/* pagination top */}
      {totalPages > 1 && (
        <div className="mt-3 flex items-center gap-2">
          <button
            className="rounded-xl border px-3 py-1.5 disabled:opacity-40"
            disabled={page <= 0}
            onClick={() => {
              const p = Math.max(0, page - 1);
              setPage(p);
              fetchBooks(q, p);
            }}
          >
            {L.prev}
          </button>

          <span className="text-sm text-gray-600">
            {L.page} {page + 1} / {totalPages}
          </span>

          <button
            className="rounded-xl border px-3 py-1.5 disabled:opacity-40"
            disabled={page >= totalPages - 1}
            onClick={() => {
              const p = Math.min(totalPages - 1, page + 1);
              setPage(p);
              fetchBooks(q, p);
            }}
          >
            {L.next}
          </button>
        </div>
      )}

      {/* grid */}
      <BookGrid loading={loading} items={items} onSelect={() => {}} />

      {/* pagination bottom */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-2">
          <button
            className="rounded-xl border px-3 py-1.5 disabled:opacity-40"
            disabled={page <= 0}
            onClick={() => {
              const p = Math.max(0, page - 1);
              setPage(p);
              fetchBooks(q, p);
            }}
          >
            {L.prev}
          </button>

          <span className="text-sm text-gray-600">
            {L.page} {page + 1} / {totalPages}
          </span>

          <button
            className="rounded-xl border px-3 py-1.5 disabled:opacity-40"
            disabled={page >= totalPages - 1}
            onClick={() => {
              const p = Math.min(totalPages - 1, page + 1);
              setPage(p);
              fetchBooks(q, p);
            }}
          >
            {L.next}
          </button>
        </div>
      )}
    </section>
  );
}
