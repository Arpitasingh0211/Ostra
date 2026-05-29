// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { IoArrowBackOutline } from "react-icons/io5";
// import ProductListView from "../components/ProductListView";

// const CatagoryProduct = () => {
//   const { catagory } = useParams();
//   const [searchData, setSearchData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const getFilterData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `https://dummyjson.com/products/category/${catagory}`
//       );
//       setSearchData(res.data.products);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getFilterData();
//     window.scrollTo(0, 0);
//   }, [catagory]);

//   return (
//     <div className="min-h-screen bg-gray-50 pt-24 pb-16 md:pt-25">
//       <div className="max-w-4xl mx-auto px-6">

//         {/* Back + Header */}
//         <div className="flex items-center gap-4 mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a1a2e] cursor-pointer transition-colors"
//           >
//             <IoArrowBackOutline className="text-lg" />
            
//           </button>
//           <div className="h-4 w-px bg-gray-200 " />
//           <div>
//             <h1 className="text-xl font-bold text-[#1a1a2e] capitalize">
//               {catagory.replace(/-/g, " ")}
//             </h1>
//             {!loading && (
//               <p className="text-xs text-gray-400 mt-0.5">
//                 {searchData.length} products found
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Content */}
//         {loading ? (
//           <div className="flex items-center justify-center h-[400px]">
//             <DotLottieReact
//               src="/loading.lottie"
//               loop
//               autoplay
//               style={{ width: 200, height: 200 }}
//             />
//           </div>
//         ) : searchData.length > 0 ? (
//           <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 ">
//             {searchData.map((product, index) => (
//               <ProductListView key={index} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-[400px] gap-3">
//             <span className="text-5xl">🔍</span>
//             <p className="text-gray-500 font-medium">No products found</p>
//             <button
//               onClick={() => navigate("/")}
//               className="text-sm text-[#1a1a2e] underline cursor-pointer"
//             >
//               Go back home
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CatagoryProduct;
