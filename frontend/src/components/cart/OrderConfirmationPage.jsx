import React from 'react';

const OrderConfirmationPage = () => {
  const orderDetails = {
    id: '#123456789',
    deliveryDate: 'Fri, 15 Sep',
    paymentId: 'PAYID1234567890',
    paymentMethod: 'Credit Card',
    totalAmount: '1199.00',
    address: {
      name: 'Vicky',
      details: '1/Kiroli Kund, Jhunjhunu, Rajasthan, 333307',
      mobile: '6378141023'
    },
    products: [
      {
        id: 1,
        image: 'https://placehold.co/300x400/E8DED1/000000?text=Shirt',
        name: 'Medium Grey Solid Casual Full Sleeves Mandarin Collar Men Slim Fit Casual Shirts',
        price: 1199,
        quantity: 1,
      },
    ]
  };

  const handlePrint = () => {
    window.print();
  };

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
              <span className="text-sm font-semibold text-gray-800 justify-self-end text-right">{orderDetails.id}</span>
              
              <span className="text-sm font-medium text-gray-600">Payment ID:</span>
              <span className="text-sm font-semibold text-gray-800 justify-self-end text-right">{orderDetails.paymentId}</span>

              <span className="text-sm font-medium text-gray-600">Payment Method:</span>
              <span className="text-sm font-semibold text-gray-800 justify-self-end text-right">{orderDetails.paymentMethod}</span>
              
              <span className="text-sm font-medium text-gray-600">Total Amount:</span>
              <span className="text-sm font-semibold text-gray-800 justify-self-end text-right">₹{orderDetails.totalAmount}</span>
              
              <span className="text-sm font-medium text-gray-600">Expected Delivery:</span>
              <span className="text-sm font-semibold text-gray-800 justify-self-end text-right">{orderDetails.deliveryDate}</span>
            </div>
          </div>

          {/* Product List */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            {orderDetails.products.map(product => (
              <div key={product.id} className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-20 h-24 bg-gray-200 rounded-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">Qty: {product.quantity}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">₹{product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Delivery Address</h3>
            <p className="text-sm text-gray-700 font-medium">Name: <span className="font-normal">{orderDetails.address.name}</span></p>
            <p className="text-sm text-gray-700 font-medium">Address: <span className="font-normal">{orderDetails.address.details}</span></p>
            <p className="text-sm text-gray-700 font-medium">Mobile: <span className="font-normal">{orderDetails.address.mobile}</span></p>
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-4 no-print">
            <button 
              onClick={handlePrint} 
              className="w-full py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-md font-semibold transition-colors duration-200"
            >
              PRINT INVOICE
            </button>
            <button className="w-full py-3 text-orange-500 border-2 border-orange-500 rounded-md font-semibold hover:bg-orange-50 transition-colors duration-200">
              TRACK ORDER
            </button>
            <button className="w-full py-3 text-orange-500 border-2 border-orange-500 rounded-md font-semibold hover:bg-orange-50 transition-colors duration-200">
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
