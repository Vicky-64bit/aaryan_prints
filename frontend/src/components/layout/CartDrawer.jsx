import React from "react";
// Switched from lucide-react to react-icons/io5 as requested
import { IoClose, IoChevronForwardOutline } from "react-icons/io5";

// NOTE: CartContent is assumed to be imported and defined in a separate file,
// as requested by the user. This component uses it directly.
// const CartContent = ({ items }) => { ... };
import CartContent from "../cart/CartContent";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const [cartProducts, setCartProducts] = React.useState([
    {
      productId: 1,
      name: "Classic Orange Hoodie",
      size: "M",
      color: "Heather Gray",
      quantity: 2,
      price: 49.99,
      image: "https://placehold.co/80x96/f3f4f6/57534e?text=HOODIE",
    },
    {
      productId: 2,
      name: "High-Rise Slim Jeans",
      size: "L",
      color: "Deep Blue",
      quantity: 1,
      price: 79.5,
      image: "https://placehold.co/80x96/f3f4f6/57534e?text=JEANS",
    },
    {
      productId: 3,
      name: "Essential White Tee",
      size: "S",
      color: "White",
      quantity: 3,
      price: 19.99,
      image: "https://placehold.co/80x96/f3f4f6/57534e?text=TEE",
    },
  ]);

  // Mock value for Total/Subtotal since the CartContent component is external
  const mockTotal = cartProducts.reduce(
  (sum, product) => sum + product.price * product.quantity,
  0
);

  // Backdrop for outside clicks and visual focus
  const backdropClasses = `fixed inset-0 transition-opacity duration-300 z-40 ${
    drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
  }`;

  // The actual drawer content container (logic preserved)
  const drawerClasses = `fixed top-0 right-0 w-full xs:w-3/4 sm:w-1/2 md:w-96 h-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col z-50 ${
    drawerOpen ? "translate-x-0" : "translate-x-full"
  }`;

  return (
    <div className="font-sans">
      {/* Backdrop */}
      <div
        className={backdropClasses}
        onClick={toggleCartDrawer}
        aria-hidden={!drawerOpen}
      >
        {/* Semi-transparent dark overlay */}
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>

      {/* Cart Drawer */}
      <div
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header with Close button (Orange Theme) */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
          <h2 className="text-2xl font-medium text-gray-900 tracking-tight">
            Your Cart
          </h2>
          <button
            onClick={toggleCartDrawer}
            className="p-1 rounded-full text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition duration-150"
            aria-label="Close cart"
          >
            {/* Replaced X with IoClose */}
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Content Area */}
        <div className="flex-grow p-6 overflow-y-auto bg-gray-50">
          {/* Placeholder for actual cart contents - assumes this is imported */}
          <CartContent
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        </div>

        {/* Checkout Button & Footer (Orange Theme) */}
        <div className="p-6 bg-white shadow-2xl">
          {/* Total price calculation */}
          <div className="flex justify-between text-md font-bold mb-4 text-gray-900">
            <span>Total</span>
            <span className="text-orange-600">${mockTotal.toFixed(2)}</span>
          </div>

          <button
            className="w-full inline-flex items-center justify-center bg-orange-600 text-white py-4 rounded-xl font-bold text-md shadow-lg shadow-orange-300/50 hover:bg-orange-700 transition duration-300 transform hover:scale-[1.01]"
            onClick={() => console.log("Proceeding to Checkout")}
          >
            Proceed to Checkout
            {/* Replaced ChevronRight with IoChevronForwardOutline */}
            <IoChevronForwardOutline className="ml-2 w-5 h-5" />
          </button>
          <p className="text-xs tracking-tight text-gray-500 mt-3 text-center">
            Shipping, taxes, and discount codes calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
