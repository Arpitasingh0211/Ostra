import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BANNERS = [
  {
    label: "Up to 40% Off",
    title: "On Laptops &\nComputers",
    bg: "linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)",
    accent: "#c4b5fd",
    category: "laptops",
  },

  {
    label: "Best Deals",
    title: "On Smartphones",
    bg: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
    accent: "#86efac",
    category: "smartphones",
  },

  {
    label: "Top Deals",
    title: "Premium\nWatches",
    bg: "linear-gradient(135deg, #9a3412 0%, #c2410c 100%)",
    accent: "#fcd34d",
    category: "mens-watches",
  },
];

const MidBanner = () => {
  const navigate = useNavigate();

  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    const fetchThumbnails = async () => {
      const results = {};

      await Promise.all(
        BANNERS.map(async (banner) => {
          try {
            const res = await axios.get(
              `https://dummyjson.com/products/category/${banner.category}?limit=1`,
            );

            const product = res.data.products?.[0];

            if (product) {
              results[banner.category] = product.thumbnail;
            }
          } catch (err) {
            console.log(err);
          }
        }),
      );

      setThumbnails(results);
    };

    fetchThumbnails();
  }, []);

  return (
    <section className="w-full px-3 sm:px-5 lg:px-4 py-4 sm:py-5">
      {/* Grid */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
        "
      >
        {BANNERS.map((banner, index) => (
          <div
            key={index}
            onClick={() => navigate(`/catagory/${banner.category}`)}
            className="
              relative
              rounded-[28px]
              overflow-hidden
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              px-4
              sm:px-5
              py-3
              cursor-pointer
              group
              transition-all
              duration-300
              hover:scale-[1.01]
              hover:shadow-2xl
              min-h-[180px]
              sm:min-h-[220px]
            "
            style={{
              background: banner.bg,
            }}
          >
            {/* LEFT */}
            <div className="flex flex-col gap-2 z-10 text-center sm:text-left items-center sm:items-start">
              <span
                className="
                  text-xs
                  sm:text-sm
                  lg:text-base
                  font-bold
                  uppercase
                  tracking-[3px]
                  mt-4
                "
                style={{
                  color: banner.accent,
                }}
              >
                {banner.label}
              </span>

              <h3
                className="
                  text-xl
                  sm:text-4xl
                  font-bold
                  text-white
                  leading-tight
                  whitespace-pre-line
                "
              >
                {banner.title}
              </h3>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className="
                relative
                shrink-0
                flex
                items-center
                justify-center
                mt-1
                sm:mt-0
                w-full
                sm:w-[220px]
                h-[180px]
                sm:h-[220px]
              "
            >
              <div
                className="
                  absolute
                  rounded-full
                  blur-[70px]
                  z-0
                "
                style={{
                  width: "180px",
                  height: "180px",
                  background: banner.accent,
                  opacity: 0.45,
                }}
              />
              {thumbnails[banner.category] ? (
                <img
                  src={thumbnails[banner.category]}
                  alt={banner.title}
                  className="
                    relative
                    z-10
                    w-[170px]
                    sm:w-[210px]
                    lg:w-[240px]
                    h-auto
                    object-contain
                    drop-shadow-2xl
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-white/10 animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MidBanner;
