import React from "react";
import { ArrowRight } from "lucide-react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Catagory = () => {
  const { catagoryOnlyData } = getData();
  const navigate = useNavigate()

  return (
    <div className="max-w-full mx-10 items-center">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-[#21022c] mt-10 mb-10">Shop by Catagory</h1>
        <button
          onClick={() => navigate("/products")}
          className="mr-22 px-4 py-2 flex items-center gap-1 border-2 border-[#ebe5e5] rounded-4xl text-sm hover:bg-[#8B7CF6] hover:text-white cursor-pointer transition-all duration-300"
        >
          View All <ArrowRight className="h-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center grid grid-cols-7">
        {catagoryOnlyData?.map((CatItem, index) => (
          <div key={index}>
            <div className="py-2 rounded-2xl flex flex-col items-center gap-2">
              <img
                src={CatItem.thumbnail}
                alt="Ostra Category"
                className="h-[150px] w-[150px] rounded-2xl bg-blue-50 cursor-pointer hover:scale-105 transition-all"
                onClick={() => navigate(`/products?category=${CatItem.category}`)}
              />
              {/* ✅ Navigate with category in URL */}
              <button
                onClick={() => navigate(`/products?category=${CatItem.category}`)}
                className="text-purple-500 text-sm font-display cursor-pointer uppercase hover:bg-[#8d7cb4] hover:text-white transition-all duration-300 text-black px-3 py-1 rounded-xl"
              >
                {CatItem.category}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catagory;