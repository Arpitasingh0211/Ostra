import axios from "axios";
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const [SingleProduct, setSingleProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();

  useEffect(() => {
    getSingleProduct();
  }, []);

  const originalPrice = Math.round(
    SingleProduct.price / (1 - SingleProduct.discountPercentage / 100)
  );

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${params.id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Add to cart with selected quantity
  const handleAddToCart = () => {
    const existingItem = cartItem.find((item) => item.id === SingleProduct.id)
    if (existingItem) {
      // if already in cart, add the selected quantity on top
      for (let i = 0; i < quantity; i++) {
        addToCart(SingleProduct)
      }
    } else {
      addToCart({ ...SingleProduct, quantity: quantity - 1 }) // -1 because addToCart adds 1
      for (let i = 1; i < quantity; i++) {
        addToCart(SingleProduct)
      }
    }
    navigate("/cart")
  }

  // ✅ Buy now — add to cart and go to cart directly
  const handleBuyNow = () => {
    handleAddToCart()
    navigate("/cart")
  }

  return (
    <div>
      {SingleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={SingleProduct.title} />
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="w-full">
              <img src={SingleProduct.thumbnail} alt={SingleProduct.title} className="rounded-2xl w-full object-cover" />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl font-bold text-gray-800">{SingleProduct.title}</h1>
              <div className="text-gray-700">
                {SingleProduct.brand?.toUpperCase()} / {SingleProduct.category?.toUpperCase()}
              </div>
              <p className="text-xl text-red-500 font-bold">
                ${SingleProduct.price}
                <span className="line-through text-gray-700 mr-1 text-sm">${originalPrice}</span>
                <span className="bg-red-500 text-white text-sm px-4 py-1 rounded">
                  {SingleProduct.discountPercentage}% off
                </span>
              </p>
              <p className="text-gray-600">{SingleProduct.description}</p>

              {/* ✅ Quantity Selector with + and - buttons */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-4 py-2 bg-gray-100 text-gray-800 text-lg font-bold hover:bg-gray-200 cursor-pointer transition-all"
                  >
                    -
                  </button>
                  <span className="px-5 py-2 text-gray-800 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-100 text-gray-800 text-lg font-bold hover:bg-gray-200 cursor-pointer transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ✅ Add to Cart + Buy Now buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleAddToCart}
                  className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition-all"
                >
                  <IoCartOutline className="w-6 h-6" />Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="px-6 py-2 text-lg bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-900 transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <DotLottieReact
            src="/loading.lottie"
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
        </div>
      )}
    </div>
  );
};

export default SingleProduct;