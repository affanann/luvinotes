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

  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const isResettingRef = useRef(false);
  const idxRef = useRef(idx);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

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
      if (!isResettingRef.current && !isTransitioningRef.current) {
        setIdx((i) => i + 1);
      } else {
        startAuto();
      }
    }, interval);
  }, [interval, stopAuto]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current || isResettingRef.current) return;
    setIdx((i) => i - 1);
  }, []);

  const handleNext = useCallback(() => {
    if (isTransitioningRef.current || isResettingRef.current) return;
    setIdx((i) => i + 1);
  }, []);

  useEffect(() => {
    if (idx === 0) setCurrent(total);
    else if (idx === total + 1) setCurrent(1);
    else setCurrent(idx);
  }, [idx, total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onStart = () => {
      isTransitioningRef.current = true;
    };

    const onEnd = () => {
      const currentIdx = idxRef.current;
      if (currentIdx === total + 1 || currentIdx === 0) {
        isResettingRef.current = true;
        track.style.transition = "none";
        const target = currentIdx === 0 ? total : 1;
        track.style.transform = `translateX(-${target * 100}%)`;
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

  return (
    <>
      {/* banner */}
      <div
        className="group mt-4 relative overflow-hidden rounded-2xl mx-auto w-full max-w-[1280px]"
        style={{ height: 320 }}
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        {/* banner: track */}
        <div
          ref={trackRef}
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {extendedSlides.map((s, i) => (
            <div key={`${s.id}-${i}`} className="h-full flex-shrink-0 basis-full min-w-full">
              <img
                src={s.image}
                alt={`Slide ${s.id}`}
                className="w-full h-full object-contain select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* tombol navigasi */}
        {/* kiri */}
        <button
          onClick={handlePrev}
          aria-label="Sebelumnya"
          className="
            absolute top-1/2 -translate-y-1/2
            left-12 sm:left-16 group-hover:left-3 sm:group-hover:left-4
            transition-all duration-300 ease-out
            opacity-0 group-hover:opacity-100
            z-10 grid place-items-center
            w-11 h-11 sm:w-12 sm:h-12 rounded-full
            bg-white/30 backdrop-blur-md border border-white/40 shadow-lg ring-1 ring-black/5
            hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10
          "
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white-500" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* kanan */}
        <button
          onClick={handleNext}
          aria-label="Berikutnya"
          className="
            absolute top-1/2 -translate-y-1/2
            right-12 sm:right-16 group-hover:right-3 sm:group-hover:right-4
            transition-all duration-300 ease-out
            opacity-0 group-hover:opacity-100
            z-10 grid place-items-center
            w-11 h-11 sm:w-12 sm:h-12 rounded-full
            bg-white/30 backdrop-blur-md border border-white/40 shadow-lg ring-1 ring-black/5
            hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10
          "
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white-500" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isTransitioningRef.current || isResettingRef.current) return;
                setIdx(i + 1);
              }}
              className={`h-2 w-2 rounded-full ${current === i + 1 ? "bg-white" : "bg-white/50"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
