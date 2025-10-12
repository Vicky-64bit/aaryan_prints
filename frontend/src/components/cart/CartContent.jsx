import React, { useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri"; 

const CartContent = ({cartProducts, setCartProducts}) => {
  // State for cart products
  // const [cartProducts, setCartProducts] = useState([
  //   {
  //     productId: 1,
  //     name: "Classic Orange Hoodie",
  //     size: "M",
  //     color: "Heather Gray",
  //     quantity: 2,
  //     price: 49.99,
  //     image: "https://placehold.co/80x96/f3f4f6/57534e?text=HOODIE",
  //   },
  //   {
  //     productId: 2,
  //     name: "High-Rise Slim Jeans",
  //     size: "L",
  //     color: "Deep Blue",
  //     quantity: 1,
  //     price: 79.5,
  //     image: "https://placehold.co/80x96/f3f4f6/57534e?text=JEANS",
  //   },
  //   {
  //     productId: 3,
  //     name: "Essential White Tee",
  //     size: "S",
  //     color: "White",
  //     quantity: 3,
  //     price: 19.99,
  //     image: "https://placehold.co/80x96/f3f4f6/57534e?text=TEE",
  //   },
  // ]);

  const increaseQty = (id) => {
  setCartProducts(prev => 
    prev.map(p => p.productId === id ? {...p, quantity: p.quantity + 1} : p)
  );
};

const decreaseQty = (id) => {
  setCartProducts(prev => 
    prev.map(p => p.productId === id ? {...p, quantity: Math.max(1, p.quantity - 1)} : p)
  );
};

const removeItem = (id) => {
  setCartProducts(prev => prev.filter(p => p.productId !== id));
};


  return (
    <div className="space-y-4">
      {cartProducts.length > 0 ? (
        cartProducts.map((product) => (
          <div
            key={product.productId}
            className="flex p-3 bg-white border border-gray-100 rounded-xl shadow-sm transition duration-150 hover:shadow-md"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded-lg"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x96/f3f4f6/57534e?text=ITEM"; }}
            />

            {/* Product Details & Controls */}
            <div className="flex flex-col justify-between flex-grow min-w-0">
              {/* Name, Price, and Delete Button Row */}
              <div className="flex justify-between items-start">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <h3 className="font-semibold text-gray-900 text-base truncate">{product.name}</h3>
                  <p className="text-xs text-gray-500 font-medium capitalize">
                    Size: {product.size} | Color: {product.color}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  className="p-1 flex-shrink-0 text-gray-400 hover:text-red-600 transition duration-150"
                  aria-label={`Remove ${product.name} from cart`}
                  onClick={() => removeItem(product.productId)}
                >
                  <RiDeleteBin3Line className="w-5 h-5" />
                </button>
              </div>

              {/* Quantity Controls and Unit Price */}
              <div className="flex justify-between items-end mt-2">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-0.5">
                  <button
                    className="w-7 h-7 flex items-center justify-center text-lg font-medium text-gray-600 hover:text-white hover:bg-orange-600 rounded-full transition duration-150"
                    aria-label={`Decrease quantity of ${product.name}`}
                    onClick={() =>decreaseQty(product.productId)}
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold text-gray-800 w-4 text-center">
                    {product.quantity}
                  </span>
                  <button
                    className="w-7 h-7 flex items-center justify-center text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition duration-150 shadow-md"
                    aria-label={`Increase quantity of ${product.name}`}
                    onClick={() => increaseQty(product.productId)}
                  >
                    +
                  </button>
                </div>

                {/* Total Price for this item */}
                <div className="flex flex-col items-end">
                  <p className="text-lg font-bold text-orange-600">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 italic mt-1">
                    (${product.price.toFixed(2)} ea.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-medium">Your cart is empty.</p>
          <p className="text-sm mt-1">Time to fill it up with some style!</p>
        </div>
      )}
    </div>
  );
};

export default CartContent;
