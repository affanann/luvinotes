import { useEffect } from 'react'

export default function BookModal({ item, onClose }) {
    useEffect(() => {
        function onKey(e) { if (e.key === 'Escape') onClose?.() }
        if (item) window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [item, onClose])


    if (!item) return null
    const v = item.volumeInfo || {}


    return (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute inset-x-0 top-10 mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={(v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail || '').replace('http://', 'https://')}
                        alt="Sampul"
                        className="w-40 md:w-56 rounded-xl border object-cover"
                    />
                    <div className="flex-1 space-y-2">
                        <h2 className="text-2xl font-bold">{v.title}</h2>
                        {v.subtitle && <p className="text-gray-700">{v.subtitle}</p>}
                        <p className="text-sm text-gray-600">{v.authors?.join(', ')}</p>
                        <p className="text-sm text-gray-600">{v.publisher} • {v.publishedDate}</p>
                        <p className="text-sm text-gray-800 leading-relaxed max-h-48 overflow-auto pr-1">{v.description || 'Tidak ada deskripsi.'}</p>
                        <div className="text-xs text-gray-600">
                            {v.pageCount ? <span>{v.pageCount} halaman</span> : null}
                            {v.categories?.length ? <span> • {v.categories.join(', ')}</span> : null}
                            {v.language ? <span> • {v.language.toUpperCase()}</span> : null}
                        </div>
                        <div className="pt-2 flex gap-2">
                            {v.infoLink && <a href={v.infoLink} target="_blank" rel="noreferrer" className="btn border">Info</a>}
                            {v.previewLink && <a href={v.previewLink} target="_blank" rel="noreferrer" className="btn btn-primary">Preview</a>}
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button className="btn border" onClick={onClose}>Tutup</button>
                </div>
            </div>
        </div>
    )
}