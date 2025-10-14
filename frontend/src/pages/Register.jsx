import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slice/authSlice";
import { mergeCart } from '../redux/slice/cartSlice';

const Register = () => {
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '']); // OTP digits
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isOver18, setIsOver18] = useState(false);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [resendTimer, setResendTimer] = useState(30);

  const otpRefs = useRef([]);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {user, guestId} = useSelector((state)=> state.auth);
  const {cart} = useSelector((state)=> state.cart);

  //Get redirect parameter and check if it's checkout o something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(()=>{
    if(user){
      if(cart?.products.length > 0 && guestId){
        dispatch(mergeCart({guestId, user})).then(() => {
          navigate(isCheckoutRedirect ? "/checkout": "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout": "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);



  const { loading } = useSelector(state => state.auth);

  useEffect(() => { generateNewCaptcha(); }, []);

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
      if (value !== '' && index < otp.length - 1) otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', mobile || email);
    setResendTimer(30);
  };

  const handleRegistration = async () => {
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      setMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password) {
      setMessage('Please enter a password.');
      return;
    }
    if (captchaInput !== captcha) {
      setMessage('Invalid CAPTCHA. Please try again.');
      setAttempts(prev => prev - 1);
      if (attempts - 1 <= 0) generateNewCaptcha();
      return;
    }
    if (!isOver18) {
      setMessage('You must be over 18 to register.');
      return;
    }
    if (!firstName || !email) {
      setMessage('Please fill all required fields.');
      return;
    }

    try {
      const fullOtp = otp.join('');
      await dispatch(registerUser({ gender, firstName, lastName, email, mobile, password, otp: fullOtp })).unwrap();
      setMessage('Registration successful!');
      // navigate("/profile");
    } catch (error) {
      setMessage(error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100 relative"
      style={{ backgroundImage: "url('https://pagedone.io/asset/uploads/1702362010.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <div className="relative w-auto max-w-sm mt-16 mx-auto p-8 bg-white rounded-2xl shadow-lg z-10">
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

        <form onSubmit={(e) => e.preventDefault()}>
          {/* gender Radio Buttons */}
          <div className="flex justify-start space-x-6 mb-4">
            {['Male', 'Female', 'Other'].map(t => (
              <label key={t} className="inline-flex items-center">
                <input type="radio" name="gender" value={t} checked={gender===t} onChange={(e)=>setGender(e.target.value)} className="form-radio text-orange-500"/>
                <span className="ml-2 text-gray-700">{t}</span>
              </label>
            ))}
          </div>

          {/* First & Last Name */}
          <div className="flex space-x-2 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email ID*</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email ID" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
            <input type="tel" value={mobile} onChange={(e)=>setMobile(e.target.value.replace(/\D/,''))} maxLength="10" placeholder="10-digit mobile number" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* OTP */}
          <div className="mb-4">
            <div className="flex justify-between space-x-2">
              {otp.map((digit, index) => (
                <input key={index} type="text" value={digit} onChange={(e)=>handleOtpChange(e,index)} onKeyDown={(e)=>handleOtpKeyDown(e,index)} maxLength="1" ref={el=>otpRefs.current[index]=el} className="w-12 h-12 text-2xl border border-gray-300 rounded-md shadow-sm text-center focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">{attempts} Attempts remaining</p>
              <button type="button" onClick={handleResendOTP} className="text-sm text-orange-500 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={resendTimer>0}>
                {resendTimer>0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </div>
          </div>

          {/* CAPTCHA and Age */}
          <div className="mb-4">
            <div className="flex flex-col items-center space-y-2 mb-2">
              <div className="bg-gray-200 px-6 py-3 rounded-md font-bold text-2xl text-gray-800">{captcha}</div>
              <input type="text" value={captchaInput} onChange={(e)=>setCaptchaInput(e.target.value)} placeholder="Enter shown text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>
            <label className="inline-flex items-center">
              <input type="checkbox" checked={isOver18} onChange={(e)=>setIsOver18(e.target.checked)} className="form-checkbox text-orange-500 rounded-md"/>
              <span className="ml-2 text-sm text-gray-700">I am over 18 years of age. I agree to <a href="#" className="text-orange-500 hover:underline">Terms & Conditions</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a></span>
            </label>
          </div>

          {/* Message */}
          {message && <p className={`mt-2 text-sm text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

          {/* Submit Button */}
          <button type="button" onClick={handleRegistration} disabled={loading} className={`w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}>
            {loading ? 'Registering...' : 'START SHOPPING'}
          </button>
        </form>
         <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to={`/login?redirect=${encodeURIComponent(redirect)}`} // Passes the current redirect parameter to the login route
            className="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
          >
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
