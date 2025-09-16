import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import products from '../components/common/products';
import { Link } from 'react-router-dom';




const CollectionPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (filterName, option) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[filterName]?.includes(option)) {
        newFilters[filterName] = newFilters[filterName].filter(item => item !== option);
        if (newFilters[filterName].length === 0) {
          delete newFilters[filterName];
        }
      } else {
        newFilters[filterName] = newFilters[filterName] ? [...newFilters[filterName], option] : [option];
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };
  
  const filteredProducts = products.filter(product => {
    for (const filterName in selectedFilters) {
      if (selectedFilters[filterName].length === 0) continue;
      
      let matches = false;
      const filterOptions = selectedFilters[filterName];

      switch(filterName) {
        case 'CATEGORY':
          if (filterOptions.includes(product.category)) {
            matches = true;
          }
          break;
        case 'GENDER':
          if (filterOptions.includes(product.gender)) {
            matches = true;
          }
          break;
        case 'PRICE':
          filterOptions.forEach(option => {
            const [min, max] = option.includes('Under') ? [0, 500] : option.split(' - ').map(p => parseInt(p.replace('₹', ''), 10));
            if (product.price >= min && product.price <= max) {
              matches = true;
            }
          });
          break;
        case 'COLOR':
          // Assuming product has a color property for this example
          if (filterOptions.includes(product.color)) {
            matches = true;
          }
          break;
        default:
          // For other simple string-based filters like BRAND, SIZES, etc.
          // This assumes the product object has a property with the same name as the filter
          if (product[filterName.toLowerCase()] && filterOptions.includes(product[filterName.toLowerCase()])) {
            matches = true;
          }
          break;
      }

      if (!matches) {
        return false;
      }
    }
    return true;
  });


  return (
    <div className="bg-white mt-28 mb-4 min-h-screen font-sans">
      <div className="py-8 text-center">
        <h1 className="text-3xl font-serif font-light italic text-gray-800">Collections</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        
        {/* Sidebar for Filters (on desktop) and Drawer (on mobile) */}
        <FilterSidebar
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          clearAllFilters={clearAllFilters}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {/* Top Bar for Product Count and Sorting */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600 font-medium">
              <span className="text-lg text-gray-900 font-semibold mr-1">{filteredProducts.length}</span>
              Products
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium text-sm">SORT BY</span>
              <select className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm">
                <option>Best Selling</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(selectedFilters).map(([filterName, options]) =>
              options.map((option, index) => (
                <span key={`${filterName}-${index}`} className="bg-gray-200 text-gray-800 text-sm font-medium py-1 px-3 rounded-full flex items-center space-x-1">
                  <span>{option}</span>
                  <button onClick={() => handleFilterChange(filterName, option)} className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col justify-end relative transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="relative">
                  {product.specialPrice && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold py-1 px-2 rounded-full z-10">
                      {product.specialPrice}
                    </span>
                  )}
                  <img src={product.images[0].url} alt={product.name} className="w-full h-auto" />
                </div>
                <div className="p-4 text-center bg-gray-50 border-t border-gray-200">
                  <h3 className="text-base font-medium text-gray-800">{product.name}</h3>
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
