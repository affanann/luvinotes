import SearchExperience from "./SearchExperience";
import LanguageCircle from "./LanguageCircle";
import logoWordmark from "../assets/luvinotes.png";

export default function Navbar({ lang, setLang, onMenu }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/70 backdrop-blur">
      <div className="mx-auto w-full max-w-[1280px] px-3 sm:px-4">
        {/* top bar: logo + actions */}
        <div className="flex items-center justify-between py-2">
          <a href="/" className="flex items-center">
            <img
              src={logoWordmark}
              alt="Luvinotes"
              className="h-9 w-auto sm:h-10 select-none"
            />
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageCircle lang={lang} setLang={setLang} />
            <button
              aria-label="menu"
              onClick={onMenu}
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-white/50"
            >
              <div className="space-y-1.5">
                <div className="h-0.5 w-5 bg-black" />
                <div className="h-0.5 w-5 bg-black" />
                <div className="h-0.5 w-5 bg-black" />
              </div>
            </button>
          </div>
        </div>

        {/* search: mobile (baris kedua) */}
        <div className="pb-2 sm:hidden">
          <SearchExperience lang={lang} />
        </div>

        {/* search: desktop (di tengah) */}
        <div className="hidden sm:flex justify-center py-2">
          <div className="w-full max-w-2xl">
            <SearchExperience lang={lang} />
          </div>
        </div>
      </div>
    </header>
  );
}
