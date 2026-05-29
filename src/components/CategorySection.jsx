import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Beauty from "../assets/categoryImages/Beauty.webp";
import Fragrance from "../assets/categoryImages/Fragrance.webp";
import Skincare from "../assets/categoryImages/SkinCare.webp";
import Furniture from "../assets/categoryImages/Furniture.webp";
import Groceries from "../assets/categoryImages/Groceries.webp";
import HomeDecor from "../assets/categoryImages/HomeDecor.webp";
import Kitchen from "../assets/categoryImages/Kitchen.webp";
// import Motorcycle from "../assets/categoryImages/Motorcycle.webp";
import Laptops from "../assets/categoryImages/Laptop.webp";
import Shirt from "../assets/categoryImages/Shirt.webp";
import Shoes from "../assets/categoryImages/Shoes.webp";
import Watches from "../assets/categoryImages/Watches.webp";
import MobileAccessories from "../assets/categoryImages/MobileAcccessories.webp";

const CATEGORIES = [
  { slug: "laptops", label: "Laptops", image: Laptops },
  { slug: "groceries", label: "Groceries", image: Groceries },
  { slug: "home-decoration", label: "Home Decor", image: HomeDecor },
  { slug: "furniture", label: "Furniture", image: Furniture },
  { slug: "mens-shirts", label: "Shirts", image: Shirt },
  { slug: "mens-shoes", label: "Shoes", image: Shoes },
  { slug: "mens-watches", label: "Watches", image: Watches },
  { slug: "beauty", label: "Beauty", image: Beauty },
  { slug: "fragrances", label: "Fragrance", image: Fragrance },
  { slug: "skin-care", label: "Skincare", image: Skincare },
  {
    slug: "mobile-accessories",
    label: "Accessories",
    image: MobileAccessories,
  },
  { slug: "motorcycle", label: "Motorcycle", image: Motorcycle },
  {
    slug: "kitchen-accessories",
    label: "Kitchen",
    image: Kitchen,
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-8 sm:py-10 bg-white">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-4 sm:px-6 lg:px-8">

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Shop by Categories
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="
            text-sm
            sm:text-base
            font-semibold
            text-[#1a1a2e]
            hover:underline
            cursor-pointer
            flex
            items-center
            gap-1
            shrink-0
          "
        >
          View all

          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Categories Grid */}
      <div
        className="
          grid
          grid-cols-3
          sm:grid-cols-4
          md:grid-cols-5
          lg:grid-cols-6
          xl:grid-cols-7
          gap-y-8
          gap-x-4
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {CATEGORIES.map((item) => (
          <button
            key={item.slug}
            onClick={() =>
              navigate(`/products?category=${item.slug}`)
            }
            className="
              flex
              flex-col
              items-center
              gap-3
              cursor-pointer
              group
            "
          >
            {/* Circle */}
            <div
              className="
                w-20
                h-20
                sm:w-24
                sm:h-24
                rounded-full
                overflow-hidden
                shadow-md
                border
                border-gray-200
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:shadow-xl
              "
            >
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                decoding="async"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            </div>

            {/* Label */}
            <span
              className="
                text-xs
                sm:text-sm
                font-medium
                text-center
                text-gray-800
                capitalize
                leading-tight
              "
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;