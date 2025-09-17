function coverThumb(volumeInfo) {
  return (
    volumeInfo?.imageLinks?.thumbnail?.replace("http://", "https://") ||
    volumeInfo?.imageLinks?.smallThumbnail?.replace("http://", "https://") ||
    ""
  );
}

export default function BookCard({ item, onClick }) {
  const v = item.volumeInfo || {};
  const authors = v.authors?.join(", ");
  const year = v.publishedDate?.slice(0, 4);
  const thumb = coverThumb(v);

  return (
    <button
      className="group text-left"
      onClick={onClick}
      aria-label={`Lihat detail ${v.title}`}
    >
      <div className="aspect-[2/3] w-full overflow-hidden rounded-2xl border bg-gray-50">
        {thumb ? (
          <img
            src={thumb}
            alt="Sampul buku"
            className="h-full w-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-gray-400">
            No Cover
          </div>
        )}
      </div>
      <div className="mt-2 space-y-1">
        <div className="line-clamp-2 font-semibold leading-snug">{v.title}</div>
        <div className="text-xs text-gray-600 line-clamp-1">
          {authors || "—"}
        </div>
        <div className="text-[11px] text-gray-500">{year || "—"}</div>
      </div>
    </button>
  );
}
