// src/components/LanguageCircle.jsx
import React, { useEffect, useRef, useState } from "react";

function FlagCircle({ code = "id", size = 28 }) {
  const base = {
    width: size,
    height: size,
    borderRadius: "9999px",
    overflow: "hidden",
    border: "1px solid #000000",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  if (code === "id") {
    return (
      <span
        style={{
          ...base,
          backgroundImage: "linear-gradient(to bottom, #ef4444 50.1%, #ffffff 50.1%)",
        }}
        aria-label="Bahasa Indonesia"
      />
    );
  }
  return (
    <span style={base} aria-label="English">
      <img
        src="/src/assets/usa-flag.svg"
        alt="United States Flag"
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "9999px" }}
      />
    </span>
  );
}

export default function LanguageCircle({ lang = "id", setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 56, left: 16 });
  const btnRef = useRef(null);

  // tutup saat scroll
  useEffect(() => {
    const onScroll = () => isOpen && setIsOpen(false);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  // hitung posisi menu
  const openMenu = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) {
      setPos({
        top: r.bottom + 8 + window.scrollY,
        left: r.left + window.scrollX - 100, // kira-kira mengarah ke kiri tombol
      });
    }
    setIsOpen((v) => !v);
  };

  return (
    <div className="relative">
      {/* trigger */}
      <div ref={btnRef} className="cursor-pointer" onClick={openMenu}>
        <FlagCircle code={lang} />
      </div>

      {/* menu fixed z-50 selalu di depan */}
      <div
        className={`fixed z-50 rounded-xl border bg-white p-1 shadow-lg transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: pos.top, left: pos.left, transformOrigin: "top" }}
      >
        <button
          onClick={() => {
            setLang("id");
            setIsOpen(false);
          }}
          className="flex items-center gap-2 w-full rounded-lg px-2 py-2 text-left hover:bg-gray-50"
        >
          <FlagCircle code="id" size={20} />
          <span className="text-sm">Indonesia</span>
        </button>
        <button
          onClick={() => {
            setLang("en");
            setIsOpen(false);
          }}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-gray-50"
        >
          <FlagCircle code="en" size={20} />
          <span className="text-sm">English</span>
        </button>
      </div>
    </div>
  );
}
