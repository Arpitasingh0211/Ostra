import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const CatagoryProduct = lazy(() => import("./pages/CatagoryProduct"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-8 h-8 border-4 border-[#1a1a2e] border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const [location, setLocation] = useState();
  const [openDropDown, setOpenDropDown] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const res = await axios.get(url);
        setLocation(res.data.address);
        setOpenDropDown(false);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropDown={openDropDown}
        setOpenDropDown={setOpenDropDown}
      />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/category/:catagory" element={<CatagoryProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
