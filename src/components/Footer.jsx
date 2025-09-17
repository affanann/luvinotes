import React from "react";
import { FaInstagram } from "react-icons/fa";

export default function Footer({ lang = "id", instagramUrl = "#" }) {
  const year = new Date().getFullYear();
  const L =
    lang === "en"
      ? { follow: "Follow us on" }
      : { follow: "Ikuti kami" };

  // footer
  return (
    <footer className="mt-12">
      {/* garis */}
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="h-px bg-gray-200" />
      </div>

      {/* isi */}
      <div className="mx-auto w-full max-w-[1280px] mt-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          © {year} Luvinotes. All Rights Reserved.
        </p>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{L.follow}</span>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:opacity-80 transition"
          >
            <FaInstagram className="text-gray-700 h-6 w-6 hover:text-pink-500" />
          </a>
        </div>
      </div>
    </footer>
  );
}
