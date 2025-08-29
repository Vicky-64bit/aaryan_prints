import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContent = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 15,
      image:
        "https://media.istockphoto.com/id/2161390438/photo/legal-liability-concept-law-books-and-magnifying-glass.webp?s=2048x2048&w=is&k=20&c=rNwGfRcOJTz-tVNbGk2q70fZkv7qCdMG_58shcc1zyA=",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "L",
      color: "Blue",
      quantity: 1,
      price: 25,
      image:
        "https://media.istockphoto.com/id/2161390438/photo/legal-liability-concept-law-books-and-magnifying-glass.webp?s=2048x2048&w=is&k=20&c=rNwGfRcOJTz-tVNbGk2q70fZkv7qCdMG_58shcc1zyA=",
    },
    {
      productId: 3,
      name: "Pant",
      size: "M",
      color: "red",
      quantity: 1,
      price: 15,
      image:
        "https://media.istockphoto.com/id/2161390438/photo/legal-liability-concept-law-books-and-magnifying-glass.webp?s=2048x2048&w=is&k=20&c=rNwGfRcOJTz-tVNbGk2q70fZkv7qCdMG_58shcc1zyA=",
    },
  ];
  return (
    <>
      {cartProducts.map((product, index) => (
        <div>
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b"
          >
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />
            </div>
            <h3>{product.name}</h3>
            <p className="text-sm text-gray-500">
              size:{product.size} | color: {product.color}
            </p>
            <div className="flex items-center mt-2">
              <button className="border rounded px-2 py-1 text-xl font-medium">
                -
              </button>
              <span className="mx-4">{product.quantity}</span>
              <button className="border rounded px-2 py-1 text-xl font-medium">
                +
              </button>
            </div>
          </div>

          <div>
            <p>${product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartContent;
