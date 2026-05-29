import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoArrowBackOutline, IoCartOutline } from "react-icons/io5";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const PASTEL_BGS = [
  "#EEF2FF", "#FFF3E0", "#E8F5E9", "#FCE4EC",
  "#E3F2FD", "#F3E5F5", "#E0F2F1", "#FFFDE7",
];

const getOriginalPrice = (price, discount) =>
  Math.round(price / (1 - discount / 100));

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, cartItem } = useCart();

  const handleCartClick = (e, product) => {
    e.stopPropagation();
    const isInCart = cartItem.some((item) => item.id === product.id);
    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(product);
      toast.success("Product added to cart!");
    }
  };

  const handleRemove = (e, productId) => {
    e.stopPropagation();
    removeFromWishlist(productId);
    toast.success("Removed from wishlist");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    /*
      Mobile navbar height ≈ 96px (two rows ~48px each)
      Tablet navbar height ≈ 96px
      Desktop navbar height = 64px
      Use pt-28 for mobile/tablet, lg:pt-24 for desktop
    */
    <div className="min-h-screen bg-gray-50 pt-28 lg:pt-24 pb-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header with back arrow */}
        <div className="pt-2 pb-5 sm:pb-6 flex items-center gap-3">
          {/* <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
          >
            <IoArrowBackOutline className="text-gray-600 text-base" />
          </button> */}
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">
            My Wishlist
            {wishlistItems.length > 0 && (
              <span className="ml-2 text-xs sm:text-sm font-medium text-gray-400">
                ({wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"})
              </span>
            )}
          </h1>
        </div>

        {/* Empty state */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center">
            <AiOutlineHeart className="text-6xl sm:text-7xl text-gray-200" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-500">Your wishlist is empty</h2>
            <p className="text-sm text-gray-400">Items you heart will appear here</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-4 text-white px-6 py-3 rounded-2xl font-semibold cursor-pointer transition-all hover:opacity-90 border-none text-sm"
              style={{ background: "#1a1a2e" }}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {wishlistItems.map((product, index) => {
              const isInCart = cartItem.some((item) => item.id === product.id);
              const originalPrice = getOriginalPrice(product.price, product.discountPercentage);
              const pastelBg = PASTEL_BGS[index % PASTEL_BGS.length];
              const rating = Math.round(product.rating);

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex flex-col"
                >
                  {/* Image */}
                  <div
                    className="relative flex items-center justify-center h-[150px] sm:h-[180px] lg:h-[190px]"
                    style={{ backgroundColor: pastelBg }}
                  >
                    <button
                      onClick={(e) => handleRemove(e, product.id)}
                      className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center z-10 border border-gray-200 transition-all duration-200"
                      style={{ background: "#1a1a2e" }}
                    >
                      <AiFillHeart className="text-white text-xs sm:text-sm" />
                    </button>
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain p-3 transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-3 sm:p-4 flex flex-col gap-1.5 flex-1">
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
                      {product.brand || product.category}
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 leading-snug min-h-[40px]">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xs sm:text-sm" style={{ color: i < rating ? "#F59E0B" : "#E5E7EB" }}>★</span>
                      ))}
                      <span className="text-[10px] sm:text-xs text-gray-400 ml-1">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-1 gap-2">
                      <div className="flex items-baseline gap-1 min-w-0">
                        <span className="text-sm sm:text-lg font-bold text-gray-900">${product.price}</span>
                        <span className="text-[10px] sm:text-xs text-gray-400 line-through">${originalPrice}</span>
                      </div>
                      <button
                        onClick={(e) => handleCartClick(e, product)}
                        className="flex items-center justify-center gap-1 text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all duration-200 hover:opacity-90 cursor-pointer border-none whitespace-nowrap"
                        style={{ background: "#1a1a2e" }}
                      >
                        <IoCartOutline className="text-xs sm:text-sm" />
                        {isInCart ? "In Cart" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
