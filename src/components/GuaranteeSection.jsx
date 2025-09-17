import React from "react";

export default function GuaranteeSection({ lang = "id" }) {
  const L =
    lang === "en"
      ? {
          titleTop: "MONEY BACK",
          titleNum: "100%",
          titleBottom: "GUARANTEE",
          headline1: "YES. THAT'S HOW",
          headline2: "MUCH WE BELIEVE",
          headline3: "IN OUR PRODUCT",
          body:
            "We stand behind our products and want you to be completely satisfied with your purchase. That's why we offer a 30-day money-back guarantee on all of our products.",
          foot: "No questions asked • Hassle-free • Secure payment",
        }
      : {
          titleTop: "GARANSI",
          titleNum: "100%",
          titleBottom: "UANG KEMBALI",
          headline1: "YA. SEBEGITU YAKIN",
          headline2: "KAMI PADA PRODUK",
          headline3: "LUVINOTES",
          body:
            "Kami berdiri di belakang produk kami dan ingin kamu benar-benar puas. Karena itu, kami memberikan garansi uang kembali 30 hari untuk semua produk.",
          foot: "Tanpa banyak tanya • Proses mudah • Pembayaran aman",
        };

  // section
  return (
    <section className="mt-12">
      <style>{`
        @keyframes sweep {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes pulseGlow {
          0%,100% { opacity: .45; filter: blur(22px); }
          50% { opacity: .85; filter: blur(30px); }
        }
      `}</style>

      {/* container */}
      <div className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-3xl bg-neutral-950 text-white relative">
        {/* watermark */}
        <div className="pointer-events-none absolute inset-0 select-none opacity-[0.08]">
          <div className="h-full w-full grid place-items-center">
            <span className="text-[18vw] leading-none font-extrabold tracking-[-0.04em]">
              LUVINOTES
            </span>
          </div>
        </div>

        {/* content */}
        <div className="relative z-10 px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16 flex flex-col items-center text-center">
          {/* shield */}
          <div className="relative">
            {/* glow */}
            <div
              className="absolute -inset-8 rounded-full"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 40%, rgba(255,223,70,.35), rgba(168,85,247,.28) 40%, transparent 70%)",
                animation: "pulseGlow 5s ease-in-out infinite",
              }}
            />
            {/* shield box */}
            <div className="relative h-48 w-40 sm:h-56 sm:w-48 md:h-64 md:w-56 rounded-md bg-black/80 ring-1 ring-white/10 shadow-2xl grid place-items-center">
              {/* sweep border */}
              <div
                className="pointer-events-none absolute -inset-[2px] rounded-md opacity-90"
                style={{
                  background:
                    "linear-gradient(90deg,#22c55e,#a78bfa,#facc15,#22c55e)",
                  backgroundSize: "200% 100%",
                  animation: "sweep 5s linear infinite",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  padding: "2px",
                  borderRadius: "10px",
                }}
              />
              <div className="px-4">
                <p className="text-xs sm:text-sm font-extrabold tracking-wider">
                  {L.titleTop}
                </p>
                <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none">
                  {L.titleNum}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-extrabold tracking-wider">
                  {L.titleBottom}
                </p>
              </div>
            </div>
          </div>

          {/* headline */}
          <div className="mt-8 sm:mt-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              {L.headline1}
            </h3>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"
              style={{
                background:
                  "linear-gradient(90deg,#ffffff,#a78bfa,#60a5fa,#22c55e,#ffffff)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 100%",
                animation: "sweep 8s linear infinite",
              }}
            >
              {L.headline2}
            </h3>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              {L.headline3}
            </h3>
          </div>

          {/* body */}
          <p className="mt-5 max-w-2xl text-sm sm:text-base text-white/80">
            {L.body}
          </p>

          <p className="mt-2 text-xs sm:text-sm text-white/50">{L.foot}</p>
        </div>
      </div>
    </section>
  );
}
