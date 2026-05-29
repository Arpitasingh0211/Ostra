import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";

const PASTEL_BGS = [
  "#EEF2FF",
  "#FFF3E0",
  "#E8F5E9",
  "#FCE4EC",
  "#E3F2FD",
  "#F3E5F5",
  "#E0F2F1",
  "#FFFDE7",
];

const getOriginalPrice = (price, discount) =>
  Math.round(price / (1 - discount / 100));

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (product.stock === 0) return null;

  const isInCart = cartItem.some((item) => item.id === product.id);
  const wishlisted = isWishlisted(product.id);
  const originalPrice = getOriginalPrice(
    product.price,
    product.discountPercentage,
  );
  const pastelBg = PASTEL_BGS[index % PASTEL_BGS.length];
  const rating = Math.round(product.rating);

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(product);
      toast.success("Product added to cart!");
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer  hover:shadow-md transition-transform duration-200  flex flex-col"
    >
      {/* Image area */}
      <div
        className="relative flex items-center justify-center"
        style={{ backgroundColor: pastelBg, height: "160px" }}
      >
        {/* Wishlist heart */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center z-10 transition-all duration-200 border border-gray-200"
          style={{ background: wishlisted ? "#1a1a2e" : "#fff" }}
        >
          {wishlisted ? (
            <AiFillHeart className="text-white text-sm" />
          ) : (
            <AiOutlineHeart className="text-gray-400 text-sm" />
          )}
        </button>

        {/* Discount badge */}
        <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          -{Math.round(product.discountPercentage)}%
        </span>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain p-3"
        />
      </div>

      {/* Card body */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-wide">
          {product.brand || product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="text-xs"
              style={{ color: i < rating ? "#F59E0B" : "#E5E7EB" }}
            >
              ★
            </span>
          ))}
          <span className="text-[10px] text-gray-400 ml-1">
            ({product.rating})
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-[10px] text-gray-400 line-through">
              ${originalPrice}
            </span>
          </div>
          <button
            onClick={handleCartClick}
            className="flex items-center gap-1 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-90 cursor-pointer border-none"
            style={{ background: "#1a1a2e" }}
          >
            <IoCartOutline className="text-xs" />
            <>
              {isInCart ? (
                <>
                  <span className="hidden lg:inline">Go to Cart</span>
                  <span className="lg:hidden">Cart</span>
                </>
              ) : (
                "+ Add"
              )}
            </>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
