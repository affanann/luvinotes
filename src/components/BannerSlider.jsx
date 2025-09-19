import { useEffect, useMemo, useRef, useState, useCallback } from "react";

import banner1 from "/src/assets/banner1.webp";
import banner2 from "/src/assets/banner2.webp";
import banner3 from "/src/assets/banner3.webp";

const W = 1208; // fixed design width
const H = 302;  // fixed design height

const slides = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 },
  { id: 3, image: banner3 },
];

export default function BannerSlider({ interval = 4000 }) {
  const [idx, setIdx] = useState(1);
  const [current, setCurrent] = useState(1);
  const total = slides.length;

  const shellRef = useRef(null);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const idxRef = useRef(idx);
  const isResettingRef = useRef(false);
  const isTransitioningRef = useRef(false);

  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      setScale(Math.min(1, w / W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
      if (!isResettingRef.current && !isTransitioningRef.current) setIdx(i => i + 1);
      else startAuto();
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
      const i = idxRef.current;
      if (i === total + 1 || i === 0) {
        isResettingRef.current = true;
        track.style.transition = "none";
        const target = i === 0 ? total : 1;
        track.style.transform = `translate3d(-${target * 100}%,0,0)`;
        void track.offsetWidth;
        track.style.transition = "transform 450ms cubic-bezier(0.22,0.61,0.36,1)";
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

  // touch swipe
  const startXRef = useRef(0);
  const dxRef = useRef(0);
  const draggingRef = useRef(false);

  const onTouchStart = (e) => {
    if (!trackRef.current) return;
    draggingRef.current = true;
    stopAuto();
    startXRef.current = e.touches[0].clientX;
    dxRef.current = 0;
    trackRef.current.style.transition = "none";
  };
  const onTouchMove = (e) => {
    if (!draggingRef.current || !trackRef.current) return;
    const dx = e.touches[0].clientX - startXRef.current;
    dxRef.current = dx;
    const dxPct = (dx / (W * scale)) * 100;
    trackRef.current.style.transform =
      `translate3d(calc(-${idxRef.current * 100}% + ${dxPct}%),0,0)`;
    if (Math.abs(dx) > 6) e.preventDefault();
  };
  const onTouchEnd = () => {
    if (!trackRef.current) return;
    const threshold = Math.max(40 * scale, W * scale * 0.08);
    trackRef.current.style.transition = "transform 450ms cubic-bezier(0.22,0.61,0.36,1)";
    if (dxRef.current > threshold) setIdx(i => i - 1);
    else if (dxRef.current < -threshold) setIdx(i => i + 1);
    else trackRef.current.style.transform = `translate3d(-${idxRef.current * 100}%,0,0)`;
    draggingRef.current = false;
    dxRef.current = 0;
    startAuto();
  };

  const scaledH = Math.round(H * scale);

  return (
    <div className="mx-2 sm:mx-3 lg:mx-6">
      {/* shell: lebar responsif, tinggi mengikuti scale */}
      <div
        ref={shellRef}
        className="mx-auto w-full max-w-[1208px] relative"
        style={{ height: scaledH }}
      >
        {/* canvas: tetap 1208x302, di-scale dan DI-TENGAHKAN */}
        <div
          className="relative overflow-hidden rounded-[28px] ring-1 ring-black/5 shadow-sm select-none group"
          style={{
            width: W,
            height: H,
            position: "absolute",
            left: "50%",
            top: 0,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
          }}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* track */}
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{
              transform: `translate3d(-${idx * 100}%,0,0)`,
              transition: "transform 450ms cubic-bezier(0.22,0.61,0.36,1)",
            }}
          >
            {extendedSlides.map((s, i) => (
              <div
                key={`${s.id}-${i}`}
                className="h-full flex-none basis-full min-w-full overflow-hidden rounded-inherit"
              >
                <img
                  src={s.image}
                  alt={`Slide ${s.id}`}
                  className="block w-full h-full object-cover object-center"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* panah: desktop saja */}
          <button
            onClick={handlePrev}
            aria-label="Sebelumnya"
            className="hidden sm:grid absolute top-1/2 -translate-y-1/2 left-12 sm:left-16 group-hover:left-3 sm:group-hover:left-4
                       transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 z-10 place-items-center
                       w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg ring-1 ring-black/5"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Berikutnya"
            className="hidden sm:grid absolute top-1/2 -translate-y-1/2 right-12 sm:right-16 group-hover:right-3 sm:group-hover:right-4
                       transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 z-10 place-items-center
                       w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg ring-1 ring-black/5"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* dots: desktop saja */}
          <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2">
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
      </div>
    </div>
  );
}
