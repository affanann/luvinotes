// src/components/Navbar.jsx
import SearchExperience from "./SearchExperience";
import LanguageCircle from "./LanguageCircle";
import logoWordmark from "../assets/luvinotes.png";

export default function Navbar({ lang, setLang, onMenu }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* mobile */}
        <div className="sm:hidden">
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
          <div className="pb-2">
            <SearchExperience lang={lang} />
          </div>
        </div>

        {/* desktop */}
        <div className="hidden sm:block">
          <div className="py-3 grid grid-cols-12 items-center gap-3">
            <div className="col-span-3 flex items-center">
              <a href="/" className="flex items-center">
                <img src={logoWordmark} alt="Luvinotes" className="h-10 w-auto select-none" />
              </a>
            </div>

            <div className="col-span-6 flex justify-center">
              <div className="w-full max-w-2xl">
                <SearchExperience lang={lang} />
              </div>
            </div>

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
  );
}
