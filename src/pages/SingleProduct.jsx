import axios from "axios";
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoCartOutline, IoArrowBackOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const navigate = useNavigate();

  const { addToCart, cartItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    getSingleProduct();
    window.scrollTo(0, 0);
  }, [params.id]);

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${params.id}`
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DotLottieReact
          src="/loading.lottie"
          loop
          autoplay
          style={{ width: 200, height: 200 }}
        />
      </div>
    );
  }

  const originalPrice = Math.round(
    product.price / (1 - product.discountPercentage / 100)
  );

  const rating = Math.round(product.rating);

  const isInCart = cartItem.some((item) => item.id === product.id);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    const existing = cartItem.find((item) => item.id === product.id);

    if (existing) {
      navigate("/cart");
    } else {
      addToCart({ ...product, quantity: quantity - 1 });

      for (let i = 1; i < quantity; i++) {
        addToCart(product);
      }

      navigate("/cart");
    }
  };

  const handleWishlist = () => toggleWishlist(product);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 md:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <div className=" flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400 mb-4 md:mb-6 mt-2 md:mt-3">

          {/* Back button */}
          {/* <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a1a2e] transition-colors cursor-pointer mr-2"
          >
            <IoArrowBackOutline className="text-lg" />
          </button> */}

          <Link
            to="/"
            className="hover:text-[#1a1a2e] transition-colors"
          >
            Home
          </Link>

          <span>›</span>

          <Link
            to="/products"
            className="hover:text-[#1a1a2e] transition-colors"
          >
            Products
          </Link>

          <span>›</span>

          <span className="text-gray-700 font-medium line-clamp-1">
            {product.title}
          </span>
        </div>

        {/* Main layout */}
        <div
          className="
  flex
  flex-col
  lg:flex-row
  gap-6
  lg:gap-12
  items-start
  bg-white
  rounded-2xl
  border
  border-gray-100
  px-4
  sm:px-6
  lg:px-8
  pt-4
  pb-3
  sm:pt-6
  sm:pb-4
  lg:pt-8
  lg:pb-5
  shadow-sm
"
        >

          {/* LEFT — Image */}
          <div className="flex flex-col items-center gap-4 shrink-0 w-full lg:w-auto">

            <div className="relative w-full flex justify-center">

              {/* Wishlist */}
              <button
                onClick={handleWishlist}
                className="
                  absolute
                  top-3
                  right-3
                  w-8
                  h-8
                  rounded-full
                  flex
                  items-center
                  justify-center
                  border
                  border-gray-200
                  transition-all
                  duration-200
                  z-10
                  cursor-pointer
                "
                style={{
                  background: wishlisted ? "#1a1a2e" : "#fff",
                }}
              >
                {wishlisted ? (
                  <AiFillHeart className="text-white text-sm" />
                ) : (
                  <AiOutlineHeart className="text-gray-400 text-sm" />
                )}
              </button>

              {/* Discount badge */}
              <span
                className="
                  absolute
                  top-3
                  left-3
                  bg-red-500
                  text-white
                  text-[10px]
                  font-semibold
                  px-2
                  py-0.5
                  rounded-full
                  z-10
                "
              >
                -{Math.round(product.discountPercentage)}%
              </span>

              <div
                className="
                  w-full
                  max-w-[320px]
                  h-[260px]
                  sm:h-[320px]
                  bg-gray-50
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                  border
                  border-gray-100
                "
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="
                    w-full
                    h-full
                    object-contain
                    p-4
                  "
                />
              </div>
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="flex flex-col gap-4 sm:gap-5 flex-1 min-w-0 w-full">

            {/* Brand + Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.brand && (
                <span
                  className="
                    text-[11px]
                    sm:text-xs
                    text-gray-500
                    bg-gray-100
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  {product.brand}
                </span>
              )}

              <span
                className="
                  text-[11px]
                  sm:text-xs
                  text-gray-500
                  bg-gray-100
                  px-3
                  py-1
                  rounded-full
                  capitalize
                "
              >
                {product.category?.replace(/-/g, " ")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-bold
                text-gray-900
                leading-snug
              "
            >
              {product.title}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-sm"
                    style={{
                      color:
                        i < rating ? "#F59E0B" : "#E5E7EB",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <span className="text-sm text-gray-400">
                ({product.rating})
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                ${product.price}
              </span>

              <span className="text-sm sm:text-base text-gray-400 line-through">
                ${originalPrice}
              </span>

              <span
                className="
                  text-[11px]
                  sm:text-xs
                  font-semibold
                  bg-green-50
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                "
              >
                {Math.round(product.discountPercentage)}% off
              </span>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Description */}
            <p
              className="
                text-sm
                text-gray-500
                leading-relaxed
              "
            >
              {product.description}
            </p>

            <div className="h-px bg-gray-100" />

            {/* Quantity */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-gray-700">
                Quantity
              </span>

              <div className="flex items-center">
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.max(1, prev - 1))
                  }
                  className="
                    w-8
                    h-8
                    bg-gray-100
                    border
                    border-gray-200
                    rounded-l-lg
                    text-gray-700
                    font-medium
                    hover:bg-gray-200
                    transition-all
                    cursor-pointer
                    text-lg
                    flex
                    items-center
                    justify-center
                  "
                >
                  −
                </button>

                <span
                  className="
                    w-10
                    h-8
                    border-t
                    border-b
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-semibold
                    text-gray-800
                    bg-white
                  "
                >
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                  className="
                    w-8
                    h-8
                    bg-gray-100
                    border
                    border-gray-200
                    rounded-r-lg
                    text-gray-700
                    font-medium
                    hover:bg-gray-200
                    transition-all
                    cursor-pointer
                    text-lg
                    flex
                    items-center
                    justify-center
                  "
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={handleAddToCart}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:opacity-90
                  cursor-pointer
                  border-none
                  flex-1
                "
                style={{
                  background: "#1a1a2e",
                }}
              >
                <IoCartOutline className="text-base" />

                {isInCart ? "Go to Cart" : "Add to Cart"}
              </button>

              <button
                onClick={handleAddToCart}
                className="
                  flex-1
                  px-6
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  bg-gray-100
                  text-gray-800
                  hover:bg-gray-200
                  transition-all
                  duration-200
                  cursor-pointer
                  border-none
                "
              >
                Buy Now
              </button>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {[
                "Free Delivery",
                "7-day Returns",
                "In Stock",
                "1 Year Warranty",
              ].map((tag) => (
                <span
                  key={tag}
                  className="
                    text-[11px]
                    sm:text-xs
                    text-gray-500
                    bg-gray-50
                    border
                    border-gray-100
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;