import { useEffect, useMemo, useRef, useState, useCallback } from "react";

import banner1 from "/src/assets/banner1.webp";
import banner2 from "/src/assets/banner2.webp";
import banner3 from "/src/assets/banner3.webp";

const slides = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 },
  { id: 3, image: banner3 },
];

export default function BannerSlider({ interval = 4000 }) {
  const [idx, setIdx] = useState(1);
  const [current, setCurrent] = useState(1);
  const total = slides.length;

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const isResettingRef = useRef(false);
  const idxRef = useRef(idx);
  const isTransitioningRef = useRef(false);

  // swipe
  const startXRef = useRef(0);
  const dxRef = useRef(0);
  const draggingRef = useRef(false);

  useEffect(() => { idxRef.current = idx; }, [idx]);

  const extendedSlides = useMemo(
    () => [slides[total - 1], ...slides, slides[0]],
    [total]
  );

  const stopAuto = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    timerRef.current = setTimeout(function tick() {
      if (!isResettingRef.current && !isTransitioningRef.current && !draggingRef.current) {
        setIdx(i => i + 1);
      } else {
        startAuto();
      }
    }, interval);
  }, [interval, stopAuto]);

  useEffect(() => { startAuto(); return stopAuto; }, [startAuto, stopAuto]);

  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current || isResettingRef.current) return;
    setIdx(i => i - 1);
  }, []);

  const handleNext = useCallback(() => {
    if (isTransitioningRef.current || isResettingRef.current) return;
    setIdx(i => i + 1);
  }, []);

  useEffect(() => {
    if (idx === 0) setCurrent(total);
    else if (idx === total + 1) setCurrent(1);
    else setCurrent(idx);
  }, [idx, total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onStart = () => { isTransitioningRef.current = true; };

    const onEnd = () => {
      const currentIdx = idxRef.current;
      if (currentIdx === total + 1 || currentIdx === 0) {
        isResettingRef.current = true;
        track.style.transition = "none";
        const target = currentIdx === 0 ? total : 1;
        track.style.transform = `translate3d(-${target * 100}%,0,0)`;
        void track.offsetWidth;
        track.style.transition = "transform 500ms ease-in-out";
        setIdx(target);
        isResettingRef.current = false;
        isTransitioningRef.current = false;
        startAuto();
      } else {
        isTransitioningRef.current = false;
        startAuto();
      }
    };

    track.addEventListener("transitionstart", onStart);
    track.addEventListener("transitionend", onEnd);
    return () => {
      track.removeEventListener("transitionstart", onStart);
      track.removeEventListener("transitionend", onEnd);
    };
  }, [total, startAuto]);

  // touch
  const onTouchStart = (e) => {
    if (!trackRef.current) return;
    draggingRef.current = true;
    stopAuto();
    startXRef.current = e.touches[0].clientX;
    dxRef.current = 0;
    trackRef.current.style.transition = "none";
  };

  const onTouchMove = (e) => {
    if (!trackRef.current || !containerRef.current || !draggingRef.current) return;
    const dx = e.touches[0].clientX - startXRef.current;
    dxRef.current = dx;
    const w = containerRef.current.clientWidth;
    const dxPct = (dx / w) * 100;
    trackRef.current.style.transform =
      `translate3d(calc(-${idxRef.current * 100}% + ${dxPct}%),0,0)`;
    if (Math.abs(dx) > 6) e.preventDefault();
  };

  const onTouchEnd = () => {
    if (!trackRef.current || !containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const threshold = Math.max(40, w * 0.08);
    trackRef.current.style.transition = "transform 500ms ease-in-out";
    if (dxRef.current > threshold) setIdx(i => i - 1);
    else if (dxRef.current < -threshold) setIdx(i => i + 1);
    else trackRef.current.style.transform = `translate3d(-${idxRef.current * 100}%,0,0)`;
    draggingRef.current = false;
    dxRef.current = 0;
    startAuto();
  };

  return (
    <>
      {/* margin luar agar tepi lebih rapat, desktop tidak diubah */}
      <div className="mx-2 sm:mx-3 lg:mx-6">
        <div
          ref={containerRef}
          className="
            group relative overflow-hidden
            mx-auto w-full max-w-[1208px]
            rounded-[28px] ring-1 ring-black/5 shadow-sm
            aspect-[4/1] md:aspect-auto md:h-[302px]
          "
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* track */}
          <div
            ref={trackRef}
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translate3d(-${idx * 100}%,0,0)` }}
          >
            {extendedSlides.map((s, i) => (
              <div
                key={`${s.id}-${i}`}
                className="h-full flex-none basis-full min-w-full overflow-hidden rounded-inherit"
              >
                <img
                  src={s.image}
                  alt={`Slide ${s.id}`}
                  className="block w-full h-full object-cover object-center select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* tombol: tersembunyi di mobile */}
          <button
            onClick={handlePrev}
            aria-label="Sebelumnya"
            className="hidden sm:grid absolute top-1/2 -translate-y-1/2 left-4 group-hover:left-2
                       transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 place-items-center
                       w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg ring-1 ring-black/5"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Berikutnya"
            className="hidden sm:grid absolute top-1/2 -translate-y-1/2 right-4 group-hover:right-2
                       transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 place-items-center
                       w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg ring-1 ring-black/5"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isTransitioningRef.current || isResettingRef.current) return;
                  setIdx(i + 1);
                }}
                className={`rounded-full transition-opacity ${current === i + 1 ? "opacity-100" : "opacity-60"} h-2.5 w-2.5 bg-white`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
