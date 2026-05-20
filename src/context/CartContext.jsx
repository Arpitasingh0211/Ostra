import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null)

export const CartProvider = ({children}) => {
    const [cartItem, setCartItem] = useState([])

    //  If product already exists, increase quantity
    const addToCart = (product) => {
        setCartItem((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,                        
                    )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    //  Increase quantity
    const increaseQuantity = (id) => {
        setCartItem((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }

    // ✅ Decrease quantity — remove if quantity reaches 0
    const decreaseQuantity = (id) => {
        setCartItem((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    // ✅ Delete product from cart
    const removeFromCart = (id) => {
        setCartItem((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <CartContext.Provider value={{ cartItem, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}