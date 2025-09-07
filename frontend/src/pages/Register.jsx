import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']); // State for 5 separate OTP digits
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isOver18, setIsOver18] = useState(false);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();

  const otpRefs = useRef([]);
  
  // Generate a random 6-digit number for the CAPTCHA on component mount
  useEffect(() => {
    generateNewCaptcha();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  const generateNewCaptcha = () => {
    setCaptcha(Math.floor(100000 + Math.random() * 900000).toString());
    setAttempts(3);
  };
  
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input field
      if (value !== '' && index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Move to the previous input field on backspace if current field is empty
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleRegistration = () => {
    if (captchaInput !== captcha) {
      setMessage('Invalid CAPTCHA. Please try again.');
      setAttempts(attempts - 1);
      if (attempts - 1 === 0) {
        generateNewCaptcha();
      }
      return;
    }
    if (!isOver18) {
      setMessage('You must be over 18 to register.');
      return;
    }
    // Placeholder for registration logic
    const fullOtp = otp.join('');
    console.log('User registered with:', { title, firstName, lastName, email, fullOtp });
    setMessage('Registration successful!');
    navigate("/profile");
    // In a real app, you would send this data to a backend.
  };

  const handleResendOTP = () => {
    // Placeholder for OTP resend logic
    console.log('Resending OTP to:', email);
    setResendTimer(30);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100"
      style={{
        backgroundImage: "url('https://pagedone.io/asset/uploads/1702362010.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <style jsx>{`
        .login-card {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* Registration Card */}
      <div className="relative w-auto max-w-sm  mt-16 mx-auto p-8 bg-white rounded-2xl login-card z-10">
        
        {/* Discount Box */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-orange-500 text-white text-xs font-semibold rounded-lg p-2 text-center shadow-lg">
          <p className="text-sm">Enjoy an Extra 10% Off on Your 1st Order!</p>
          <p className="mt-1">Web: Minimum ₹1599 purchase (Code: PTWELCOME10)</p>
          <p>App: No minimum purchase (Code: APPONLY)</p>
        </div>

        {/* Header */}
        <div className="text-center mt-6 mb-8">
          <h2 className="text-xl font-light italic text-gray-700">Registration</h2>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Title Radio Buttons */}
          <div className="flex justify-start space-x-6 mb-4">
            <label className="inline-flex items-center">
              <input type="radio" name="title" value="Mr." checked={title === 'Mr.'} onChange={(e) => setTitle(e.target.value)} className="form-radio text-orange-500"/>
              <span className="ml-2 text-gray-700">Mr.</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="title" value="Mrs." checked={title === 'Mrs.'} onChange={(e) => setTitle(e.target.value)} className="form-radio text-orange-500"/>
              <span className="ml-2 text-gray-700">Mrs.</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="title" value="Ms." checked={title === 'Ms.'} onChange={(e) => setTitle(e.target.value)} className="form-radio text-orange-500"/>
              <span className="ml-2 text-gray-700">Ms.</span>
            </label>
          </div>

          {/* First & Last Name */}
          <div className="flex space-x-2 mb-4">
            <div className="w-1/2">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input type="text" id="first-name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>
            <div className="w-1/2">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" id="last-name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>
          </div>

          {/* Email ID */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email ID*</label>
            <input type="email" id="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
          </div>

          {/* New phone number section */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Please enter the code sent to you on your email.</p>
            <p className="text-center font-bold text-lg">
              9460831794 
              <a href="#" className="text-orange-500 hover:underline ml-2">edit?</a>
            </p>
          </div>

          {/* OTP Section (new design) */}
          <div className="mb-4">
            <div className="flex justify-between space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  maxLength="1"
                  ref={(el) => otpRefs.current[index] = el}
                  className="w-12 h-12 text-2xl border border-gray-300 rounded-md shadow-sm text-center focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">{attempts} Attempts remaining</p>
              <button type="button" onClick={handleResendOTP} className="text-sm text-orange-500 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={resendTimer > 0}>
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </div>
          </div>

          {/* CAPTCHA and Age Check */}
          <div className="mb-4">
            <div className="flex flex-col items-center space-y-2 mb-2">
              <div className="bg-gray-200 px-6 py-3 rounded-md font-bold text-2xl text-gray-800">{captcha}</div>
              <input type="text" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="Enter shown text" />
            </div>
            <label className="inline-flex items-center">
              <input type="checkbox" checked={isOver18} onChange={(e) => setIsOver18(e.target.checked)} className="form-checkbox text-orange-500 rounded-md" />
              <span className="ml-2 text-sm text-gray-700">I am over 18 years of age. I agree to <a href="#" className="text-orange-500 hover:underline">Terms & Conditions</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a></span>
            </label>
          </div>
          
          {/* Message for user feedback */}
          {message && <p className={`mt-2 text-sm text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleRegistration}
            className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            START SHOPPING
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
