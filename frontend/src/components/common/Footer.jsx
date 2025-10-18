import React, { useState } from "react";
// React Icons
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { FaTshirt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  // Define a primary color for highlights
  const ACCENT_COLOR_CLASS = "text-indigo-600 hover:text-indigo-700";

  // State for newsletter subscription feedback
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState(''); // State to clear the input

  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real app, you'd send the email here
    
    setSubscribed(true);
    setEmail(''); // Clear the input field upon success
    setTimeout(() => setSubscribed(false), 3000); // reset after 3s
  };

  return (
    // Applied a subtle shadow for better definition against the background
    <footer className="w-[95%] mx-auto bg-gradient-to-r from-indigo-50 via-white to-pink-50 rounded-3xl p-8 shadow-xl relative overflow-hidden">
      
      {/* Main Grid Container */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-4 lg:px-0">
        
        {/* 1. Brand & Newsletter */}
        <div>
          {/* Brand Section - Added shadow for depth */}
          <div className="flex items-center text-xl font-bold text-gray-900 mb-6 drop-shadow-sm">
            <FaTshirt className={`mr-2 h-6 w-6 ${ACCENT_COLOR_CLASS}`} />
            <span>Aaryan Prints</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Crafting fashion with passion & style. Stay updated with our latest collections and offers!
          </p>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={email} // Controlled input
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-full text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 text-sm rounded-r-lg font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
              disabled={subscribed} // Disable button while success message is showing
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {subscribed && (
            <p className="text-green-600 mt-2 text-sm font-medium animate-fadeIn">
              <span role="img" aria-label="Tada emoji">🎉</span> Successfully subscribed!
            </p>
          )}
        </div>

        {/* 2. Shop Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-semibold">Shop</h3>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link to="/shop/mens-top-wear" className={`hover:underline transition-all ${ACCENT_COLOR_CLASS}`}>
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="/shop/womens-top-wear" className={`hover:underline transition-all ${ACCENT_COLOR_CLASS}`}>
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="/shop/mens-bottom-wear" className={`hover:underline transition-all ${ACCENT_COLOR_CLASS}`}>
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="/shop/womens-bottom-wear" className={`hover:underline transition-all ${ACCENT_COLOR_CLASS}`}>
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Support Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-semibold">Support</h3>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link to="/contact" className={`hover:underline transition-all ${ACCENT_COLOR_CLASS}`}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className={`hover:underline transition-all ${ACCENT_COLOR_CLASS}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className={`hover:underline transition-all ${ACCENT_COLOR_CLASS}`}>
                FAQ's
              </Link>
            </li>
            <li>
              <Link to="/features" className={`hover:underline transition-all ${ACCENT_COLOR_CLASS}`}>
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Follow Us & Contact */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-semibold">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="https://www.facebook.com/aaryanprints"
              target="_blank"
              rel="noopener noreferrer" // Added noreferrer for security
              className="text-gray-600 hover:text-blue-700 hover:scale-110 transition-transform duration-200"
              aria-label="Follow us on Facebook"
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/aaryanprints"
              target="_blank"
              rel="noopener noreferrer" // Added noreferrer for security
              className="text-gray-600 hover:text-pink-600 hover:scale-110 transition-transform duration-200"
              aria-label="Follow us on Instagram"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.twitter.com/aaryanprints"
              target="_blank"
              rel="noopener noreferrer" // Added noreferrer for security
              className="text-gray-600 hover:text-black hover:scale-110 transition-transform duration-200"
              aria-label="Follow us on X (Twitter)"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>

          <p className="text-gray-500 mb-2 text-sm font-medium">Call Us Anytime</p>
          <p className="text-lg font-bold text-gray-800">
            <a
              href="tel:0123-456-789"
              // Applied ACCENT_COLOR_CLASS to text for consistency
              className={`inline-flex items-center hover:scale-105 transition-all ${ACCENT_COLOR_CLASS}`}
            >
              <FiPhoneCall className="mr-2 h-5 w-5" />
              0123-456-789
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom (Copyright) */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-300 pt-6 text-center">
        <p className="text-gray-500 text-xs tracking-wide">
          &copy; {new Date().getFullYear()}, Aaryan Prints. All Rights Reserved.
        </p>
      </div>

      {/* Back to Top Button - Added a subtle pulse animation for visibility */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-indigo-500 text-white p-3 rounded-full shadow-xl hover:bg-indigo-700 hover:scale-110 transition-all z-50 animate-pulse-slow"
        aria-label="Back to top"
      >
        <span className="text-xl font-bold">↑</span>
      </button>

      {/* Note: Tailwind CSS requires these custom animations to be defined in tailwind.config.js */}
      {/* For the animate-pulse-slow and animate-fadeIn classes to work, ensure your tailwind.config.js has:
        theme: {
          extend: {
            keyframes: {
              'pulse-slow': {
                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.8, transform: 'scale(1.05)' },
              },
              fadeIn: {
                '0%': { opacity: 0, transform: 'translateY(5px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            },
            animation: {
              'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              'fadeIn': 'fadeIn 0.5s ease-out forwards',
            }
          }
        }
      */}
    </footer>
  );
};

export default Footer;