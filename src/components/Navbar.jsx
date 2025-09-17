import SearchExperience from "./SearchExperience";
import LanguageCircle from "./LanguageCircle";
import logoWordmark from "../assets/luvinotes.png";

export default function Navbar({ lang, setLang, onMenu }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/60 backdrop-blur-xl">
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="grid grid-cols-12 items-center gap-3">
          {/* logo */}
          <div className="col-span-5 sm:col-span-3 flex items-center">
            <a href="/" className="flex items-center">
              <img src={logoWordmark} alt="Luvinotes" className="h-10 w-auto select-none" />
            </a>
          </div>

          {/* search */}
          <div className="col-span-8 sm:col-span-6 flex justify-center">
            <div className="w-full max-w-2xl">
              <SearchExperience lang={lang} />
            </div>
          </div>

          {/* actions */}
          <div className="col-span-2 sm:col-span-3 flex items-center justify-end gap-3">
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
    </header>
  );
}
