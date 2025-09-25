// src/components/LanguageCircle.jsx
import React, { useState, useEffect } from "react";
import usaFlag from "../assets/usa-flag.svg"; // pastikan path benar

function FlagCircle({ code = "id", size = 28 }) {
  const base = {
    width: size,
    height: size,
    borderRadius: "9999px",
    overflow: "hidden",
    border: "1px solid #000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  if (code === "id") {
    return (
      <span
        style={{
          ...base,
          backgroundImage:
            "linear-gradient(to bottom, #ef4444 50.1%, #ffffff 50.1%)",
        }}
        aria-label="Bahasa Indonesia"
      />
    );
  }
  return (
    <span style={base} aria-label="English">
      <img
        src={usaFlag}
        alt="US Flag"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "9999px",
        }}
      />
    </span>
  );
}

export default function LanguageCircle({ lang = "id", setLang }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <div className="relative z-[60]">
      {/* tombol */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center h-[28px] w-[28px] p-0 bg-transparent border-0 align-middle leading-none"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <FlagCircle code={lang} />
      </button>

      {/* dropdown */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 w-40 rounded-xl border bg-white p-1 shadow-lg transition duration-150 ease-out ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
      >
        <button
          onClick={() => {
            setLang("id");
            setOpen(false);
          }}
          className="flex items-center gap-2 w-full rounded-lg px-2 py-2 text-left hover:bg-gray-50"
          role="menuitem"
        >
          <FlagCircle code="id" size={20} />
          <span className="text-sm">Indonesia</span>
        </button>
        <button
          onClick={() => {
            setLang("en");
            setOpen(false);
          }}
          className="flex items-center gap-2 w-full rounded-lg px-2 py-2 text-left hover:bg-gray-50"
          role="menuitem"
        >
          <FlagCircle code="en" size={20} />
          <span className="text-sm">English</span>
        </button>
      </div>
    </div>
  );
}
