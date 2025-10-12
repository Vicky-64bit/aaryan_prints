import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [newArrivals, setNewArrivals] = useState([]);
  useEffect(()=>{
    const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
      setNewArrivals(response.data);
    } catch (error) {
      console.error(error);      
    }
  };
  fetchNewArrivals();
  }, []);
  


  // 🔹 Responsive items per page
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

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [newArrivals]);

  const totalItems = newArrivals.length;

  const handleNext = () => {
    if (startIndex + itemsPerPage < totalItems) {
      setStartIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
    }
  };

  const visibleProducts = newArrivals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="my-4 lg:px-0">
      <div className="bg-white flex justify-center items-center w-screen h-fit">
        <div className="w-full flex justify-center items-center h-fit font-sans text-gray-800">
          <div className="w-full max-w-7xl bg-white">
            {/* Title and Subtitle */}
            <div className="relative mb-10 text-center">
              <h2 className="text-4xl font-light mb-2">Explore New Arrivals</h2>
              <p className="text-sm text-gray-500">Get the latest styles</p>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg text-sm font-semibold text-gray-800 px-6 py-2 whitespace-nowrap">
                View All
              </button>
            </div>

            {/* Carousel */}
            <div className="relative">
              {/* Prev Arrow */}
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
             
                <div className="flex space-x-2.5 overflow-x-hidden py-2 pr-6">
                  {visibleProducts.map((product) => (
                    <Link
                    to={`/product/${product._id}`}
                      key={product.id}
                      className="group flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                    > 
                    
                      <div className="relative h-auto">
                        <img
                          src={product.images[0]?.url}
                          alt={product.title}
                          className="w-full h-[300px] object-cover  rounded-t-xl"
                        />
                        <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                          {product.offer}
                        </div>
                        {/* Icons */}
                        <div
                          className="absolute top-2 right-2 flex flex-col space-y-2
                                   opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        >
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
                          {product.brand}
                        </h3>
                        <p className="mt-1 text-sm">{product.description}</p>
                        <p className="mt-2 text-lg font-bold">
                          {product.price}
                        </p>
                      </div>
                    </Link>
                  ))} 
                </div>
             
              {/* Next Arrow */}
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
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
