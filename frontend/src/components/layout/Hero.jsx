import React, { useState, useEffect } from 'react';
// import heroImg from "../../assets/rabbit-hero.webp"; // Mocked asset, not used in logic

// Replacing previous placeholder links with high-quality, stable Unsplash links
const bannerImages = [
  'https://lh3.googleusercontent.com/gg-dl/AJfQ9KTtV2fDlggtVIiEKK8Z_DbImkc89aYCvoto1l5FXqDbWWcYghxXx0UiO8-H6ZAyb29VggwQlKccZ7PsSCmVYhM0XSoClnrpHGnxfOaUV4CP_0t0FGYsquAXYW2HDPAjJZp6JABZxR0CsSCCyBppAhW7IDNvqt9N7c9Z11nZqAx4ruYKKA=s1024-rj', // Modern apparel
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Outdoor lifestyle
  '', // Abstract/Stylish
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play loop fixed: uses functional update and empty dependency array for efficiency.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []); // Run effect only once on mount

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    // Height adjusted to 85vh for better screen utilization. Removed mt-20 since Navbar fixes are expected.
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden"> 
      
      {/* Background Image - Added onError handler for image loading failures */}
      <img
        src={bannerImages[currentImageIndex]}
        alt={`Hero Banner ${currentImageIndex + 1}`}
        // The duration-1000 and opacity keyframe ensures a smoother fade transition
        className="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out animate-fadeIn"
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop if fallback image also fails
          e.target.style.backgroundColor = '#6b7280'; // Fallback gray background
          console.error(`Error loading image at index ${currentImageIndex}:`, e.target.src);
        }}
      />
      
      {/* Styles for smooth fade transition */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }
      `}</style>


      {/* Hero Content Overlay - Centralized and Enhanced Readability */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4  bg-opacity-10"> 
        
        <div className="p-6 rounded-xl bg-opacity-5 border border-white/20 text-center shadow-2xl max-w-lg mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase mb-2 text-orange-300">New Collection</p>
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 drop-shadow-lg leading-tight">
            Elevate Your <span className="text-orange-500">Style</span>
          </h1>
          
          <button 
            className="group mt-4 bg-orange-500 text-white px-10 py-3 rounded-full font-bold uppercase text-sm 
                       shadow-xl hover:bg-white hover:text-orange-600 transition-all duration-300 
                       transform hover:scale-[1.03]"
          >
            SHOP FRESH STYLES
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Arrows - Styled for elegance and visibility */}
      <div className="absolute inset-y-0 w-full flex justify-between items-center px-4 md:px-8">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="p-3 bg-white/20 text-white rounded-full focus:outline-none hover:bg-white/40 transition-colors backdrop-blur-sm shadow-md"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="p-3 bg-white/20 text-white rounded-full focus:outline-none hover:bg-white/40 transition-colors backdrop-blur-sm shadow-md"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators - Made more prominent */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 p-2 rounded-full bg-black/30 backdrop-blur-sm">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
              index === currentImageIndex 
                ? 'bg-orange-500 w-6' // Active dot is wider and orange
                : 'bg-gray-300/80 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
