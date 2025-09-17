import BookCard from './BookCard'


export default function BookGrid({ items = [], loading, onSelect }) {
    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-100 h-64 rounded-2xl" />
                ))}
            </div>
        )
    }


    if (!items.length) {
        return <p className="mt-6 text-gray-500">Tidak ada hasil. Coba kata kunci lain.</p>
    }


    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
            {items.map((it) => (
                <BookCard key={it.id} item={it} onClick={() => onSelect?.(it)} />
            ))}
        </div>
    )
}