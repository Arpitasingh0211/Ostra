import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import axios from "axios";
import EmptyCart from "../assets/EmptyCart.jpg";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItem, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

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
    if (!isSignedIn)
      return toast.error("Please login first!", {
        hideProgressBar: isMobile,
        autoClose: 1500,
        transition: isMobile ? undefined : undefined,
      });

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

        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );

          const addr = res.data.address;

          setFormData((prev) => ({
            ...prev,
            address: `${addr.road || ""} ${
              addr.suburb || addr.neighbourhood || ""
            }`.trim(),
            state: addr.state || "",
            postCode: addr.postcode || "",
            country: addr.country || "",
          }));
        } catch (err) {
          toast.error("Could not fetch location.", {
            hideProgressBar: isMobile,
            autoClose: 1500,
          });
        } finally {
          setDetecting(false);
        }
      },
      () => {
        toast.error("Location access denied.", {
          hideProgressBar: isMobile,
          autoClose: 1500,
        });
        setDetecting(false);
      },
    );
  };

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handlePromoCode = () => {
    if (!isSignedIn) 
      return toast.error("Please login to apply promo code!", {
      hideProgressBar: isMobile,
      autoClose: 1500,
    });
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
        setPromoMessage("✅ $20 discount applied!");

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

  if (cartItem.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold text-gray-400 text-center">
          Your cart is empty
        </h1>

        <img
          src={EmptyCart}
          alt="Empty Cart"
          className="w-52 sm:w-64 opacity-70"
        />

        <button
          onClick={() => navigate("/products")}
          className="
            mt-2
            px-6 py-3
            rounded-xl
            text-sm font-semibold
            text-white
            border-none
            cursor-pointer
            hover:opacity-90
            transition-all
          "
          style={{ background: "#1a1a2e" }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pt-20 md:pt-30 pt-30 pb-16 ">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          {/* <button
            onClick={() => navigate(-1)}
            className="
              flex items-center gap-1
              text-sm text-gray-500
              hover:text-[#1a1a2e]
              cursor-pointer
              transition-colors
            "
          >
            <IoArrowBackOutline className="text-lg" />
            Back
          </button> */}

          <div className="h-4 w-px bg-gray-200" />

          <h1 className="text-lg sm:text-xl font-bold text-[#1a1a2e]">
            My Cart
            <span className="ml-2 text-sm font-medium text-gray-400">
              ({cartItem.length} {cartItem.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        {/* MAIN */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-5 w-full">
            {/* CART ITEMS */}
            <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 flex flex-col gap-4">
              {cartItem.map((item) => (
                <div
                  key={item.id}
                  className="
                    p-3 sm:p-4
                    rounded-2xl
                    border border-gray-100
                    hover:bg-gray-50
                    transition-all
                  "
                >
                  {/* TOP */}
                  <div className="flex gap-3 sm:gap-4">
                    {/* IMAGE */}
                    <div
                      onClick={() => navigate(`/products/${item.id}`)}
                      className="
                        w-24 h-24
                        sm:w-28 sm:h-28
                        rounded-xl
                        bg-gray-50
                        border border-gray-100
                        overflow-hidden
                        shrink-0
                        cursor-pointer
                      "
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <p
                          onClick={() => navigate(`/products/${item.id}`)}
                          className="
                            text-sm sm:text-[15px]
                            font-semibold
                            text-gray-800
                            line-clamp-2
                            cursor-pointer
                            hover:text-[#1a1a2e]
                            transition-colors
                          "
                        >
                          {item.title}
                        </p>

                        <p className="text-xs text-gray-400 capitalize mt-1">
                          {item.category}
                        </p>
                      </div>

                      {/* QUANTITY */}
                      <div className="flex items-center mt-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="
                            w-8 h-8
                            bg-gray-100
                            border border-gray-200
                            rounded-l-lg
                            flex items-center justify-center
                            text-gray-600
                            hover:bg-gray-200
                            cursor-pointer
                            transition-all
                          "
                        >
                          −
                        </button>

                        <span
                          className="
                            w-10 h-8
                            border-t border-b border-gray-200
                            flex items-center justify-center
                            text-sm font-semibold
                            bg-white
                          "
                        >
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="
                            w-8 h-8
                            bg-gray-100
                            border border-gray-200
                            rounded-r-lg
                            flex items-center justify-center
                            text-gray-600
                            hover:bg-gray-200
                            cursor-pointer
                            transition-all
                          "
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Total Price</span>

                      <span className="text-lg font-bold text-[#1a1a2e]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-red-50
                        text-red-500
                        hover:bg-red-100
                        transition-all
                        flex items-center justify-center
                        cursor-pointer
                      "
                    >
                      <FaRegTrashAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DELIVERY INFO */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-800">
                  Delivery Info
                </h2>

                {isSignedIn && (
                  <button
                    onClick={handleAutoFill}
                    className="
                      text-xs font-medium
                      text-white
                      px-3 py-1.5
                      rounded-lg
                      border-none
                      cursor-pointer
                      hover:opacity-90
                    "
                    style={{ background: "#1a1a2e" }}
                  >
                    Fill My Details
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    label: "Full Name",
                    name: "fullName",
                    placeholder: "Enter your name",
                  },
                  {
                    label: "Phone",
                    name: "phone",
                    placeholder: "Enter phone number",
                  },
                  {
                    label: "Address",
                    name: "address",
                    placeholder: "Enter address",
                  },
                  {
                    label: "State",
                    name: "state",
                    placeholder: "Enter state",
                  },
                  {
                    label: "Post Code",
                    name: "postCode",
                    placeholder: "Enter post code",
                  },
                  {
                    label: "Country",
                    name: "country",
                    placeholder: "Enter country",
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={field.name === "address" ? "sm:col-span-2" : ""}
                  >
                    <label className="text-xs text-gray-500 mb-1 block">
                      {field.label}
                    </label>

                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="
                        w-full h-10
                        px-3
                        text-sm
                        border border-gray-200
                        rounded-lg
                        bg-gray-50
                        outline-none
                        focus:border-[#1a1a2e]
                      "
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={handleDetectLocation}
                  disabled={detecting}
                  className="
                    flex-1
                    h-10
                    p-2
                    text-xs font-medium
                    border border-gray-200
                    rounded-lg
                    bg-gray-50
                    hover:bg-gray-100
                    cursor-pointer
                  "
                >
                  {detecting ? "Detecting..." : "📍 Detect Location"}
                </button>

                <button
                  className="
                    flex-1
                    h-10
                    p-2
                    text-xs font-semibold
                    text-white
                    rounded-lg
                    border-none
                    cursor-pointer
                  "
                  style={{ background: "#1a1a2e" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              w-full
              lg:w-[340px]
              shrink-0
              lg:sticky
              lg:top-24
            "
          >
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
              <h2 className="text-sm font-bold text-gray-800">Order Summary</h2>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <LuNotebookText className="text-gray-400" />
                    Items total
                  </span>

                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <MdDeliveryDining className="text-gray-400" />
                    Delivery
                  </span>

                  <span className="font-medium text-green-600">
                    <span className="line-through text-gray-400 mr-1 text-xs">
                      $25
                    </span>
                    FREE
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <GiShoppingBag className="text-gray-400" />
                    Handling
                  </span>

                  <span className="font-medium">$5.00</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600">🎉 Promo Discount</span>

                    <span className="font-medium text-green-600">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="h-px bg-gray-100" />

              {/* PROMO */}
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Promo Code
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="
                      flex-1
                      h-10
                      px-3
                      text-xs
                      border border-gray-200
                      rounded-lg
                      bg-gray-50
                      outline-none
                    "
                  />

                  <button
                    onClick={handlePromoCode}
                    className="
                      px-4
                      h-10
                      text-xs font-semibold
                      border border-gray-200
                      rounded-lg
                      bg-gray-50
                      hover:bg-gray-100
                      cursor-pointer
                    "
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p
                    className={`text-xs mt-1.5 ${
                      discount > 0 ? "text-green-500" : "text-red-400"
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </div>

              <div className="h-px bg-gray-100" />

              {/* TOTAL */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">
                  Grand Total
                </span>

                <span className="text-xl font-bold text-gray-900">
                  ${(totalPrice + 5 - discount).toFixed(2)}
                </span>
              </div>

              <button
                className="
                  w-full
                  h-11
                  rounded-xl
                  text-sm 
                  font-semibold
                  text-white
                  border-none
                  cursor-pointer
                  hover:opacity-90
                  transition-all
                "
                style={{ background: "#1a1a2e" }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
