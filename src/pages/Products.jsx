import React, { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'  // ✅ add this

const Products = () => {
  const { data, fetchAllProducts } = getData()
  const [searchParams] = useSearchParams()  // ✅ read URL params

  const [search, setSearch] = useState("")
  // ✅ Read category from URL, default to "all"
  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [brand, setBrand] = useState("all")
  const [priceRange, setPriceRange] = useState(10000)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchAllProducts()
  }, [])

  // ✅ When URL param changes, update category
  useEffect(() => {
    const urlCategory = searchParams.get("category")
    if (urlCategory) setCategory(urlCategory)
  }, [searchParams])

  const pageHandle = (selectedPage) => setPage(selectedPage)

  const filteredData = data?.filter((product) => {
    const matchSearch = product.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === "all" || product.category === category
    const matchBrand = brand === "all" || product.brand === brand
    const matchPrice = product.price <= priceRange
    return matchSearch && matchCategory && matchBrand && matchPrice
  })

  const handleBrandChange = (e) => setBrand(e.target.value)

  return (
    <div>
      <div className='max-w-6xl mx-auto px-4 mb-10'>
        {!data ? (
          <div className='flex items-center justify-center h-[400px]'>
            <DotLottieReact src="/loading.lottie" loop autoplay style={{ width: 200, height: 200 }} />
          </div>
        ) : data?.length > 0 ? (
          <div className='flex gap-8 relative top-20'>
            <FilterSection
              search={search}
              setSearch={setSearch}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              category={category}
              setCategory={setCategory}
              handleBrandChange={handleBrandChange}
              data={data}
            />
            <div className='grid grid-cols-4 gap-7 mt-10'>
              {filteredData?.length > 0 ? (
                filteredData.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
              ) : (
                <div className='col-span-4 flex items-center justify-center h-[400px]'>
                  <p>No products found</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center h-[400px]'>
            <p>No items found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products