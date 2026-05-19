import React, { use, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import EmptyCart from "../assets/EmptyCart.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  // ✅ Total price now accounts for quantity
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    state: "",
    postCode: "",
    country: "",
    phone: "",
  });

  const [detecting, setDetecting] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const handleAutoFill = () => {
    if (!isSignedIn) return alert("Please login first!");
    setFormData({
      fullName: user?.fullName || "",
      address: user?.publicMetadata?.address || "",
      state: user?.publicMetadata?.state || "",
      postCode: user?.publicMetadata?.postCode || "",
      country: user?.publicMetadata?.country || "",
      phone: user?.phoneNumbers?.[0]?.phoneNumber || "",
    });
  };

  const handleDetectLocation = () => {
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        try {
          const res = await axios.get(url);
          const addr = res.data.address;
          setFormData((prev) => ({
            ...prev,
            address:
              `${addr.road || ""} ${addr.suburb || addr.neighbourhood || ""}`.trim(),
            state: addr.state || "",
            postCode: addr.postcode || "",
            country: addr.country || "",
          }));
        } catch (err) {
          console.error(err);
          alert("Could not fetch location. Try again.");
        } finally {
          setDetecting(false);
        }
      },
      () => {
        alert("Location access denied. Please allow location.");
        setDetecting(false);
      },
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePromoCode = () => {
    if (!isSignedIn) return alert("Please login to apply promo code!");
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    const usedCodes = JSON.parse(
      localStorage.getItem("usedPromoCodes") || "[]",
    );
    if (promoCode.toUpperCase() === "WELCOME20") {
      if (usedCodes.includes(userEmail)) {
        setPromoMessage("You have already used this promo code!");
        setDiscount(0);
      } else {
        setDiscount(20);
        setPromoMessage("✅ $20 discount applied successfully!");
        localStorage.setItem(
          "usedPromoCodes",
          JSON.stringify([...usedCodes, userEmail]),
        );
      }
    } else {
      setPromoMessage("Invalid promo code!");
      setDiscount(0);
    }
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5">
      {cartItem.length > 0 ? (
        <div>
          {/* ✅ Cart count shows unique items */}
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>
          <div className="mt-10">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 rounded-md cursor-pointer"
                    onClick={() => navigate(`/products/${item.id}`)}
                  />
                  <div>
                    <h1 className="w-[300px] line-clamp-2">{item.title}</h1>
                    <p className="text-red-500 font-semibold text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* ✅ + and - buttons with quantity */}
                <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                  <button
                    className="cursor-pointer"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="cursor-pointer"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                {/* ✅ Delete button */}
                <span
                  onClick={() => removeFromCart(item.id)}
                  className="hover:bg-white/60 transition-all duration-300 rounded-full p-3 hover:shadow-2xl"
                >
                  <FaRegTrashAlt className="text-red-500 text-2xl cursor-pointer" />
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-20">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>
                {isSignedIn && (
                  <button
                    onClick={handleAutoFill}
                    className="bg-purple-500 text-white px-3 py-1 text-sm rounded-md cursor-pointer hover:bg-purple-600 transition-all"
                  >
                    Fill My Details
                  </button>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label>Full name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    className="p-2 rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>Post Code</label>
                  <input
                    type="text"
                    name="postCode"
                    value={formData.postCode}
                    onChange={handleChange}
                    placeholder="Enter your post code"
                    className="p-2 rounded-md w-full"
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter your country"
                    className="p-2 rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>Phone No</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your number"
                    className="p-2 rounded-md w-full"
                  />
                </div>
              </div>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer">
                Submit
              </button>
              <div className="flex items-center justify-center w-full text-gray-700">
                ----------OR-----------
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleDetectLocation}
                  disabled={detecting}
                  className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer disabled:opacity-60"
                >
                  {detecting ? "Detecting..." : "Detect location"}
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
              <h1 className="text-gray-800 font-bold text-xl">Bill details</h1>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <LuNotebookText />
                  </span>
                  Items total
                </h1>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <MdDeliveryDining />
                  </span>
                  Delivery Charge
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">$25</span>FREE
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <GiShoppingBag />
                  </span>
                  Handling Charge
                </h1>
                <p className="text-red-500 font-semibold">$5</p>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-green-600">
                    🎉 Promo Discount
                  </h1>
                  <p className="text-green-600 font-semibold">
                    -${discount.toFixed(2)}
                  </p>
                </div>
              )}
              <hr className="text-gray-200 mt-2" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand total</h1>
                <p className="font-semibold text-lg">
                  ${(totalPrice + 5 - discount).toFixed(2)}
                </p>
              </div>
              <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                Apply promo code
              </h1>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="rounded-md w-full px-1"
                />
                <button
                  onClick={handlePromoCode}
                  className="bg-white text-black border border-gray-200 cursor-pointer p-1 rounded-md px-4"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p
                  className={`text-sm mt-1 ${discount > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {promoMessage}
                </p>
              )}
              <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-5xl text-muted mt-10">
            Oh no! Your cart is empty
          </h1>
          <img src={EmptyCart} alt="" className="w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 w-max text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Continue shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
