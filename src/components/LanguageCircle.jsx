import React, { useState, useEffect } from "react";
import usaFlag from "../assets/usa-flag.svg"; // FIX path

function FlagCircle({ code = "id", size = 28 }) {
  const style = {
    width: size,
    height: size,
    borderRadius: "9999px",
    overflow: "hidden",
    border: "1px solid #000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  if (code === "id") {
    return (
      <span
        style={{
          ...style,
          backgroundImage:
            "linear-gradient(to bottom, #ef4444 50.1%, #ffffff 50.1%)",
        }}
      />
    );
  }
  return (
    <span style={style}>
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
      <div className="cursor-pointer" onClick={() => setOpen(!open)}>
        <FlagCircle code={lang} />
      </div>

      <div
        className={`
          absolute right-0 mt-3 w-40 rounded-xl border bg-white p-1 shadow-lg
          transition-transform transition-opacity duration-150 ease-out
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <button
          onClick={() => {
            setLang("id");
            setOpen(false);
          }}
          className="flex items-center gap-2 w-full rounded-lg px-2 py-2 text-left hover:bg-gray-50"
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
        >
          <FlagCircle code="en" size={20} />
          <span className="text-sm">English</span>
        </button>
      </div>
    </div>
  );
}
