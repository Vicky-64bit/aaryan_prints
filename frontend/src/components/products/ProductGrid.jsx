import React, { useEffect, useState } from "react";

const ProductGrid = ({ products = [] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // 🔹 Update itemsPerPage on window resize
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // mobile
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2); // small screens
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3); // tablets
      } else {
        setItemsPerPage(4); // desktop
      }
    };

    updateItemsPerPage(); // run on mount
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalItems = products.length;

  const handleNext = () => {
    if (startIndex + itemsPerPage < totalItems) {
      setStartIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="relative">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className={`absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg ${
            startIndex === 0 ? "hidden" : ""
          }`}
          aria-label="Previous"
        >
           <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>

        </button>

        {/* Products */}
        <div className="flex space-x-2.5 overflow-hidden pr-6 py-2">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="group flex-shrink-0 
                         w-full sm:w-1/2 md:w-1/3 lg:w-1/4 
                         max-w-xs 
                         bg-white rounded-xl shadow-lg 
                         hover:shadow-xl transition-transform duration-300 
                         transform hover:scale-105"
            >
              <div className="relative h-auto">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[300px] object-cover rounded-t-xl"
                  />
                ) : (
                  <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 text-gray-500 rounded-t-xl">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                  {product.offer}
                </div>
                {/* Action Icons (Eye + Heart) */}
    <div className="absolute top-2 right-2  flex flex-col space-y-2
        opacity-100 sm:opacity-0 sm:group-hover:opacity-100
        transition-opacity">
      {/* View / Eye Icon */}
      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-gray-600"
        >
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      </button>

      {/* Heart / Wishlist Icon */}
      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-200 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-gray-600 hover:text-red-500"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
              </div>

              <div className="p-4">
                <h3 className="text-xs font-semibold uppercase text-gray-400">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm">{product.description}</p>
                <p className="mt-2 text-lg font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className={`absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg ${
            startIndex + itemsPerPage >= totalItems ? "hidden" : ""
          }`}
          aria-label="Next"
        >
           <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>

        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
