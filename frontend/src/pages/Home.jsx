import React from 'react'
import Hero from '../components/layout/Hero'
import NewArrivals from '../components/products/NewArrivals';
import Recommendations from '../components/products/Recommendations';
import ProductDetails from '../components/products/ProductDetails';


const Home = () => {
  return (
    <div>
        <Hero />
        <NewArrivals />
        <Recommendations />
        <ProductDetails />
    </div>
  )
}

export default Home;