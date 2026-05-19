import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({product}) => {
  
  const navigate = useNavigate()
  const {addToCart, cartItem} = useCart()

  // ✅ Check if this product is already in cart
  const isInCart = cartItem.some((item) => item.id === product.id)

  const handleCartClick = () => {
    if (isInCart) {
      // ✅ If already in cart, navigate to cart
      navigate("/cart")
    } else {
      // ✅ If not in cart, add to cart
      addToCart(product)
    }
  }

  return (
    <div className="border border-gray-100 relative rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max">
      <img
        src={product.thumbnail}
        alt=""
        className="bg-gray-100 aspect-square"
        onClick={() => navigate(`/products/${product.id}`)}
      />
      <h1 className="line-clamp-2 p1 font-semibold">{product.title}</h1>
      <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>

      {/* ✅ Button changes based on cart status */}
      <button
        onClick={handleCartClick}
        className={`px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold transition-all ${
          isInCart ? "bg-gray-800 hover:bg-gray-900" : "bg-red-500 hover:bg-red-600"
        }`}
      >
        <IoCartOutline className="w-6 h-6" />
        {isInCart ? "Buy Now" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;