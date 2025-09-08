import React from 'react';
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const product = {
    image: 'https://placehold.co/300x400/E8DED1/000000?text=Shirt',
    name: 'Medium Grey Solid Casual Full Sleeves Mandarin Collar Men Slim Fit Casual Shirts',
    price: 1199,
  };
  const navigate = useNavigate();

  const bagTotal = product.price;
  const shippingCharge = bagTotal >= 1000 ? 0 : 100;
  const totalPayableAmount = bagTotal + shippingCharge;

  const goToPrevPage = () => {
    navigate("/bag");
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      {/* Back to previous page */}
      <div className="max-w-7xl mx-auto mb-6">
        <button onClick={goToPrevPage} className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="text-xl font-semibold">Checkout</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Section: Order Details */}
        <div className="md:col-span-2 space-y-4">
          
          {/* Address Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-gray-800">ADDRESS(1)</h2>
              <button className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200">CHANGE</button>
            </div>
            <p className="text-sm text-gray-700 font-medium">Home : <span className="font-normal">VICKY 1\Kiroli Kund, Jhunjhunu, Rajasthan, 333307</span></p>
            <p className="text-sm text-gray-700 font-medium">Mobile : <span className="font-normal">6378141023</span></p>
          </div>

          {/* Delivery Estimates Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4">DELIVERY ESTIMATES</h2>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-24 h-32 md:w-28 md:h-36 bg-gray-200 rounded-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium text-sm md:text-base">PEOPLE</h3>
                <p className="mt-1 text-gray-600 text-xs md:text-sm">{product.name}</p>
                <div className="mt-4 flex flex-col space-y-2">
                  <div className="p-4 border-2 border-orange-500 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <input type="radio" name="delivery" id="standard" className="text-orange-500 h-4 w-4" defaultChecked />
                      <label htmlFor="standard" className="font-medium text-sm">Standard Delivery</label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 ml-6">Delivery by Fri, 12 Sep</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section (Placeholder) */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-base font-semibold text-gray-800">PAYMENT</h2>
          </div>

          {/* Proceed to Pay Button (Mobile View) */}
          <div className="md:hidden mt-6 text-center">
            <button className="w-full py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-md font-semibold transition-colors duration-200">
              PROCEED TO PAY
            </button>
          </div>

        </div>

        {/* Right Section: Order Summary */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit md:sticky md:top-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary (1 item)</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Bag Total</span>
              <span>₹{bagTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping Charges*</span>
              <span className="text-green-500">{shippingCharge === 0 ? 'FREE' : `₹${shippingCharge.toFixed(2)}`}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total Payable Amount</span>
              <span>₹{totalPayableAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">(including tax)</p>
            <button className="w-full py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-md font-semibold transition-colors duration-200">
              PROCEED TO PAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
