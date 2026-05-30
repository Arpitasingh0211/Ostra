import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AirPodsImg from "../assets/AirPodsthumbnail.png";
import WatchImg from "../assets/Smartwatchthumbnail.png";
import HeadphoneImg from "../assets/Headphonethumbnail.png";

// 4 slides so tablet shows all 4
const PRODUCT_SEARCHES = [
  {
    query: "AirPods Max",
    accent: "#C0C0C0",
    glow: "rgba(192,192,192,0.55)",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #2d2d2d 50%, #1a1a2e 100%)",
    image: AirPodsImg,
    label: "New Arrival",
    heading: "AirPods Max\nSilver Edition",
    discount: "UP TO 20% OFF",
    description: "Over-ear noise cancelling. Premium sound. Iconic Apple design.",
    id: 101,
  },
  {
    query: "Apple Watch Series 4",
    accent: "#FFD700",
    glow: "rgba(255,215,0,0.55)",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #2a2000 50%, #1a1a2e 100%)",
    image: WatchImg,
    label: "Best Seller",
    heading: "Apple Watch\nSeries 4 Gold",
    discount: "UP TO 25% OFF",
    description: "Stunning gold case. Health tracking. Always-on display.",
    id: 106,
  },
  {
    query: "Apple AirPods",
    accent: "#E8E8E8",
    glow: "rgba(232,232,232,0.55)",
    bg: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)",
    image: HeadphoneImg,
    label: "Hot Deal",
    heading: "Apple AirPods\nTrue Wireless",
    discount: "UP TO 15% OFF",
    description: "Seamless pairing. Crystal clear audio. All-day comfort.",
    id: 100,
  },
  // {
  //   query: "Smartwatch",
  //   accent: "#a78bfa",
  //   glow: "rgba(167,139,250,0.55)",
  //   bg: "linear-gradient(135deg, #1a1a2e 0%, #2d1a4e 50%, #1a1a2e 100%)",
  //   image: WatchImg,
  //   label: "Trending",
  //   heading: "Smartwatches\nRedefined",
  //   discount: "UP TO 30% OFF",
  //   description: "Track your health, stay connected, look stunning.",
  //   id: 106,
  // },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const slides = PRODUCT_SEARCHES;

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <div className="w-full px-3 sm:px-4 lg:px-6 pt-2 pb-4 sm:pb-6 mt-28 md:mt-32 lg:mt-16">
      <div
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{ background: slide.bg, minHeight: "260px", transition: "background 0.5s ease" }}
      >
        <div
          className="flex items-center justify-between h-full"
          style={{
            padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 56px)",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* LEFT */}
          <div className="flex flex-col gap-2 sm:gap-3 z-10" style={{ maxWidth: "480px" }}>
            <span
              className="text-[10px] sm:text-xs font-bold tracking-widest uppercase"
              style={{ color: slide.accent }}
            >
              {slide.label}
            </span>
            <h1
              className="font-extrabold text-white leading-tight whitespace-pre-line"
              style={{ fontSize: "clamp(22px, 3.5vw, 52px)" }}
            >
              {slide.heading}
            </h1>
            <p
              className="font-bold"
              style={{ color: slide.accent, fontSize: "clamp(14px, 2vw, 28px)" }}
            >
              {slide.discount}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">{slide.description}</p>

            {/* Shop Now BELOW title/discount */}
            <button
              onClick={() => navigate(`/products/${slide.id}`)}
              className="px-5 sm:px-7 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-none w-max mt-1"
              style={{ backgroundColor: slide.accent, color: "#1a1a2e" }}
            >
              Shop Now →
            </button>
          </div>

          {/* RIGHT — image with strong glow */}
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{ width: "clamp(120px, 25vw, 320px)", height: "clamp(120px, 25vw, 300px)" }}
          >
            {/* Strong visible glow circle */}
            <div
              className="absolute"
              style={{
                width: "85%",
                height: "85%",
                borderRadius: "50%",
                background: slide.glow,
                filter: "blur(40px)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Outer softer ring */}
            <div
              className="absolute"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: slide.glow.replace("0.55", "0.2"),
                filter: "blur(70px)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <img
              src={slide.image}
              alt={slide.heading}
              className="relative z-10 object-contain"
              style={{
                width: "90%",
                height: "90%",
                filter: `drop-shadow(0 0 20px ${slide.glow})`,
              }}
            />
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full cursor-pointer border-none transition-all duration-300"
              style={{
                width: i === current ? "22px" : "8px",
                height: "8px",
                background: i === current ? slide.accent : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
