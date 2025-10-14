import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirmationPage = () => {
  const { id } = useParams(); // get order ID from URL
  const location = useLocation();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token =
          localStorage.getItem("usertoken") || ""; // JWT token
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order details.");
        setLoading(false);
      }
    };

    if (!id) {
      navigate("/"); // if no order ID, redirect home
    } else {
      fetchOrder();
    }
  }, [id, navigate]);

  const handlePrint = () => window.print();
  const handleContinueShopping = () => navigate("/");

  if (loading)
    return <div className="text-center p-10 font-medium">Loading order...</div>;

  if (error)
    return (
      <div className="text-center p-10 text-red-600 font-medium">{error}</div>
    );

  if (!orderDetails)
    return (
      <div className="text-center p-10 font-medium">
        Order not found.
      </div>
    );

  // Calculate delivery date dynamically (e.g., 7 days after order)
  const deliveryDate = new Date(orderDetails.createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  return (
    <>
      <style>
        {`
          @media print {
            .no-print {
              display: none;
            }
          }
        `}
      </style>
      <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-green-500 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">Order Confirmed!</h1>
            <p className="mt-2 text-gray-600">Thank you for your purchase. Your order has been placed successfully.</p>
          </div>

          {/* Order Details */}
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="grid grid-cols-2 gap-y-2">
              <span className="text-sm font-medium text-gray-600">Order ID:</span>
              <span className="text-sm font-semibold text-gray-800 justify-self-end text-right">{orderDetails._id}</span>

              <span className="text-sm font-medium text-gray-600">Payment Method:</span>
              <span className="text-sm font-semibold text-gray-800 justify-self-end text-right">{orderDetails.paymentMethod}</span>

              <span className="text-sm font-medium text-gray-600">Total Amount:</span>
              <span className="text-sm font-semibold text-gray-800 justify-self-end text-right">₹{orderDetails.totalPrice.toFixed(2)}</span>

              <span className="text-sm font-medium text-gray-600">Expected Delivery:</span>
              <span className="text-sm font-semibold text-gray-800 justify-self-end text-right">{deliveryDate.toDateString()}</span>
            </div>
          </div>

          {/* Product List */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            {orderDetails.orderItems.map((product, idx) => (
              <div key={product._id || idx} className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-20 h-24 bg-gray-200 rounded-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">Qty: {product.quantity}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">₹{(product.price * product.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Delivery Address</h3>
            <p className="text-sm text-gray-700 font-medium">Name: <span className="font-normal">{orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}</span></p>
            <p className="text-sm text-gray-700 font-medium">Address: <span className="font-normal">{orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postalCode}, {orderDetails.shippingAddress.country}</span></p>
            <p className="text-sm text-gray-700 font-medium">Mobile: <span className="font-normal">{orderDetails.shippingAddress.phone}</span></p>
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-4 no-print">
            <button onClick={handlePrint} className="w-full py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-md font-semibold transition-colors duration-200">
              PRINT INVOICE
            </button>
            <button onClick={handleContinueShopping} className="w-full py-3 text-orange-500 border-2 border-orange-500 rounded-md font-semibold hover:bg-orange-50 transition-colors duration-200">
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
