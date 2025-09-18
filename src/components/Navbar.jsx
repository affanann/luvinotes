import SearchExperience from "./SearchExperience";
import LanguageCircle from "./LanguageCircle";
import logoWordmark from "../assets/luvinotes.png";

export default function Navbar({ lang, setLang, onMenu }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/60 backdrop-blur-xl">
      <div className="container mx-auto px-3 sm:px-4">
        {/* MOBILE: dua baris */}
        <div className="sm:hidden">
          {/* baris 1: logo + actions */}
          <div className="flex items-center justify-between py-2">
            <a href="/" className="flex items-center">
              <img src={logoWordmark} alt="Luvinotes" className="h-9 w-auto select-none" />
            </a>
            <div className="flex items-center gap-2">
              <LanguageCircle lang={lang} setLang={setLang} />
              <button
                aria-label="menu"
                onClick={onMenu}
                className="inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-white/40"
              >
                <div className="space-y-1.5">
                  <div className="h-0.5 w-5 bg-black" />
                  <div className="h-0.5 w-5 bg-black" />
                  <div className="h-0.5 w-5 bg-black" />
                </div>
              </button>
            </div>
          </div>
          {/* baris 2: search full width */}
          <div className="pb-2">
            <SearchExperience lang={lang} />
          </div>
        </div>

        {/* DESKTOP: sama seperti sebelumnya */}
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
