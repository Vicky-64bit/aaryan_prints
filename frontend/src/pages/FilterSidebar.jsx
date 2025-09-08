import React, { useState } from 'react';


const filters = [
  { name: 'BRAND', options: ['RANGMANCH', 'SneakPeak', 'DenimPro', 'AaryanPrints'] },
  { name: 'CATEGORY', options: ['Dress', 'Kurta', 'Formal Shoes', 'Hoodie', 'Heels', 'Flip Flops'] },
  { name: 'PRICE', options: ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000'] },
  { name: 'GENDER', options: ['Men', 'Women', 'Unisex'] },
  { name: 'SIZES', options: ['S', 'M', 'L', 'XL'] },
  { name: 'DISCOUNT', options: ['10% and Above', '20% and Above', '30% and Above'] },
  { name: 'OCCASION', options: ['Formal', 'Casual', 'Party', 'Wedding'] },
  { name: 'COLOR', options: ['Black', 'Brown', 'White', 'Blue', 'Red'] },
];

const FilterSidebar = ({ selectedFilters, handleFilterChange, clearAllFilters }) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  return (
    <>
      {/* Filter Toggle for small screens */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <button
          className="flex items-center text-sm font-medium text-gray-700 p-2 rounded-md bg-white shadow-sm"
          onClick={() => setIsDrawerOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h6m-3 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0" />
          </svg>
          Filter
        </button>
      </div>

      {/* Sidebar for Filters (on desktop) and Drawer (on mobile) */}
      <div
  className={`${
    isDrawerOpen ? "fixed inset-0 z-40 flex" : "hidden md:block"
  } md:relative md:w-1/4`}
>
  {/* Overlay */}
  {isDrawerOpen && (
    <div
      className="absolute inset-0 bg-white bg-opacity-80 transition-opacity duration-300"
      onClick={() => setIsDrawerOpen(false)}
    ></div>
  )}

  {/* Drawer */}
  <div className="relative w-3/4 max-w-sm h-full bg-white shadow-lg p-4 overflow-y-auto md:w-full md:max-w-none md:h-auto md:rounded-lg md:shadow-sm md:static">
    {/* Drawer Content (unchanged) */}

        {isDrawerOpen && (
          <div className="absolute inset-0 bg-white bg-opacity-50 transition-opacity duration-300" onClick={() => setIsDrawerOpen(false)}></div>
        )}
        <div className="relative w-full max-w-sm h-full bg-white md:w-full md:max-w-none md:h-auto md:bg-transparent md:static transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">FILTER BY</h2>
            <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsDrawerOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              className="text-sm font-medium text-orange-500 hover:text-orange-600 hidden md:block"
              onClick={clearAllFilters}
            >
              CLEAR ALL
            </button>
          </div>
          <div className="space-y-4">
            {filters.map((filter, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full flex justify-between items-center py-3 text-gray-700 hover:text-orange-500 transition-colors duration-200"
                  onClick={() => toggleFilter(filter.name)}
                >
                  <span className="font-medium text-sm">{filter.name}</span>
                  {openFilter === filter.name ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </button>
                {openFilter === filter.name && (
                  <div className="pb-3 pl-2 space-y-2">
                    {filter.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <input 
                          type="checkbox" 
                          id={`${filter.name}-${optIndex}`} 
                          className="rounded-sm text-orange-500 focus:ring-orange-500"
                          checked={selectedFilters[filter.name]?.includes(option) || false}
                          onChange={() => handleFilterChange(filter.name, option)} 
                        />
                        <label htmlFor={`${filter.name}-${optIndex}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="w-full py-2 flex items-center justify-center text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h6m-3 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0" />
              </svg>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default FilterSidebar;