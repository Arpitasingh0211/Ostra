import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  // fetch all products from API
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=200");
      // console.log(res)
      const productsData = res.data.products;
      setData(productsData);
    } catch (error) {
      console.log(error);
    }
  };

  const getUniqueCatagory = (data) => {
    if (!data) return [];
    let newVal = data.filter(
      (curElem, index, arr) =>
        arr.findIndex((item) => item.category === curElem.category) === index,
    );
    return newVal;
  };

  const getUniqueBrand = (data) => {
  if(!data) return []
  let newVal = data
    .filter(item => item.brand) 
    .filter(
      (curElem, index, arr) =>
        arr.findIndex((item) => item.brand === curElem.brand) === index,
    );
  return newVal;
};

  const catagoryOnlyData = getUniqueCatagory(data);
  const brandOnlyData = getUniqueBrand(data);
  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        catagoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const getData = () => useContext(DataContext);
