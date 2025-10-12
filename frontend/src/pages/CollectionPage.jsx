import React, { useState, useEffect } from "react";
import FilterSidebar from "./FilterSidebar";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productSlice";

const CollectionPage = () => {
  // const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const { collection: collectionName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({ collection: collectionName, ...queryParams })
    );
  }, [dispatch, collectionName, searchParams]);

  // Fetch products from backend
  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const query = new URLSearchParams(selectedFilters).toString();
  //     const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query}`);
  //     setProducts(data);
  //     setFilteredProducts(data); // initially all products
  //   } catch (err) {
  //     setError(err.message || "Failed to fetch products");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, [selectedFilters]); // refetch whenever filters change

  // Update selected filters
  // Update selected filters and sync to URL
  const handleFilterChange = (filterName, option) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (newFilters[filterName]?.includes(option)) {
        // Remove the option
        newFilters[filterName] = newFilters[filterName].filter(
          (item) => item !== option
        );
        if (newFilters[filterName].length === 0) delete newFilters[filterName];
      } else {
        // Add the option
        newFilters[filterName] = newFilters[filterName]
          ? [...newFilters[filterName], option]
          : [option];
      }

      // Build query params using multiple entries for the same key
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, values]) => {
        values.forEach((value) => {
          params.append(key.toLowerCase(), value); // lowercase key
        });
      });

      setSearchParams(params); // update URL
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  // Dynamic filtering logic (if you want extra frontend filtering)
  useEffect(() => {
    if (!products.length) return;
    let filtered = products.filter((product) => {
      for (const filterName in selectedFilters) {
        if (selectedFilters[filterName].length === 0) continue;
        let matches = false;
        const filterOptions = selectedFilters[filterName];

        switch (filterName) {
          case "CATEGORY":
            if (filterOptions.includes(product.category)) matches = true;
            break;
          case "GENDER":
            if (filterOptions.includes(product.gender)) matches = true;
            break;
          case "PRICE":
            filterOptions.forEach((option) => {
              const [min, max] = option.includes("Under")
                ? [0, 500]
                : option
                    .split(" - ")
                    .map((p) => parseInt(p.replace("₹", ""), 10));
              if (product.price >= min && product.price <= max) matches = true;
            });
            break;
          case "COLOR":
            if (filterOptions.includes(product.color)) matches = true;
            break;
          default:
            if (
              product[filterName.toLowerCase()] &&
              filterOptions.includes(product[filterName.toLowerCase()])
            )
              matches = true;
            break;
        }

        if (!matches) return false;
      }
      return true;
    });
    setFilteredProducts(filtered);
  }, [products, selectedFilters]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white mt-28 mb-4 min-h-screen font-sans">
      <div className="py-8 text-center">
        <h1 className="text-3xl font-serif font-light italic text-gray-800">
          Collections
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <FilterSidebar
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          clearAllFilters={clearAllFilters}
        />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600 font-medium">
              <span className="text-lg text-gray-900 font-semibold mr-1">
                {products.length}
              </span>
              Products
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium text-sm">SORT BY</span>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                value={searchParams.get("sort") || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const params = new URLSearchParams([...searchParams]);

                  if (value) {
                    params.set("sortBy", value); // add sort to query params
                  } else {
                    params.delete("sortBy"); // remove if empty
                  }

                  setSearchParams(params);
                }}
              >
                <option value="popularity">Best Selling</option>
                <option value="newest">Newest</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(selectedFilters).map(([filterName, options]) =>
              options.map((option, index) => (
                <span
                  key={`${filterName}-${index}`}
                  className="bg-gray-200 text-gray-800 text-sm font-medium py-1 px-3 rounded-full flex items-center space-x-1"
                >
                  <span>{option}</span>
                  <button
                    onClick={() => handleFilterChange(filterName, option)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col justify-end relative transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="relative">
                  {product.specialPrice && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold py-1 px-2 rounded-full z-10">
                      {product.specialPrice}
                    </span>
                  )}
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-4 text-center bg-gray-50 border-t border-gray-200">
                  <h3 className="text-base font-medium text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{`₹${product.price}`}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
