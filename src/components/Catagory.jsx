import React, { useEffect } from "react";
import OstraCatagoryImage from "../assets/OstraCatagoryImage.jpeg";
import { ArrowRight } from "lucide-react";
import { getData } from "../context/DataContext";
const Catagory = () => {
  const { data, fetchAllProducts } = getData();
  // const getUniqueCatagory = (data, property) => {
  //   let newVal = data?.map((curElem) => {
  //     return curElem[property]
  //   })
  //   newVal = [...new Set(newVal)]
  //   return newVal
  // }
  const getUniqueCatagory = (data) => {
    let newVal = data.filter(
      (curElem, index, arr) =>
        arr.findIndex((item) => item.category === curElem.category) === index,
    );
    return newVal;
  };
  const catagoryOnlyData = getUniqueCatagory(data);
  console.log(catagoryOnlyData);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    // <div className="flex flex-col justify-center items-center">
    // <div className=" w-[88%]">
    //   <div className="flex justify-between items-center  w-full">
    //     <h1 className="text-4xl font-bold text-[#21022c] my-10">
    //       Shop by Catagory
    //     </h1>
    //     <button className="flex items-center gap-1 mr-2 border-2 border-[#edecf3] px-4 py-2 rounded-4xl text-sm hover:bg-[#8B7CF6] hover:text-white cursor-pointer transition-all duration-300">
    //       View all <ArrowRight className="h-4"/>
    //     </button>
    //   </div>
    //   <div className="flex gap-6 flex-wrap mb-10">
    //     <div className="border-3 border-[#edecf3] p-5 rounded-2xl flex flex-col items-center gap-2">
    //       <img
    //         src={OstraCatagoryImage}
    //         alt="Ostra Category"
    //         className="h-[180px] w-[180px] rounded-2xl "
    //       />
    //       <h4 className="font-bold text-[#21022c]">Hair Care</h4>
    //       <p className="text-gray-600">Stronger, heaithier hair</p>
    //     </div>
    //     <div className="border-3 border-[#edecf3] p-5 rounded-2xl flex flex-col items-center gap-2">
    //       <img
    //         src={OstraCatagoryImage}
    //         alt="Ostra Category"
    //         className="h-[180px] w-[180px] rounded-2xl "
    //       />
    //       <h4 className="font-bold text-[#21022c]">Hair Care</h4>
    //       <p className="text-gray-600">Stronger, heaithier hair</p>
    //     </div>
    //     <div className="border-3 border-[#edecf3] p-5 rounded-2xl flex flex-col items-center gap-2">
    //       <img
    //         src={OstraCatagoryImage}
    //         alt="Ostra Category"
    //         className="h-[180px] w-[180px] rounded-2xl "
    //       />
    //       <h4 className="font-bold text-[#21022c]">Hair Care</h4>
    //       <p className="text-gray-600">Stronger, heaithier hair</p>
    //     </div>
    //     <div className="border-3 border-[#edecf3] p-5 rounded-2xl flex flex-col items-center gap-2">
    //       <img
    //         src={OstraCatagoryImage}
    //         alt="Ostra Category"
    //         className="h-[180px] w-[180px] rounded-2xl "
    //       />
    //       <h4 className="font-bold text-[#21022c]">Hair Care</h4>
    //       <p className="text-gray-600">Stronger, heaithier hair</p>
    //     </div>
    //     <div className="border-3 border-[#edecf3] p-5 rounded-2xl flex flex-col items-center gap-2">
    //       <img
    //         src={OstraCatagoryImage}
    //         alt="Ostra Category"
    //         className="h-[180px] w-[180px] rounded-2xl "
    //       />
    //       <h4 className="font-bold text-[#21022c]">Hair Care</h4>
    //       <p className="text-gray-600">Stronger, heaithier hair</p>
    //     </div>
    //     <div className="border-3 border-[#edecf3] p-5 rounded-2xl flex flex-col items-center gap-2">
    //       <img
    //         src={OstraCatagoryImage}
    //         alt="Ostra Category"
    //         className="h-[180px] w-[180px] rounded-2xl "
    //       />
    //       <h4 className="font-bold text-[#21022c]">Hair Care</h4>
    //       <p className="text-gray-600">Stronger, heaithier hair</p>
    //     </div>
    //   </div>
    // </div>
    // </div>

    <div className="max-w-full mx-10 0 items-center">
      <div className="flex justify-between items-center ">
          <h1 className=" text-4xl font-bold text-[#21022c] mt-10 mb-10">
            Shop by Catagory
          </h1>
          <button className="mr-22 px-4 py-2 flex items-center gap-1 border-2 border-[#ebe5e5] px-4 py-2 rounded-4xl text-sm hover:bg-[#8B7CF6] hover:text-white cursor-pointer transition-all duration-300">View All <ArrowRight className="h-4"/></button>
        </div>
      <div className="flex flex-wrap gap-4 justify-center  grid grid-cols-7 ">
        {catagoryOnlyData.map((CatItem, index) => {
          return (
            <div className="">
            <div
              key={index}
              className=" px2 py-2 rounded-2xl flex flex-col items-center gap-2 bg"
            >
              <img
                src={CatItem.thumbnail}
                alt="Ostra Category"
                className="h-[150px] w-[150px] rounded-2xl  bg-blue-50"
              />
              <button className="text-purple-500 text-sm font-display cursor-pointer uppercase  hover:bg-[#8d7cb4] hover:text-white transition-all duration-300 text-black px-3 py-1 rounded-xl">
                {CatItem.category}
              </button>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catagory;
