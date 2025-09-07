import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleGetOTP = () => {
    // Implement OTP logic here
    console.log("Fetching OTP for:", mobileNumber);
    
     navigate("/register");
    // You would typically call an API here to send an OTP
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <style jsx>{`
        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:url('https://pagedone.io/asset/uploads/1702362010.png');
          background-repeat: no-repeat;
          background-size: cover;
          opacity: 0.6;
        }

        .login-card {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* Background Image/Pattern */}
      <div className="background"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-sm mx-auto p-8 bg-white rounded-2xl login-card z-10">
        {/* Discount Box */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-orange-500 text-white text-xs font-semibold rounded-lg p-2 text-center shadow-lg">
          <p className="text-sm">Enjoy an Extra 10% Off on Your 1st Order!</p>
          <p className="mt-1">
            Web: Minimum ₹1599 purchase (Code: PTWELCOME10)
          </p>
          <p>App: No minimum purchase (Code: APPONLY)</p>
        </div>

        {/* Login/Register Header */}
        <div className="text-center mt-12 mb-8">
          <h2 className="text-xl font-light italic text-gray-700">
            Login/Register
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="mobile-number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter Mobile Number<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="tel"
              id="mobile-number"
              name="mobile-number"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            onClick={handleGetOTP}
            className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            GET OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
