// src/components/Navbar.jsx
import { useEffect, useRef } from "react";
import SearchExperience from "./SearchExperience";
import LanguageCircle from "./LanguageCircle";
import logoWordmark from "../assets/luvinotes.png";

export default function Navbar({ lang, setLang, onMenu }) {
  const headerRef = useRef(null);
  const spacerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current || !spacerRef.current) return;

    const apply = () => {
      const h = headerRef.current.offsetHeight || 0;
      spacerRef.current.style.height = `${h}px`;
    };

    apply();
    const id = requestAnimationFrame(apply);

    const ro = new ResizeObserver(apply);
    ro.observe(headerRef.current);

    const onResize = () => apply();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* navbar */}
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl"
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {/* mobile */}
          <div className="sm:hidden">
            {/* row */}
            <div className="flex items-center justify-between py-2">
              <a href="/" className="flex items-center">
                <img src={logoWordmark} alt="Luvinotes" className="h-9 w-auto select-none" />
              </a>
              <div className="flex items-center gap-2">
                <LanguageCircle lang={lang} setLang={setLang} />
                <button
                  aria-label="menu"
                  onClick={onMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/40"
                >
                  <div className="space-y-1.5">
                    <div className="h-0.5 w-5 bg-black" />
                    <div className="h-0.5 w-5 bg-black" />
                    <div className="h-0.5 w-5 bg-black" />
                  </div>
                </button>
              </div>
            </div>
            {/* search */}
            <div className="pb-2">
              <SearchExperience lang={lang} />
            </div>
          </div>

          {/* desktop */}
          <div className="hidden sm:block">
            <div className="py-3 grid grid-cols-12 items-center gap-3">
              {/* logo */}
              <div className="col-span-3 flex items-center">
                <a href="/" className="flex items-center">
                  <img src={logoWordmark} alt="Luvinotes" className="h-10 w-auto select-none" />
                </a>
              </div>
              {/* search */}
              <div className="col-span-6 flex justify-center">
                <div className="w-full max-w-2xl">
                  <SearchExperience lang={lang} />
                </div>
              </div>
              {/* actions */}
              <div className="col-span-3 flex items-center justify-end gap-3">
                <LanguageCircle lang={lang} setLang={setLang} />
                <button
                  aria-label="menu"
                  onClick={onMenu}
                  className="inline-flex items-center justify-center size-10 rounded-xl hover:bg-white/40"
                >
                  <div className="space-y-1.5">
                    <div className="h-0.5 w-5 bg-black" />
                    <div className="h-0.5 w-5 bg-black" />
                    <div className="h-0.5 w-5 bg-black" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* spacer */}
      <div ref={spacerRef} aria-hidden="true" />
    </>
  );
}
