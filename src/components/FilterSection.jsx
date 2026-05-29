import React, { useState } from "react";
import { getData } from "../context/DataContext";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

// Merged category groups
const CATEGORY_GROUPS = [
  {
    label: "Electronics",
    subs: ["laptops", "smartphones", "tablets"],
  },
  {
    label: "Automobile",
    subs: ["motorcycle", "vehicle"],
  },
  {
    label: "Home",
    subs: ["home-decoration", "furniture"],
  },
  {
    label: "Fashion",
    subs: ["tops", "mens-shirts", "womens-dresses", "womens-bags", "womens-jewellery", "sunglasses"],
  },
  {
    label: "Shoes",
    subs: ["mens-shoes", "womens-shoes"],
  },
  {
    label: "Watches",
    subs: ["mens-watches", "womens-watches"],
  },
  {
    label: "Beauty & Care",
    subs: ["beauty", "fragrances", "skin-care"],
  },
];

// Standalone categories (no sub-groups)
const STANDALONE = ["groceries", "sports-accessories", "kitchen-accessories"];

const FilterSection = ({
  search, setSearch,
  brand, setBrand,
  priceRange, setPriceRange,
  category, setCategory,
  data,
}) => {
  const { brandOnlyData } = getData();
  const [openGroups, setOpenGroups] = useState({ Electronics: true });
  const [minPrice, setMinPrice] = useState(0);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const maxPrice = data ? Math.max(...data.map((p) => p.price)) : 1000;

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Find which group the current category belongs to
  const getActiveGroup = () => {
    for (const group of CATEGORY_GROUPS) {
      if (group.subs.includes(category)) return group.label;
    }
    return null;
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setPriceRange(maxPrice);
    setMinPrice(0);
    setBrand("all");
  };

  const visibleBrands = showAllBrands ? brandOnlyData : brandOnlyData?.slice(0, 6);

  const formatLabel = (slug) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl p-4 shrink-0 flex flex-col gap-5"
      style={{ width: "220px", position: "sticky", top: "88px", height: "fit-content", maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}
    >

      {/* ── CATEGORIES ── */}
      <div>
        <h2 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          Categories
        </h2>

        {/* All */}
        <button
          onClick={() => setCategory("all")}
          className="w-full text-left text-sm px-2 py-1.5 rounded-lg mb-1 transition-all duration-150 cursor-pointer"
          style={{
            background: category === "all" ? "#1a1a2e" : "transparent",
            color: category === "all" ? "#fff" : "#6B7280",
            fontWeight: category === "all" ? 500 : 400,
          }}
        >
          All
        </button>

        {/* Grouped categories with dropdown */}
        {CATEGORY_GROUPS.map((group) => {
          const isOpen = openGroups[group.label];
          const isGroupActive = group.subs.includes(category);

          return (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full text-left text-sm px-2 py-1.5 rounded-lg flex items-center justify-between transition-all duration-150 cursor-pointer hover:bg-gray-50"
                style={{
                  color: isGroupActive ? "#1a1a2e" : "#6B7280",
                  fontWeight: isGroupActive ? 600 : 400,
                }}
              >
                {group.label}
                {isOpen
                  ? <FiChevronDown className="text-xs" />
                  : <FiChevronRight className="text-xs" />
                }
              </button>

              {/* Subcategories dropdown */}
              {isOpen && (
                <div className="ml-3 flex flex-col gap-0.5 mb-1">
                  {group.subs.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setCategory(sub)}
                      className="text-left text-xs px-2 py-1 rounded-lg transition-all duration-150 cursor-pointer"
                      style={{
                        color: category === sub ? "#1a1a2e" : "#9CA3AF",
                        fontWeight: category === sub ? 600 : 400,
                        background: category === sub ? "#F3F4F6" : "transparent",
                      }}
                    >
                      · {formatLabel(sub)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Standalone categories */}
        {STANDALONE.map((slug) => (
          <button
            key={slug}
            onClick={() => setCategory(slug)}
            className="w-full text-left text-sm px-2 py-1.5 rounded-lg transition-all duration-150 cursor-pointer hover:bg-gray-50"
            style={{
              background: category === slug ? "#1a1a2e" : "transparent",
              color: category === slug ? "#fff" : "#6B7280",
              fontWeight: category === slug ? 500 : 400,
            }}
          >
            {formatLabel(slug)}
          </button>
        ))}
      </div>

      {/* ── PRICE RANGE ── */}
      <div>
        <h2 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          Price Range
        </h2>

        {/* Min / Max inputs */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-600 bg-gray-50">
            Min: ${minPrice}
          </div>
          <div className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-600 bg-gray-50">
            Max: ${priceRange}
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full cursor-pointer accent-[#1a1a2e]"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* ── BRANDS ── */}
      <div>
        <h2 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          Brands
        </h2>
        <div className="flex flex-col gap-2">
          {visibleBrands?.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={brand === item.brand}
                onChange={() => setBrand(brand === item.brand ? "all" : item.brand)}
                className="accent-[#1a1a2e] cursor-pointer"
              />
              {item.brand}
            </label>
          ))}
        </div>
        {brandOnlyData?.length > 6 && (
          <button
            onClick={() => setShowAllBrands((p) => !p)}
            className="text-xs text-[#1a1a2e] font-medium mt-2 cursor-pointer hover:underline"
          >
            {showAllBrands ? "Show less" : `+ ${brandOnlyData.length - 6} more`}
          </button>
        )}
      </div>

      {/* ── RESET ── */}
      <button
        onClick={handleReset}
        className="w-full text-sm font-medium text-white py-2 rounded-xl cursor-pointer transition-all duration-200 hover:opacity-90 border-none"
        style={{ background: "#1a1a2e" }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
