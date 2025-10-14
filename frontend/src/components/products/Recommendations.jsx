import React, { useState, useRef, useEffect } from 'react';
// ICONS: Replaced react-icons imports with inline SVG for reliable compilation.

// Mock product data to populate the carousel
const products = [
  {
    id: 1,
    image: 'https://placehold.co/400x500/FEE3C1/3B3B3B?text=Heels',
    offer: 'Flat 50%',
    title: 'FOREVER GLAM',
    description: 'Cream Tone-tone Slingback Pointed Heel Sandals',
    price: '₹ 1899',
  },
  {
    id: 2,
    image: 'https://placehold.co/400x500/F2F2F2/3B3B3B?text=Polo+Top',
    offer: 'Flat 50%',
    title: 'AJILE',
    description: 'White Striped Johnny Polo Cropped Rugby Top',
    price: '₹ 1199',
  },
  {
    id: 3,
    image: 'https://placehold.co/400x500/E9DFF3/3B3B3B?text=Kurta',
    offer: 'Flat 50%',
    title: 'RANGMANCH',
    description: 'Purple Foil Print A-line Peplum Kurta',
    price: '₹ 1299',
  },
  {
    id: 4,
    image: 'https://placehold.co/400x500/C1E7FE/3B3B3B?text=Kurta',
    offer: 'Flat 50%',
    title: 'RANGMANCH',
    description: 'Beige Watercolour Floral Print A-line Kurta',
    price: '₹ 1299',
  },
  {
    id: 5,
    image: 'https://placehold.co/400x500/FFF9C1/3B3B3B?text=Kurta',
    offer: 'Flat 50%',
    title: 'MARIGOLD LANE',
    description: 'Yellow Wall Print Layered Collar A-line Kurta',
    price: '₹ 1699',
  },
  {
    id: 6,
    image: 'https://placehold.co/400x500/F9DEE5/3B3B3B?text=Dress',
    offer: 'Flat 50%',
    title: 'RANGMANCH',
    description: 'Pink Floral Print Flared Dress',
    price: '₹ 1499',
  },
  {
    id: 7,
    image: 'https://placehold.co/400x500/3A3A3A/D1D1D1?text=Heels',
    offer: 'Flat 50%',
    title: 'FOREVER GLAM',
    description: 'Black Suede Pointed Toe Heels',
    price: '₹ 1999',
  },
];


const Recommendations = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Start with desktop default
  const totalItems = products.length;
  
  // 🔹 Update itemsPerPage on window resize (from user reference)
  useEffect(() => {
    const updateItemsPerPage = () => {
      // 1 item per view up to sm breakpoint (mobile)
      if (window.innerWidth < 640) {
        setItemsPerPage(1); 
      // 2 items per view for sm breakpoint (small tablet/large phone)
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2); 
      // 3 items per view for md breakpoint (tablet)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3); 
      // 4 items per view for lg breakpoint (desktop)
      } else {
        setItemsPerPage(4); 
      }
    };

    updateItemsPerPage(); // run on mount
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []); // Empty array ensures this runs once

  
  // Recalculate limits based on current itemsPerPage state
  const maxScrollIndex = totalItems - itemsPerPage;
  const canScrollNext = startIndex < maxScrollIndex;
  const canScrollPrev = startIndex > 0;

  const handleNext = () => {
    // Scrolls by the number of visible items
    if (canScrollNext) { 
      setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, maxScrollIndex));
    }
  };

  const handlePrev = () => {
    // Scrolls back by the number of visible items, capped at 0
    if (canScrollPrev) {
      setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
    }
  };
  
  // Products visible based on responsive itemsPerPage
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);
  
  // Calculate the offset percentage for CSS translation
  // We need to calculate how much to shift the entire track so the first visible item is at the start.
  // The card width is 1/4 (25%), 1/3 (33.33%), 1/2 (50%), or 1/1 (100%).
  // This is no longer necessary since we only render the visible slice.
  // We will instead use a simple flex row for the rendered slice.

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans ">
      <div className="container mx-auto max-w-7xl">

        {/* Header Section */}
        <div className="flex justify-center items-center relative mb-12">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Recommended For You</h2>
            <p className="text-base text-gray-500 mt-2">Based on your recent browsing and purchase history.</p>
          </div>
          
          {/* View All Button (Styled with brand color) */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-orange-600 border border-orange-600 px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap hover:bg-orange-600 hover:text-white transition duration-300 shadow-md">
            View All
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          
          {/* Unified Product View (Responsive Grid + JS Navigation) */}
          <div 
            // This single container handles all screens. It shows only `itemsPerPage` products.
            className="flex w-full space-x-4 transition-transform duration-500 ease-in-out py-2"
          >
            {visibleProducts.map(product => (
              <div
                key={product.id}
                // Tailwind classes for responsive width: 1 item (w-full), 2 items (sm:w-1/2), 
                // 3 items (md:w-1/3), 4 items (lg:w-1/4).
                // Subtracting space-x-4 gap from w-x/y needs careful calculation in production,
                // but for a clean grid layout, we use these simple fractions combined with p-2 padding.
                className={`flex-shrink-0 p-2 transition-all duration-500 w-full sm:w-1/2 md:w-1/3 lg:w-1/4`}
              >
                <div 
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden 
                               hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  
                  {/* Product Image and Icons */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Offer Tag */}
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {product.offer}
                    </div>
                    
                    {/* Hover Icons (View and Wishlist) */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white rounded-full shadow-xl text-gray-700 hover:text-orange-500 transition-colors">
                        {/* Inline SVG for Eye (View) */}
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-xl text-gray-700 hover:text-red-500 transition-colors">
                        {/* Inline SVG for Heart (Wishlist) */}
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 text-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-orange-500">{product.title}</h3>
                    <p className="mt-1 text-sm font-medium text-gray-700 truncate">{product.description}</p>
                    <p className="mt-2 text-xl font-extrabold text-gray-900">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows (Visible on all screens based on available items) */}
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            // Visible only if canScrollPrev is true
            className={`absolute top-1/2 -left-3 transform -translate-y-1/2 z-20 p-3 bg-white text-gray-800 rounded-full shadow-xl hover:bg-gray-100 transition-opacity duration-300 ${!canScrollPrev ? 'opacity-0 cursor-default' : 'opacity-100'}`}
            aria-label="Previous Products"
            disabled={!canScrollPrev}
          >
            {/* Inline SVG for Chevron Left */}
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            // Visible only if canScrollNext is true
            className={`absolute top-1/2 -right-3 transform -translate-y-1/2 z-20 p-3 bg-white text-gray-800 rounded-full shadow-xl hover:bg-gray-100 transition-opacity duration-300 ${!canScrollNext ? 'opacity-0 cursor-default' : 'opacity-100'}`}
            aria-label="Next Products"
            disabled={!canScrollNext}
          >
            {/* Inline SVG for Chevron Right */}
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
