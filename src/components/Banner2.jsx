import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BANNERS = [
  {
    label: "Big Savings",
    title: "On Motorcycle",
    subtitle: "Premium rides, unbeatable prices",
    bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
    accent: "#818cf8",
    glowColor: "rgba(129,140,248,0.3)",
    category: "motorcycle",
    emoji: "🏍️",
  },
  {
    label: "Hot Deals",
    title: "On Vehicle",
    subtitle: "Drive your dream today",
    bg: "linear-gradient(135deg, #052e16 0%, #14532d 60%, #052e16 100%)",
    accent: "#4ade80",
    glowColor: "rgba(74,222,128,0.3)",
    category: "vehicle",
    emoji: "🚗",
  },
];

const Banner2 = () => {
  const navigate = useNavigate();
  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    const fetchThumbnails = async () => {
      const results = {};
      await Promise.all(
        BANNERS.map(async (banner) => {
          try {
            const res = await axios.get(
              `https://dummyjson.com/products/category/${banner.category}?limit=1`
            );
            const product = res.data.products?.[0];
            if (product) results[banner.category] = product.thumbnail;
          } catch (err) {
            console.log(err);
          }
        })
      );
      setThumbnails(results);
    };
    fetchThumbnails();
  }, []);

  return (
    <section className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {BANNERS.map((banner, index) => (
          <div
            key={index}
onClick={() => navigate(`/category/${banner.category}`)}            className="relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
            style={{ background: banner.bg, minHeight: "200px" }}
          >
            {/* Glow blob */}
            <div
              className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: banner.glowColor }}
            />

            <div className="relative z-10 flex items-center justify-between h-full px-6 sm:px-8 lg:px-10 py-8 sm:py-10">
              {/* Left text */}
              <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                <span
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-widest"
                  style={{ color: banner.accent }}
                >
                  {banner.label}
                </span>
                <h3
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(20px, 2.8vw, 32px)" }}
                >
                  {banner.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">
                  {banner.subtitle}
                </p>
                <button
                  className="mt-2 sm:mt-3 flex items-center gap-1.5 text-xs sm:text-sm font-bold w-max px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border-none cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{ backgroundColor: banner.accent, color: "#0f172a" }}
                >
                  Shop Now →
                </button>
              </div>

              {/* Right image */}
              <div
                className="shrink-0 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ width: "clamp(90px, 18vw, 180px)", height: "clamp(90px, 18vw, 160px)" }}
              >
                {/* Image glow */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{ background: banner.glowColor }}
                />
                {thumbnails[banner.category] ? (
                  <img
                    src={thumbnails[banner.category]}
                    alt={banner.title}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-white/10 animate-pulse" />
                )}
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 opacity-40"
              style={{ background: `linear-gradient(90deg, transparent, ${banner.accent}, transparent)` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner2;
