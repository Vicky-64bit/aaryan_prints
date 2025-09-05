import React from 'react'
import Hero from '../components/layout/Hero'
import NewArrivals from '../components/products/NewArrivals';
import Recommendations from '../components/products/Recommendations';


const Home = () => {
  return (
    <div>
        <Hero />
        <NewArrivals />
        <Recommendations />
        <Recommendations />
        <Recommendations />
    </div>
  )
}

export default Home;