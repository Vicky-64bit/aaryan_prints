import React from 'react'
import Hero from '../components/layout/Hero'
import NewArrivals from '../components/products/NewArrivals';
import Recommendations from '../components/products/Recommendations';

import products from '../components/common/products';
import ProductGrid from '../components/products/ProductGrid';


const Home = () => {
  return (
    <div>
        <Hero />
        <NewArrivals  products={products} />
        <Recommendations />
        <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
                You May Also Like
            </h2>
            
            <ProductGrid products={ products }/>
            </div>

            <div className="mt-15">
            <h2 className="text-2xl text-center font-medium mb-4">
                More Like This
            </h2>
            <ProductGrid products={ products }/>
        </div>
            <div className="mt-15">
            <h2 className="text-2xl text-center font-medium mb-4">
                Frequently Bought Together
            </h2>
            <ProductGrid products={ products }/>
        </div>
    
    </div>
  )
}

export default Home;