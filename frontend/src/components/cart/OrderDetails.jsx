import React from 'react';

const OrderDetails = ({ order, onBack }) => {
  const isCancellable = order.status === 'Shipped';
  const isReturnable = order.status === 'Delivered';

  const handleCancel = () => {
    // Placeholder for cancel order logic
    console.log(`Cancelling order: ${order.id}`);
    alert(`Order ${order.id} has been cancelled.`);
  };

  const handleReturn = () => {
    // Placeholder for return order logic
    console.log(`Returning order: ${order.id}`);
    alert(`Request to return order ${order.id} has been placed.`);
  };

  return (
    <div className=" mb-4 p-4 sm:p-6 md:p-8">
      <div className="flex items-center space-x-2 mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
      </div>

      <div className="space-y-6">
        {/* Order Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Order ID: {order.id}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-600">Order Date</p>
              <p className="text-gray-800">{order.date}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Order Status</p>
              <p className="text-green-600 font-medium">{order.status}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Total Amount</p>
              <p className="text-gray-800">₹{order.amount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Products in Order</h3>
          <div className="space-y-4">
            {order.products.map(product => (
              <div key={product.id} className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600 mt-1">Quantity: {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-6 p-6 flex justify-end space-x-4">
        {isCancellable && (
          <button
            onClick={handleCancel}
            className="py-2 px-4 border border-red-500 text-red-500 rounded-md font-medium hover:bg-red-50 transition-colors"
          >
            Cancel Order
          </button>
        )}
        {isReturnable && (
          <button
            onClick={handleReturn}
            className="py-2 px-4 border border-orange-500 text-orange-500 rounded-md font-medium hover:bg-orange-50 transition-colors"
          >
            Return
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
