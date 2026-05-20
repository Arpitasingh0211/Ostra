import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'

const ProductListView = ({product}) => {
  const navigate = useNavigate()
  const { addToCart, cartItem } = useCart()

  // ✅ Check if product is already in cart
  const isInCart = cartItem.some((item) => item.id === product.id)

  const handleCartClick = () => {
    if (isInCart) {
      navigate("/cart")
    } else {
      addToCart(product)
      toast.success("Product added to cart!")  // ✅ toast notification
    }
  }

  return (
    <div className='space-y-4 mt-2 rounded:md'>
      <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='h-60 w-60 rounded-md cursor-pointer bg-white/50'
          onClick={() => navigate(`/products/${product.id}`)}
        />
        <div className='space-y-2'>
          <h1 className='font-bold text-xl line-clamp-3 hover:text-red-500 w-full cursor-pointer'>
            {product.title}
          </h1>
          <p className='font-semibold flex items-center text-lg'>
            $<span className='text-2xl'>{product.price}</span>
            ({product.discountPercentage}% off)
          </p>
          <p>
            FREE delivery <span className='font-semibold'>Fri, 30 May</span><br />
            Or fastest delivery <span className='font-semibold'>Tommorow, 22 May</span>
          </p>

          {/* ✅ Button changes to Buy Now when in cart */}
          <button
            onClick={handleCartClick}
            className=" bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer transition-all" 
          >
            {isInCart ? "Buy Now" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView