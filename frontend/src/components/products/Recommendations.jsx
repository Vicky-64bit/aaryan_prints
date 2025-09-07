import React, { useState } from 'react';

// Mock product data to populate the carousel
const products = [
  {
    id: 1,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+1',
    offer: 'Flat 50%',
    title: 'FOREVER GLAM',
    description: 'Cream Tone-tone Slingback Pointed Heel Sandals',
    price: '₹ 1899',
  },
  {
    id: 2,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+2',
    offer: 'Flat 50%',
    title: 'AJILE',
    description: 'White Striped Johnny Polo Cropped Rugby Top',
    price: '₹ 1199',
  },
  {
    id: 3,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+3',
    offer: 'Flat 50%',
    title: 'RANGMANCH',
    description: 'Purple Foil Print A-line Peplum Kurta',
    price: '₹ 1299',
  },
  {
    id: 4,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+4',
    offer: 'Flat 50%',
    title: 'RANGMANCH',
    description: 'Beige Watercolour Floral Print A-line Kurta',
    price: '₹ 1299',
  },
  {
    id: 5,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+5',
    offer: 'Flat 50%',
    title: 'MARIGOLD LANE',
    description: 'Yellow Wall Print Layered Collar A-line Kurta',
    price: '₹ 1699',
  },
  {
    id: 6,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+6',
    offer: 'Flat 50%',
    title: 'RANGMANCH',
    description: 'Pink Floral Print Flared Dress',
    price: '₹ 1499',
  },
  {
    id: 7,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+7',
    offer: 'Flat 50%',
    title: 'FOREVER GLAM',
    description: 'Black Suede Pointed Toe Heels',
    price: '₹ 1999',
  },
];


const Recommendations = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const totalItems = products.length;

  const handleNext = () => {
    if (startIndex + itemsPerPage < totalItems) {
      setStartIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prevIndex => prevIndex - 1);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="py-2 px-4 lg:px-0 mb-[2px] bg-white flex justify-center items-center w-screen h-fit">
      <div className="w-[95%] flex justify-center items-center h-fit  bg-gray-200 font-sans text-gray-800 p-4">
        <div className="w-full max-w-7xl mx-2 bg-gray-200">
            <div className="relative mb-10">
          {/* Title and Subtitle */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-light mb-2">Recommended For You</h2>
            <p className="text-sm text-gray-500">Based On Your Recent Activity</p>
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg text-sm font-semibold text-gray-800 px-6 py-2 whitespace-nowrap">
    View All
  </button>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Previous Arrow Button */}
            <button
              onClick={handlePrev}
              className={`absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg ${startIndex === 0 ? 'hidden' : ''}`}
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Product Cards Container */}
            <div className="flex space-x-2.5 overflow-hidden py-2">
              {visibleProducts.map(product => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[24.5%] max-w-xs bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 "
                >
                  {/* Product Image and Icons */}
                  <div className="relative h-auto">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[300px] object-cover rounded-t-xl"
                    />
                    {/* Offer Tag */}
                    <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                      {product.offer}
                    </div>
                    {/* Icons */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-2">
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
                          className="w-4 h-4 text-gray-600 group-hover:text-red-500"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-xs font-semibold uppercase text-gray-400">{product.title}</h3>
                    <p className="mt-1 text-sm">{product.description}</p>
                    <p className="mt-2 text-lg font-bold">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Arrow Button */}
            <button
              onClick={handleNext}
              className={`absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg ${startIndex + itemsPerPage >= totalItems ? 'hidden' : ''}`}
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Recommendations;
