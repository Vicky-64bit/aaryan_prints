import React, { useState } from 'react';
import OrderDetails from './OrderDetails'; // Assuming OrderDetails.jsx is in the same directory

const orders = [
  {
    id: '#123456789',
    date: '10 Sep 2025',
    status: 'Delivered',
    amount: 1199,
    products: [
      {
        id: 1,
        image: 'https://placehold.co/300x400/E8DED1/000000?text=Shirt',
        name: 'Medium Grey Solid Casual Full Sleeves Mandarin Collar Men Slim Fit Casual Shirts',
        quantity: 1
      },
      {
        id: 2,
        image: 'https://placehold.co/300x400/C1C1C1/000000?text=Jeans',
        name: 'Blue Slim Fit Denim Jeans',
        quantity: 1
      },
    ],
  },
  {
    id: '#987654321',
    date: '08 Sep 2025',
    status: 'Shipped',
    amount: 599,
    products: [
      {
        id: 3,
        image: 'https://placehold.co/300x400/E8DED1/000000?text=Tshirt',
        name: 'Men\'s White T-shirt',
        quantity: 1
      },
    ],
  },
];

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  if (selectedOrder) {
    return <OrderDetails order={selectedOrder} onBack={handleBackToOrders} />;
  }

  return (
    <div className="bg-gray-200 p-6 rounded-2xl shadow-sm">
    <div className=" mb-4p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order.id}
            onClick={() => handleOrderClick(order)}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex-1 mb-4 sm:mb-0">
              <span className="text-sm font-semibold text-gray-600">Order ID: {order.id}</span>
              <div className="mt-1 text-sm text-gray-500">
                <p>Date: {order.date}</p>
                <p>Status: <span className="text-green-600 font-medium">{order.status}</span></p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex -space-x-2">
                {order.products.slice(0, 3).map(product => (
                  <img
                    key={product.id}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                ))}
                {order.products.length > 3 && (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 border-2 border-white">
                    +{order.products.length - 3}
                  </div>
                )}
              </div>
              <div className="text-right font-bold text-lg text-gray-800">
                ₹{order.amount.toFixed(2)}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MyOrders;
