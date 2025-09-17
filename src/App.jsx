import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RightDrawer from "./components/RightDrawer";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

export default function App() {
  const [lang, setLang] = useState("id");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-dvh bg-white text-black flex flex-col">
        <Navbar
          lang={lang}
          setLang={setLang}
          onMenu={() => setDrawerOpen(true)}
        />

        <main className="container mx-auto px-3 sm:px-4 py-4 flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/search" element={<SearchResults lang={lang} />} />
          </Routes>
        </main>

        <Footer lang={lang} instagramUrl="https://instagram.com/luvinotes" />

        <RightDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          lang={lang}
        />
      </div>
    </BrowserRouter>
  );
}
