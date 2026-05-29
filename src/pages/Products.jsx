import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const BANNER_META = {
  laptops: { label: "Special Discount", title: "Laptops & Computers", disc: "40% OFF", accent: "#c4b5fd", bg: "linear-gradient(120deg,#3730a3,#4f46e5)" },
  smartphones: { label: "Best Deals", title: "Smartphones", disc: "35% OFF", accent: "#86efac", bg: "linear-gradient(120deg,#065f46,#059669)" },
  tablets: { label: "New Arrivals", title: "Tablets", disc: "25% OFF", accent: "#93c5fd", bg: "linear-gradient(120deg,#1e3a5f,#1d4ed8)" },
  motorcycle: { label: "Big Savings", title: "Motorcycles", disc: "30% OFF", accent: "#818cf8", bg: "linear-gradient(120deg,#0f172a,#1e293b)" },
  vehicle: { label: "Hot Deals", title: "Vehicles", disc: "20% OFF", accent: "#4ade80", bg: "linear-gradient(120deg,#064e3b,#14532d)" },
  "home-decoration": { label: "Top Picks", title: "Home Decoration", disc: "30% OFF", accent: "#fcd34d", bg: "linear-gradient(120deg,#7c2d12,#c2410c)" },
  furniture: { label: "Sale", title: "Furniture", disc: "35% OFF", accent: "#fde68a", bg: "linear-gradient(120deg,#713f12,#b45309)" },
  beauty: { label: "Trending", title: "Beauty", disc: "20% OFF", accent: "#f9a8d4", bg: "linear-gradient(120deg,#831843,#be185d)" },
  fragrances: { label: "Premium", title: "Fragrances", disc: "25% OFF", accent: "#ddd6fe", bg: "linear-gradient(120deg,#4a1d96,#7c3aed)" },
  "skin-care": { label: "Self Care", title: "Skincare", disc: "30% OFF", accent: "#a7f3d0", bg: "linear-gradient(120deg,#065f46,#047857)" },
  groceries: { label: "Fresh Deals", title: "Groceries", disc: "15% OFF", accent: "#86efac", bg: "linear-gradient(120deg,#14532d,#15803d)" },
  "sports-accessories": { label: "Active Life", title: "Sports & Fitness", disc: "20% OFF", accent: "#93c5fd", bg: "linear-gradient(120deg,#1e3a5f,#1d4ed8)" },
  "kitchen-accessories": { label: "Chef's Pick", title: "Kitchen Essentials", disc: "25% OFF", accent: "#fcd34d", bg: "linear-gradient(120deg,#451a03,#92400e)" },
  "mens-watches": { label: "Premium", title: "Men's Watches", disc: "30% OFF", accent: "#d6d3d1", bg: "linear-gradient(120deg,#1c1917,#44403c)" },
  "womens-watches": { label: "Elegant", title: "Women's Watches", disc: "25% OFF", accent: "#fbcfe8", bg: "linear-gradient(120deg,#831843,#be185d)" },
  tops: { label: "Style Up", title: "Tops & Tees", disc: "30% OFF", accent: "#bfdbfe", bg: "linear-gradient(120deg,#1e3a5f,#1d4ed8)" },
  "mens-shirts": { label: "Formals", title: "Men's Shirts", disc: "25% OFF", accent: "#94a3b8", bg: "linear-gradient(120deg,#0f172a,#1e293b)" },
  "womens-dresses": { label: "New Season", title: "Women's Dresses", disc: "35% OFF", accent: "#f9a8d4", bg: "linear-gradient(120deg,#831843,#be185d)" },
  "mens-shoes": { label: "Step Up", title: "Men's Shoes", disc: "20% OFF", accent: "#d6d3d1", bg: "linear-gradient(120deg,#1c1917,#44403c)" },
  "womens-shoes": { label: "Walk in Style", title: "Women's Shoes", disc: "30% OFF", accent: "#fda4af", bg: "linear-gradient(120deg,#881337,#be123c)" },
  "womens-bags": { label: "Carry More", title: "Women's Bags", disc: "25% OFF", accent: "#fde68a", bg: "linear-gradient(120deg,#713f12,#b45309)" },
  "womens-jewellery": { label: "Shine On", title: "Women's Jewellery", disc: "20% OFF", accent: "#e9d5ff", bg: "linear-gradient(120deg,#4a1d96,#7c3aed)" },
  sunglasses: { label: "Look Cool", title: "Sunglasses", disc: "15% OFF", accent: "#93c5fd", bg: "linear-gradient(120deg,#1e3a5f,#1d4ed8)" },
  all: { label: "Special Discount", title: "All Products", disc: "Up to 40% OFF", accent: "#a78bfa", bg: "linear-gradient(120deg,#1a1a2e,#2d2d4e)" },
};

const getBanner = (cat) => BANNER_META[cat] || BANNER_META["all"];

const Products = () => {
  const { data, fetchAllProducts } = getData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!data) fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    setCategory(urlCategory || "all");
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      const max = Math.max(...data.map((p) => p.price));
      setPriceRange(max);
    }
  }, [data]);

  const handleBrandChange = (e) => setBrand(e.target.value);

  const filteredData = data?.filter((product) => {
    if (product.stock === 0) return false;
    const matchSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || product.category === category;
    const matchBrand = brand === "all" || product.brand === brand;
    const matchPrice = product.price <= priceRange;
    return matchSearch && matchCategory && matchBrand && matchPrice;
  });

  const banner = getBanner(category);

  return (
    <div className="min-h-screen bg-gray-50">
      {!data ? (
        <div className="flex items-center justify-center h-screen">
          <DotLottieReact src="/loading.lottie" loop autoplay style={{ width: 180, height: 180 }} />
        </div>
      ) : (
        // FIX 2: reduced top padding — was pt-24 md:pt-28 lg:pt-28, now pt-20 across the board
        <div className="pt-20">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 pb-16">

            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a1a2e] transition-colors cursor-pointer mb-4"
            >
              <IoArrowBackOutline className="text-lg" />
            </button>

            {/* Main Layout */}
            <div className="flex gap-4 md:gap-5 items-start">

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden fixed bottom-5 left-5 z-50 bg-[#1a1a2e] text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-semibold"
              >
                ☰ Filters
              </button>

              {/* Overlay */}
              {showFilters && (
                <div onClick={() => setShowFilters(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />
              )}

              {/* Sidebar — mobile: slide-in drawer / desktop: sticky column, NO overflow of its own */}
              <div
                className={`fixed top-0 left-0 h-screen w-72 bg-white z-50 shadow-2xl overflow-y-auto
                  lg:static lg:translate-x-0 lg:h-auto lg:w-64 lg:shadow-none lg:overflow-visible
                  transition-transform duration-300
                  ${showFilters ? "translate-x-0" : "-translate-x-full"}`}
                // FIX 1: on desktop, sticky positioning is handled here only — FilterSection's
                // own sticky/overflow styles are intentionally overridden below via a wrapper.
                style={{
                  ...(window.innerWidth >= 1024 && {
                    position: "sticky",
                    top: "80px",           // matches navbar height
                    maxHeight: "calc(100vh - 96px)",
                    overflowY: "auto",
                  }),
                }}
              >
                {/* Drawer Header (mobile only) */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 lg:hidden">
                  <h2 className="font-bold text-lg">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="text-2xl text-gray-500">×</button>
                </div>

                {/* FilterSection wrapper — neutralise the sticky/overflow inside FilterSection
                    so it doesn't create a second scroll container on desktop */}
                <div
                  className="p-3 lg:p-0 rounded"
                  style={{ position: "static", height: "auto", maxHeight: "none", overflow: "visible" }}
                >
                  <FilterSection
                    search={search}
                    setSearch={setSearch}
                    brand={brand}
                    setBrand={setBrand}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    category={category}
                    setCategory={setCategory}
                    handleBrandChange={handleBrandChange}
                    data={data}
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-5 w-full">

                {/* Banner */}
                <div
                  className="relative rounded-2xl md:rounded-3xl overflow-hidden px-4 md:px-8 py-5 md:py-7 flex items-center justify-between min-h-[140px] md:min-h-[160px]"
                  style={{ background: banner.bg }}
                >
                  <div className="flex flex-col gap-1 md:gap-2 z-10">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest" style={{ color: banner.accent }}>
                      {banner.label}
                    </span>
                    <h2 className="text-xl md:text-3xl font-bold text-white leading-tight">{banner.title}</h2>
                    <p className="text-xs md:text-sm font-semibold" style={{ color: banner.accent }}>
                      Up to {banner.disc} on top brands
                    </p>
                    <button
                      onClick={() => navigate("/products")}
                      className="mt-2 px-4 md:px-5 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-bold border-none cursor-pointer w-max transition-opacity duration-200 hover:opacity-90"
                      style={{ background: banner.accent, color: "#1a1a2e" }}
                    >
                      Shop Now →
                    </button>
                  </div>
                  <div
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-24 md:w-40 h-24 md:h-40 rounded-full blur-2xl opacity-30"
                    style={{ background: banner.accent }}
                  />
                  <div className="absolute right-4 md:right-8 opacity-10 text-white z-10" style={{ fontSize: "50px" }}>
                    🛍️
                  </div>
                </div>

                {/* Products Grid */}
                <div>
                  {filteredData?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
                      {filteredData.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-96 gap-3">
                      <span className="text-5xl">🔍</span>
                      <p className="text-gray-500 font-medium">No products found</p>
                      <button onClick={() => setCategory("all")} className="text-sm text-[#1a1a2e] underline cursor-pointer">
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
