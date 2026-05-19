import React from "react";
import { getData } from "../context/DataContext";

const FilterSection = ({ search, setSearch, brand, setBrand, handleBrandChange, priceRange, setPriceRange, category, setCategory, data }) => {
  const { catagoryOnlyData, brandOnlyData } = getData();

  // ✅ get max price from data for range input
  const maxPrice = data ? Math.max(...data.map(p => p.price)) : 10000

  const handleReset = () => {
    setSearch("")
    setCategory("all")
    setPriceRange(maxPrice)
    setBrand("all")
  }

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max w-64 shrink-0">
      {/* Search */}
      <input
        type="text"
        placeholder="Search.."
        value={search}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">

        {/* All checkbox */}
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={category === "all"}
            onChange={() => setCategory("all")}
          />
          <button className="cursor-pointer uppercase" onClick={() => setCategory("all")}>
            All
          </button>
        </div>

        {/* API categories */}
        {catagoryOnlyData?.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={category === item.category}
              onChange={() => setCategory(item.category)}
            />
            <button
              className="cursor-pointer uppercase"
              onClick={() => setCategory(item.category)}
            >
              {item.category}
            </button>
          </div>
        ))}
      </div>

      {/* Brands */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brands</h1>
      <select
        className="bg-white w-full p-2 border-2 border-gray-200 rounded-md cursor-pointer"
        value={brand}
        onChange={handleBrandChange}
      >
        <option value="all">All</option>
        {brandOnlyData?.map((item, index) => (
          <option key={index} value={item.brand}>
            {item.brand}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label>Max Price: ${priceRange}</label>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="cursor-pointer"
        />
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer active:scale-97 w-full"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;