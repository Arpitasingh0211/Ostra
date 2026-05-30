import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import { IoCartOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const getOriginalPrice = (price, discount) =>
  Math.round(price / (1 - discount / 100));

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const isInCart = cartItem.some((item) => item.id === product.id);
  const wishlisted = isWishlisted(product.id);
  const originalPrice = getOriginalPrice(product.price, product.discountPercentage);
  const rating = Math.round(product.rating);

  const handleCartClick = () => {
    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(product);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-5 flex flex-row items-center gap-3 sm:gap-6 hover:shadow-md transition-shadow duration-200 cursor-pointer w-full"
    >
      {/* Image */}
      <div className="relative shrink-0">
        {/* Mobile: 80px, Tablet+: 160px */}
        <div className="w-20 h-20 sm:w-40 sm:h-40 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain p-1 sm:p-3"
          />
        </div>
        <span className="absolute top-1 left-1 bg-red-500 text-white text-[9px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full">
          -{Math.round(product.discountPercentage)}%
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 sm:gap-2.5 flex-1 min-w-0">
        <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
          {product.brand || product.category}
        </span>
        <h2 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.title}
        </h2>

        {/* Stars — visible on tablet+ */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xs sm:text-sm" style={{ color: i < rating ? "#F59E0B" : "#E5E7EB" }}>★</span>
          ))}
          <span className="text-xs sm:text-sm text-gray-400 ml-1">({product.rating})</span>
        </div>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2.5">
          <span className="text-sm sm:text-xl font-bold text-gray-900">${product.price}</span>
          <span className="text-xs sm:text-sm text-gray-400 line-through">${originalPrice}</span>
          <span className="text-[10px] sm:text-xs font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
            {Math.round(product.discountPercentage)}% off
          </span>
        </div>

        {/* Description snippet on tablet */}
        {product.description && (
          <p className="hidden sm:block text-xs sm:text-sm text-gray-400 line-clamp-2 mt-1">
            {product.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div
        className="flex flex-col items-center gap-2 sm:gap-3 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleWishlist}
          className="w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border border-gray-200 transition-colors duration-150 cursor-pointer"
          style={{ background: wishlisted ? "#1a1a2e" : "#fff" }}
        >
          {wishlisted
            ? <AiFillHeart className="text-white text-sm sm:text-lg" />
            : <AiOutlineHeart className="text-gray-400 text-sm sm:text-lg" />
          }
        </button>
        <button
          onClick={handleCartClick}
          className="flex items-center justify-center gap-1 px-2 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-[10px] sm:text-sm font-semibold text-white hover:opacity-90 cursor-pointer border-none transition-opacity duration-150"
          style={{ background: "#1a1a2e" }}
        >
          <IoCartOutline className="text-xs sm:text-base" />
          <span className="hidden sm:inline">{isInCart ? "Go to Cart" : "Add to Cart"}</span>
          <span className="sm:hidden">{isInCart ? "Cart" : "Add"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductListView;
