import BannerSlider from "../components/BannerSlider";
import CategoryShowcase from "../components/CategoryShowcase";
import BestsellerSection from "../components/BestsellerSection";
import BundleSection from "../components/BundleSection";
import GuaranteeSection from "../components/GuaranteeSection";
import FaqSection from "../components/FaqSection";

export default function Home({ lang = "id" }) {
  return (
    <>
      {/* banner */}
      <BannerSlider />

      {/* kategori */}
      <CategoryShowcase
        lang={lang}
        onPick={(q) => (window.location.href = `/search?q=${encodeURIComponent(q)}`)}
      />

      {/* bestseller */}
      <BestsellerSection lang={lang} onAdd={(b) => alert(b.title?.id || b.title)} />

      {/* bundle */}
      <section id="bundle" className="scroll-mt-24">
        <BundleSection
          lang={lang}
          onAdd={(p) => alert((p.title?.id || p.title) + " ditambahkan")}
        />
      </section>

      {/* garansi */}
      <GuaranteeSection lang={lang} />

      {/* faq */}
      <FaqSection lang={lang} />
    </>
  );
}
