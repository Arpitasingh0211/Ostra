import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TOP_CATEGORIES = [
  { category: "laptops",     label: "Laptops"     },
  { category: "smartphones", label: "Smartphones" },
  { category: "fragrances",  label: "Fragrances"  },
  { category: "furniture",   label: "Furniture"   },
  { category: "beauty",      label: "Beauty"      },
];

const TopCategories = () => {
  const navigate = useNavigate();
  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    const fetchThumbnails = async () => {
      const results = {};
      await Promise.all(
        TOP_CATEGORIES.map(async (item) => {
          try {
            const res = await axios.get(
              `https://dummyjson.com/products/category/${item.category}?limit=1`
            );
            const product = res.data.products?.[0];
            if (product) results[item.category] = product.thumbnail;
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
    <section className="w-full px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 bg-white">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Top Categories</h2>

      {/*
        Mobile  : 2 cols
        Tablet  : 4 cols  ← key fix
        Desktop : 5 cols
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {TOP_CATEGORIES.map((item, index) => (
          <div
            key={index}
onClick={() => navigate(`/category/${item.category}`)}            className="cursor-pointer group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            {/* Image */}
            <div className="w-full h-32 sm:h-40 lg:h-44 bg-gray-50 overflow-hidden">
              {thumbnails[item.category] ? (
                <img
                  src={thumbnails[item.category]}
                  alt={item.label}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 animate-pulse" />
              )}
            </div>

            {/* Label */}
            <div className="px-3 py-2 sm:py-3 bg-white">
              <p className="text-xs sm:text-sm font-semibold text-gray-800 text-center group-hover:text-[#1a1a2e] transition-colors">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
