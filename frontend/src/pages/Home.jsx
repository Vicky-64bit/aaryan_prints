import React, { useEffect, useState } from "react";
import Hero from "../components/layout/Hero";
import NewArrivals from "../components/products/NewArrivals";
import Recommendations from "../components/products/Recommendations";
import { useDispatch, useSelector } from "react-redux";

// import products from '../components/common/products';
import ProductGrid from "../components/products/ProductGrid";
import ProductDetails from "../components/products/ProductDetails";
import { fetchProductsByFilters } from "../redux/slice/productSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch product for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 12,
      })
    );
    // Fetch the best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );

        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className="pt-4">
      <Hero />
      <NewArrivals products={products} />
      <Recommendations />
      {/* Best Seller  */}
      <div className="mt-20">
        <h2 className="text-2xl text-center font-medium mb-4">Best Seller</h2>
        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <p className="text-center">Loading best seller product</p>
        )}
      </div>

      <div className="mt-20">
        <h2 className="text-2xl text-center font-medium mb-4">
          You May Also Like
        </h2>

        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <div className="mt-15">
        <h2 className="text-2xl text-center font-medium mb-4">
          More Like This
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <div className="mt-15">
        <h2 className="text-2xl text-center font-medium mb-4">
          Frequently Bought Together
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Home;
