import React, { useState, useRef, useEffect } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../../redux/slice/productSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
    // Focus management for better accessibility
    if (isOpen) {
      setSearchTerm("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    dispatch(setFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };

  return (
    // 1. Full-width Container (Handles the button when closed)
    <div className="w-auto flex items-center justify-center">
      
      {/* 2. Full Overlay When Open */}
      {isOpen ? (
        <div 
          // KEY CHANGE 1: Use a very high Z-index (e.g., z-[500] or z-50) 
          // to ensure it sits above everything, including your main navbar.
          // KEY CHANGE 2: Ensure it is 'fixed' to cover the whole viewport top.
          className="fixed top-0 left-0 w-full z-[500] bg-white shadow-lg py-3 px-4 sm:px-8"
        >
          {/* The form uses your main container classes to align its content with the rest of the Navbar */}
          <form
            onSubmit={handleSearch}
            // Use 'container' and 'mx-auto' to constrain the content horizontally
            className="container mx-auto flex items-center justify-end" 
          >
            
            {/* Input Wrapper */}
            <div className="relative flex-grow max-w-2xl">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 px-4 py-2 pl-12 rounded-full focus:ring-orange-500 focus:border-orange-500 focus:outline-none w-full text-base placeholder:text-gray-500"
                autoFocus
              />
              
              {/* Search Icon */}
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500"
              >
                <HiMagnifyingGlass className="h-5 w-5" />
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleSearchToggle}
              className="text-gray-500 hover:text-red-500 transition duration-150 p-2 ml-4"
            >
              <HiMiniXMark className="h-7 w-7" />
            </button>
          </form>
        </div>
      ) : (
        // 3. Initial Search Button
        <button onClick={handleSearchToggle} className="p-1">
          <HiMagnifyingGlass className="h-6 w-6 text-orange-500 hover:text-orange-600 transition" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;