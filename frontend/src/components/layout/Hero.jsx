import React, { useState } from 'react';
import heroImg from "../../assets/rabbit-hero.webp";

// Mock banner images for the hero section
const bannerImages = [
  'https://images.unsplash.com/photo-1745313452052-0e4e341f326c?q=80&w=1520&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://t4.ftcdn.net/jpg/06/53/63/33/360_F_653633323_Z1Pt1An3VP7eRzOCOlULIonWFRpbaC75.webp',
  'https://t4.ftcdn.net/jpg/09/58/94/69/240_F_958946972_Qw2iBqeFNvgo4nZfboqhh79lA7YpgLTn.jpg',
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    <div className="relative mt-20 w-full h-screen overflow-hidden ">
      {/* Background Image */}
      <img
        src={bannerImages[currentImageIndex]}
        alt={`Hero Banner ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
      />

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">NEW IN</h1>
        <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-colors duration-300">
          SHOP FRESH STYLES
        </button>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={handlePrev}
          className="p-2 bg-gray-800 bg-opacity-50 text-white rounded-full ml-4 focus:outline-none hover:bg-opacity-75 transition-colors"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={handleNext}
          className="p-2 bg-gray-800 bg-opacity-50 text-white rounded-full mr-4 focus:outline-none hover:bg-opacity-75 transition-colors"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero