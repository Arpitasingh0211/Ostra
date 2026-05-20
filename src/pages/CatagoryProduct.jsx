import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../components/ProductListView";

const CatagoryProduct = () => {
  const { catagory } = useParams(); // ✅
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate()
  console.log(catagory); // ✅ will print category name

  const getFilterData = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${catagory}`,
      );
      const data = res.data.products;
      setSearchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterData();
  }, []);

  return (
    <div>
      {searchData.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4 ">
            <button  onClick={()=> navigate(-1)} className="bg-gray-800  mb-5 text-white px-2 py-1 cursor-pointer flex gap-1 items-center rounded"><ChevronLeft/> Back</button>
            {
                searchData.map((product, index) => {
                    return <ProductListView key={index} product={product}/>
                })
            }
        </div>
      ) : (
        <div className="flex items-center justify-center h=[400px]">
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

export default CatagoryProduct;
