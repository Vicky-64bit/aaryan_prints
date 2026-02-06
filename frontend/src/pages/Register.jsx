import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { registerUser } from "../redux/slice/authSlice";
import { mergeCart } from "../redux/slice/cartSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [message, setMessage] = useState("");

  /* ==========================
     REDIRECT AFTER LOGIN
  ========================== */
  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() =>
          navigate(isCheckoutRedirect ? "/checkout" : "/")
        );
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, cart, guestId, dispatch, navigate, isCheckoutRedirect]);

  /* ==========================
     RESEND OTP TIMER
  ========================== */
  useEffect(() => {
    if (otpSent && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [otpSent, resendTimer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ==========================
     SEND OTP
  ========================== */
  const handleSendOtp = async () => {
    setMessage("");

    if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
      return setMessage("Enter valid 10-digit mobile number");
    }

    if (!form.email) {
      return setMessage("Email is required");
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`,
        {
          mobile: form.mobile,
          email: form.email,
        }
      );

      setOtpSent(true);
      setStep(2);
      setResendTimer(30);
      setOtp(["", "", "", "", "", ""]);

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);

      setMessage("OTP sent successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  /* ==========================
     OTP INPUT HANDLER
  ========================== */
  const handleOtpChange = (e, index) => {
    if (!/^\d?$/.test(e.target.value)) return;

    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /* ==========================
     REGISTER USER
  ========================== */
  const handleRegister = async () => {
    setMessage("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      return setMessage("Enter valid 6-digit OTP");
    }

    try {
  const result = await dispatch(
    registerUser({ ...form, otp: enteredOtp })
  ).unwrap();

  // Only show success if dispatch resolves
  setMessage("Registration successful");
  console.log("Registered User:", result.user);

} catch (err) {
  setMessage(err || "Registration failed"); // only network or backend errors
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center absolute top-0 left-0 w-full  bg-cover bg-no-repeat opacity-60" 
        style={{ backgroundImage: 'url("https://pagedone.io/asset/uploads/1702362010.png")' }}>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 mt-20">
        <h2 className="text-xl italic text-center text-gray-700 mb-6">
          Create Your Account
        </h2>

        {message && (
          <p className="text-center text-sm mb-4 text-orange-600">
            {message}
          </p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="flex gap-4 mb-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  <span className="text-sm">{g}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="firstName"
                placeholder="First Name*"
                onChange={handleChange}
                className="input"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="input"
              />
            </div>

            <input
              name="email"
              placeholder="Email*"
              onChange={handleChange}
              className="input mt-3"
            />

            <input
              name="mobile"
              placeholder="Mobile*"
              maxLength="10"
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "mobile",
                    value: e.target.value.replace(/\D/g, ""),
                  },
                })
              }
              className="input mt-3"
            />

            <input
              name="password"
              type="password"
              placeholder="Password*"
              onChange={handleChange}
              className="input mt-3"
            />

            <button
              onClick={handleSendOtp}
              className="w-full mt-6 bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="text-sm text-gray-600 text-center mb-3">
              Enter the 6-digit OTP sent to your mobile
            </p>

            <div className="flex justify-between mb-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, i)}
                  maxLength="1"
                  className="w-10 h-12 text-xl text-center border rounded-md"
                />
              ))}
            </div>

            <button
              disabled={loading}
              onClick={handleRegister}
              className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition"
            >
              {loading ? "Registering..." : "Create Account"}
            </button>

            <button
              disabled={resendTimer > 0}
              onClick={handleSendOtp}
              className="w-full text-sm text-orange-500 mt-3"
            >
              {resendTimer > 0
                ? `Resend OTP in ${resendTimer}s`
                : "Resend OTP"}
            </button>
          </>
        )}

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            to={`/login?redirect=${encodeURIComponent(redirect)}`}
            className="text-orange-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #d1d5db;
            border-radius: 9999px;
            outline: none;
          }
          .input:focus {
            border-color: #f97316;
          }
        `}
      </style>
    </div>
  );
};

export default Register;
