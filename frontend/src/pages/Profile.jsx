import React, { useState } from 'react';
import { BiUser, BiHeart, BiMap, BiCreditCard, BiListOl, BiInfoCircle, BiSupport, BiLogOut } from 'react-icons/bi';

// Component for the Profile Details content
const MyProfileContent = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="text-xl font-medium mb-4 italic">Profile Details</h3>
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-gray-500">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.85-1.76a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
        <div>
          <p className="text-gray-500">Name</p>
          <p className="font-medium">Vicky Swami</p>
        </div>
        <div>
          <p className="text-gray-500">Gender</p>
          <p className="font-medium">Male</p>
        </div>
        <div>
          <p className="text-gray-500">Email Address</p>
          <p className="font-medium">vickyswami9460@gmail.com</p>
        </div>
        <div>
          <p className="text-gray-500">Mobile Number</p>
          <p className="font-medium">+91 9876543210</p>
        </div>
      </div>
    </div>
    <button className="px-6 py-2 bg-orange-500 text-white font-medium rounded-full shadow hover:bg-orange-600 transition-colors">
      My Profile
    </button>
  </div>
);

// Component for the My Orders content
const MyOrdersContent = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="text-xl font-medium mb-4 italic">My Orders</h3>
    <p className="text-gray-500 mb-2">You have 2 recent orders.</p>
    <div className="border rounded-lg p-4 mb-4">
      <p className="font-semibold text-lg">Order #PANTS-202345</p>
      <p className="text-sm text-gray-600">Items: 1 T-shirt, 1 pair of jeans</p>
      <p className="text-sm text-gray-600">Status: Shipped</p>
      <p className="text-sm text-gray-600">Date: Sept 1, 2025</p>
    </div>
    <div className="border rounded-lg p-4 mb-4">
      <p className="font-semibold text-lg">Order #PANTS-987654</p>
      <p className="text-sm text-gray-600">Items: 2 hoodies</p>
      <p className="text-sm text-gray-600">Status: Delivered</p>
      <p className="text-sm text-gray-600">Date: Aug 25, 2025</p>
    </div>
  </div>
);

// Component for the Wishlist content
const WishlistContent = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="text-xl font-medium mb-4 italic">My Wishlist</h3>
    <p className="text-gray-500 mb-2">You have 3 items in your wishlist.</p>
    <div className="flex items-center justify-between p-4 mb-2 border rounded-lg">
      <p className="font-medium">Blue Cotton T-shirt</p>
      <button className="text-orange-500 hover:underline text-sm">Add to Cart</button>
    </div>
    <div className="flex items-center justify-between p-4 mb-2 border rounded-lg">
      <p className="font-medium">High-Waisted Jeans</p>
      <button className="text-orange-500 hover:underline text-sm">Add to Cart</button>
    </div>
    <div className="flex items-center justify-between p-4 mb-2 border rounded-lg">
      <p className="font-medium">Leather Jacket</p>
      <button className="text-orange-500 hover:underline text-sm">Add to Cart</button>
    </div>
  </div>
);

// Component for the Addresses content
const AddressesContent = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="text-xl font-medium mb-4 italic">My Addresses</h3>
    <p className="text-gray-500 mb-2">Your saved addresses:</p>
    <div className="border rounded-lg p-4 mb-4">
      <p className="font-semibold">Home Address</p>
      <p className="text-sm text-gray-600">1, Kirodi Kund, Kirodi, Nawalgarh 333307</p>
    </div>
    <div className="border rounded-lg p-4 mb-4">
      <p className="font-semibold">Work Address</p>
      <p className="text-sm text-gray-600">1, Kirodi Kund, Kirodi, Nawalgarh 333307</p>
    </div>
  </div>
);

// Component for Customer Care content
const CustomerCareContent = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-medium mb-4 italic">Customer Care</h3>
      <p className="text-gray-500 mb-2">How can we help you today? Please find our contact details below:</p>
      <div className="border rounded-lg p-4 mb-4">
        <p className="font-semibold">Email Us:</p>
        <p className="text-sm text-gray-600">support@aaryanprints.com</p>
      </div>
      <div className="border rounded-lg p-4 mb-4">
        <p className="font-semibold">Call Us:</p>
        <p className="text-sm text-gray-600">+91-9876543210</p>
      </div>
    </div>
);

// Main Profile component
const Profile = () => {
  const [activeLink, setActiveLink] = useState('My Profile');

  const contentMap = {
    'My Profile': <MyProfileContent />,
    'My Orders': <MyOrdersContent />,
    'Wishlist': <WishlistContent />,
    'Addresses': <AddressesContent />,
    'Customer Care': <CustomerCareContent />,
  };

  const navItems = [
    { name: 'My Orders', icon: <BiListOl className="text-lg" /> },
    { name: 'Wishlist', icon: <BiHeart className="text-lg" /> },
    { name: 'Account & Information', icon: <BiInfoCircle className="text-lg" /> },
    { name: 'Addresses', icon: <BiMap className="text-lg" /> },
    { name: 'Saved Cards', icon: <BiCreditCard className="text-lg" /> },
    { name: 'Customer Care', icon: <BiSupport className="text-lg" /> },
  ];

  const handleLogout = () => {
    // Placeholder for actual logout logic
    alert('Logging out...');
  };

  return (
    <div className="bg-gray-100 mt-24 mb-4 min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center p-6 border-b border-gray-200">
          {/* Avatar with Camera Icon */}
          <div className="relative">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-gray-500">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.85-1.76a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
                <path d="M14.5 14.5a3 3 0 10-3-3 3 3 0 003 3zM18 10a8 8 0 11-16 0 8 8 0 0116 0zM12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-semibold ml-6 text-gray-800">Welcome, Vicky!</h1>
        </div>
        {/* Main Content Area */}
        <div className="flex">
          {/* Sidebar */}
          <nav className="w-64 p-6 bg-white border-r border-gray-200">
            <ul className="space-y-2">
              <li
                onClick={() => setActiveLink('My Profile')}
                className={`py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeLink === 'My Profile' ? 'bg-orange-50 text-orange-500 font-medium' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                My Profile
              </li>
              {navItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActiveLink(item.name)}
                  className={`flex items-center py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeLink === item.name ? 'bg-orange-50 text-orange-500 font-medium' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </li>
              ))}
              <li
                onClick={handleLogout}
                className="flex items-center py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 text-gray-700 hover:bg-gray-100"
              >
                <span className="mr-3"><BiLogOut className="text-lg" /></span>
                Logout
              </li>
            </ul>
          </nav>

          {/* Main Panel */}
          <main className="flex-1 p-8 bg-gray-50">
            {contentMap[activeLink] || <div>Page not found.</div>}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
