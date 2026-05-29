import React, { lazy, Suspense } from 'react'
import Carousel from '../components/Carousel'
import CategorySection from '../components/CategorySection'

const MidBanner = lazy(() => import('../components/MidBanner'))
const TrendingNow = lazy(() => import('../components/TrendingNow'))
const Banner2 = lazy(() => import('../components/Banner2'))
const TopCategories = lazy(() => import('../components/TopCategories'))
const Features = lazy(() => import('../components/Features'))

const Home = () => {
  return (
    <div>
      <Carousel />
      <CategorySection />
      <Suspense fallback={null}>
        <MidBanner />
        <TrendingNow />
        <Banner2 />
        <TopCategories />
        <Features />
      </Suspense>
    </div>
  )
}

export default Home
