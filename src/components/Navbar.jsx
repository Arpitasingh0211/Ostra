import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React, { useState, useEffect, useRef } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { IoSearchOutline, IoArrowBackOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import "./SearchBox.css";
import { useCart } from "../context/CartContext";
import { getData } from "../context/DataContext";

const SEARCH_PLACEHOLDERS = [
  "Search Lipstick...",
  "Search Fragrance...",
  "Search Skincare...",
  "Search Perfume...",
  "Search Moisturizer...",
];

const Navbar = ({ location, getLocation }) => {
  const { cartItem } = useCart();
  const { data } = getData();
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [slideState, setSlideState] = useState("visible");

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideState("exit");
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
        setSlideState("enter");
      }, 350);
      setTimeout(() => {
        setSlideState("visible");
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim() || !data) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const normalize = (str) => str.toLowerCase().replace(/[-\s]+/g, "");
    const q = normalize(searchQuery);
    const results = data
      .filter((p) => {
        const title = normalize(p.title);
        const category = normalize(p.category || "");
        const brand = normalize(p.brand || "");
        return title.includes(q) || category.includes(q) || brand.includes(q);
      })
      .slice(0, 6);
    setSearchResults(results);
    setShowDropdown(true);
  }, [searchQuery, data]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleResultClick = (id) => {
    navigate(`/products/${id}`);
    setSearchQuery("");
    setShowDropdown(false);
    setIsFocused(false);
  };

  const placeholderTransitionStyle = {
    visible: { opacity: 1, transform: "translateY(0px)", transition: "opacity 0.3s ease, transform 0.3s ease" },
    exit: { opacity: 0, transform: "translateY(-12px)", transition: "opacity 0.35s ease, transform 0.35s ease" },
    enter: { opacity: 0, transform: "translateY(12px)", transition: "none" },
  };

  const SearchDropdown = () =>
    showDropdown ? (
      <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div
              key={product.id}
              onClick={() => handleResultClick(product.id)}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <img src={product.thumbnail} alt={product.title} className="w-9 h-9 rounded-md object-cover bg-gray-100 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{product.title}</p>
                <p className="text-xs text-gray-500">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-5 text-center text-sm text-gray-400">No item found</div>
        )}
      </div>
    ) : null;

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">

      {/* ── DESKTOP (lg+) — single row ── */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-8 h-16 items-center gap-8">

        <Link to="/" className="shrink-0">
          <span className="text-2xl font-bold text-[#1a1a2e] tracking-tight">Ostra</span>
        </Link>

        <div className="flex items-center gap-1 cursor-pointer shrink-0" onClick={getLocation} title="Click to refresh">
          <IoLocationOutline className="text-gray-500 text-base shrink-0" />
          <span className="text-sm text-gray-700 max-w-[160px] truncate">
            {location ? `${location.city || location.town || location.village || ""}, ${location.state || ""}` : "Detecting..."}
          </span>
        </div>

        <div className="relative flex-1 max-w-xl" ref={searchRef}>
          <div className="ostra-search-box flex items-center rounded-lg bg-gray-100/50 px-3 h-10 gap-2 cursor-text" onClick={() => inputRef.current?.focus()}>
            <div className="relative flex-1 h-full overflow-hidden">
              {!isFocused && !searchQuery && (
                <span className="absolute inset-0 flex items-center text-sm text-gray-400 pointer-events-none select-none" style={placeholderTransitionStyle[slideState]}>
                  {SEARCH_PLACEHOLDERS[placeholderIndex]}
                </span>
              )}
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { setIsFocused(true); if (searchQuery) setShowDropdown(true); }}
                onBlur={() => { if (!searchQuery) setIsFocused(false); }}
                className="ostra-search-input absolute inset-0 w-full text-sm text-gray-900"
              />
            </div>
            <IoSearchOutline className="text-gray-500 text-lg shrink-0" />
          </div>
          <SearchDropdown />
        </div>

        <div className="flex items-center gap-5 ml-auto shrink-0">
          <SignedOut>
            <SignInButton>
              <button className="text-sm font-medium text-gray-700 hover:text-[#1a1a2e] cursor-pointer bg-transparent border-none transition-colors">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn><UserButton /></SignedIn>
          <Link to="/wishlist" className="flex items-center">
            <AiOutlineHeart className="text-2xl text-gray-700 hover:text-[#1a1a2e] transition-colors cursor-pointer" />
          </Link>
          <Link to="/cart" className="relative flex items-center">
            <HiOutlineShoppingBag className="text-2xl text-gray-700 hover:text-[#1a1a2e] transition-colors cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-[#1a1a2e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {cartItem.length}
            </span>
          </Link>
        </div>
      </div>

      {/* ── TABLET (md) — two rows ── */}
      <div className="hidden md:flex lg:hidden flex-col px-5 pt-3 pb-2 gap-1">

        {/* Row 1: Logo left | Icons right */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Link to="/">
              <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">Ostra</span>
            </Link>
            {/* Location sits directly below logo */}
            <div className="flex items-center gap-1 cursor-pointer mt-0.5" onClick={getLocation} title="Click to refresh">
              <IoLocationOutline className="text-gray-400 text-xs shrink-0" />
              <span className="text-xs text-gray-500 max-w-[180px] truncate">
                {location ? `${location.city || location.town || location.village || ""}, ${location.state || ""}` : "Detecting..."}
              </span>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <button className="text-sm font-medium text-gray-700 hover:text-[#1a1a2e] cursor-pointer bg-transparent border-none transition-colors">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn><UserButton /></SignedIn>
            <Link to="/wishlist" className="flex items-center">
              <AiOutlineHeart className="text-2xl text-gray-700 hover:text-[#1a1a2e] transition-colors cursor-pointer" />
            </Link>
            <Link to="/cart" className="relative flex items-center">
              <HiOutlineShoppingBag className="text-2xl text-gray-700 hover:text-[#1a1a2e] transition-colors cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-[#1a1a2e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {cartItem.length}
              </span>
            </Link>
          </div>
        </div>

        {/* Row 2: Back arrow + Search bar */}
        <div className="flex items-center gap-2 mt-1" ref={searchRef}>
         {currentLocation.pathname !== "/" && (
  <button
    onClick={() => navigate(-1)}
    className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 hover:bg-gray-200 transition-colors cursor-pointer border-none"
  >
    <IoArrowBackOutline className="text-gray-600 text-base" />
  </button>
)}

          <div className="relative flex-1">
            <div className="ostra-search-box border-none flex items-center rounded-lg px-3 h-10 gap-2 bg-gray-100/50 cursor-text" onClick={() => inputRef.current?.focus()}>
              <div className="relative flex-1 h-full overflow-hidden border-none">
                {!isFocused && !searchQuery && (
                  <span className="absolute inset-0 flex items-center text-sm text-gray-400  pointer-events-none select-none" style={placeholderTransitionStyle[slideState]}>
                    {SEARCH_PLACEHOLDERS[placeholderIndex]}
                  </span>
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { setIsFocused(true); if (searchQuery) setShowDropdown(true); }}
                  onBlur={() => { if (!searchQuery) setIsFocused(false); }}
                  className="ostra-search-input absolute inset-0 w-full text-sm text-gray-900"
                />
              </div>
              <IoSearchOutline className="text-gray-500 text-lg shrink-0" />
            </div>
            <SearchDropdown />
          </div>
        </div>
      </div>

      {/* ── MOBILE (< md) — same as before ── */}
      <div className="flex md:hidden flex-col px-4 pt-3 pb-2 gap-1">

        {/* Row 1: Logo | Icons */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Link to="/">
              <span className="text-xl font-bold text-[#1a1a2e] tracking-tight">Ostra</span>
            </Link>
            <div className="flex items-center gap-1 cursor-pointer mt-0.5" onClick={getLocation}>
              <IoLocationOutline className="text-gray-400 text-xs shrink-0" />
              <span className="text-xs text-gray-500 max-w-[160px] truncate">
                {location ? `${location.city || location.town || location.village || ""}, ${location.state || ""}` : "Detecting..."}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <button className="text-sm font-medium text-gray-700 cursor-pointer bg-transparent border-none">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn><UserButton /></SignedIn>
            <Link to="/wishlist">
              <AiOutlineHeart className="text-2xl text-gray-700" />
            </Link>
            <Link to="/cart" className="relative">
              <HiOutlineShoppingBag className="text-2xl text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-[#1a1a2e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {cartItem.length}
              </span>
            </Link>
          </div>
        </div>

        {/* Row 2: Back arrow + Search */}
        <div className="flex items-center gap-2 mt-1" ref={searchRef}>
          {currentLocation.pathname !== "/" && (
  <button
    onClick={() => navigate(-1)}
    className="w-10 h-10 rounded-lg bg-gray-100/50 flex items-center justify-center shrink-0 hover:bg-gray-200 transition-colors cursor-pointer border-none"
  >
    <IoArrowBackOutline className="text-gray-600 text-base" />
  </button>
)}
          <div className="relative flex-1">
            <div className="ostra-search-box flex items-center rounded-lg bg-gray-100/50 px-3 h-10 gap-2 cursor-text" onClick={() => inputRef.current?.focus()}>
              <div className="relative flex-1 h-full overflow-hidden">
                {!isFocused && !searchQuery && (
                  <span className="absolute inset-0 flex items-center text-sm text-gray-400 pointer-events-none select-none" style={placeholderTransitionStyle[slideState]}>
                    {SEARCH_PLACEHOLDERS[placeholderIndex]}
                  </span>
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { setIsFocused(true); if (searchQuery) setShowDropdown(true); }}
                  onBlur={() => { if (!searchQuery) setIsFocused(false); }}
                  className="ostra-search-input absolute inset-0 w-full text-sm text-gray-900"
                />
              </div>
              <IoSearchOutline className="text-gray-500 text-lg shrink-0" />
            </div>
            <SearchDropdown />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
