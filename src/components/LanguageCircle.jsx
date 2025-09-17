import React, { useState, useEffect } from "react";

function FlagCircle({ code = "id", size = 28 }) {
  const styleCommon = {
    width: size,
    height: size,
    borderRadius: "9999px",
    overflow: "hidden",
    border: "1px solid #000000",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (code === "id") {
    return (
      <span
        style={{
          ...styleCommon,
          backgroundImage: "linear-gradient(to bottom, #ef4444 50.1%, #ffffff 50.1%)",
        }}
        aria-label="Bahasa Indonesia"
      />
    );
  }

  return (
    <span style={styleCommon} aria-label="English">
      <img
        src="/src/assets/usa-flag.svg"
        alt="United States Flag"
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // section
  return (
    <div className="relative">
      {/* trigger */}
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <FlagCircle code={lang} />
      </div>

      {/* dropdown */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 mt-3 w-40 rounded-xl border bg-white p-1 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
        }`}
        style={{ transformOrigin: "top" }}
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
