import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getData } from "../context/DataContext";

import { toast } from "react-toastify";

const TrendingNow = () => {
  const { data, fetchAllProducts } = getData();

  const navigate = useNavigate();

  const { addToCart, cartItem } = useCart();

  const { isWishlisted, toggleWishlist } =
    useWishlist();

  useEffect(() => {
    if (!data) fetchAllProducts();
  }, []);

  const handleCartClick = (e, product) => {
    e.stopPropagation();

    const isInCart = cartItem.some(
      (item) => item.id === product.id
    );

    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(product);

      if (window.innerWidth >= 768) {
        toast.success("Product added to cart!");
      }
    }
  };

 const handleWishlist = (e, product) => {
  e.stopPropagation();

  const alreadyWishlisted = isWishlisted(product.id);

  toggleWishlist(product);

   if (window.innerWidth >= 768) {
    if (alreadyWishlisted) {
      toast.info("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  }
};

  return (
    <div className="w-full px-3 sm:px-4 md:px-8 lg:px-12 mt-10 sm:mt-14">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1f1729]">
          Trending Now
        </h1>

        <button
          onClick={() => navigate("/products")}
          className="
            flex
            items-center
            gap-1
            text-xs
            sm:text-sm
            font-medium
            text-[#2403ff]
            hover:text-[#8B7CF6]
            transition-all
            duration-300
            cursor-pointer
          "
        >
          View all

          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Product Grid */}
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-3
          sm:gap-5
        "
      >
        {data?.slice(45, 49).map((product) => {
          const originalPrice = Math.round(
            product.price /
              (1 - product.discountPercentage / 100)
          );

          const isInCart = cartItem.some(
            (item) => item.id === product.id
          );

          const wishlisted = isWishlisted(product.id);

          return (
            <div
              key={product.id}
              onClick={() =>
                navigate(`/products/${product.id}`)
              }
              className="
                bg-white
                rounded-xl
                sm:rounded-2xl
                p-2
                sm:p-4
                cursor-pointer
                transition-all
                duration-300
                hover:shadow-md
                border
                border-gray-100
                group
              "
            >
              {/* Image Section */}
              <div
                className="
                  relative
                  bg-[#f8f8f8]
                  rounded-xl
                  sm:rounded-2xl
                  overflow-hidden
                  aspect-square
                "
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) =>
                    handleWishlist(e, product)
                  }
                  className="
                    absolute
                    top-2
                    left-2
                    w-6
                    h-6
                    sm:w-7
                    sm:h-7
                    rounded-full
                    flex
                    items-center
                    justify-center
                    z-10
                    transition-all
                    duration-200
                    border
                    border-gray-200
                  "
                  style={{
                    background: wishlisted
                      ? "#1a1a2e"
                      : "#fff",
                  }}
                >
                  {wishlisted ? (
                    <AiFillHeart className="text-white text-xs sm:text-sm" />
                  ) : (
                    <AiOutlineHeart className="text-gray-400 text-xs sm:text-sm" />
                  )}
                </button>

                {/* Product Image */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="
                    h-[140px]
                    sm:h-[220px]
                    w-full
                    object-contain
                    group-hover:scale-105
                    transition-all
                    duration-300
                    p-2
                  "
                />
              </div>

              {/* Content */}
              <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">

                {/* Product Title */}
                <h2
                  className="
                    text-[13px]
                    sm:text-[15px]
                    font-medium
                    text-gray-800
                    line-clamp-2
                    leading-tight
                  "
                >
                  {product.title}
                </h2>

                {/* Category */}
                <p className="text-[11px] sm:text-sm text-gray-500 capitalize">
                  {product.category}
                </p>

                {/* Price */}
                <div className="flex items-center gap-1 sm:gap-2">

                  <span className="font-bold text-sm sm:text-lg text-black">
                    ${product.price}
                  </span>

                  <span className="text-[11px] sm:text-sm line-through text-gray-400">
                    ${originalPrice}
                  </span>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-1 sm:pt-2">

                  <span className="text-green-600 text-[11px] sm:text-sm font-medium">
                    {product.discountPercentage}% OFF
                  </span>

                  <button
                    onClick={(e) =>
                      handleCartClick(e, product)
                    }
                    className="
                      p-1.5
                      sm:p-2
                      rounded-full
                      border
                      border-gray-200
                      hover:bg-[#1a1a2e]
                      hover:text-white
                      hover:border-[#1a1a2e]
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                  >
                    <IoCartOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingNow;