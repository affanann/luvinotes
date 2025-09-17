export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-2">
      {/* tombol prev */}
      <button
        className="btn border disabled:opacity-40"
        onClick={onPrev}
        disabled={page <= 0}
      >
        Sebelumnya
      </button>

      {/* info halaman */}
      <span className="text-sm text-gray-600">
        Hal {page + 1} / {totalPages}
      </span>

      {/* tombol next */}
      <button
        className="btn border disabled:opacity-40"
        onClick={onNext}
        disabled={page >= totalPages - 1}
      >
        Berikutnya
      </button>
    </div>
  );
}
