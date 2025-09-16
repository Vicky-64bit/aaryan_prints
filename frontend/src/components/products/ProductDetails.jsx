import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import products from "../common/products";
import ProductGrid from "./ProductGrid";

const similarProducts = [
  {
    id: 1,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+1',
    offer: 'Flat 50%',
    title: 'FOREVER GLAM',
    description: 'Cream Tone-tone Slingback Pointed Heel Sandals',
    price: '₹ 1899',
  },
  {
    id: 2,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+2',
    offer: 'Flat 50%',
    title: 'AJILE',
    description: 'White Striped Johnny Polo Cropped Rugby Top',
    price: '₹ 1199',
  },
  {
    id: 3,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+3',
    offer: 'Flat 50%',
    title: 'RANGMANCH',
    description: 'Purple Foil Print A-line Peplum Kurta',
    price: '₹ 1299',
  },
  {
    id: 4,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+4',
    offer: 'Flat 50%',
    title: 'RANGMANCH',
    description: 'Beige Watercolour Floral Print A-line Kurta',
    price: '₹ 1299',
  },
  {
    id: 5,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+5',
    offer: 'Flat 50%',
    title: 'MARIGOLD LANE',
    description: 'Yellow Wall Print Layered Collar A-line Kurta',
    price: '₹ 1699',
  },
  {
    id: 6,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+6',
    offer: 'Flat 50%',
    title: 'RANGMANCH',
    description: 'Pink Floral Print Flared Dress',
    price: '₹ 1499',
  },
  {
    id: 7,
    image: 'https://placehold.co/400x500/E5E7EB/1F2937?text=Product+7',
    offer: 'Flat 50%',
    title: 'FOREVER GLAM',
    description: 'Black Suede Pointed Toe Heels',
    price: '₹ 1999',
  },
];

const ProductDetails = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const selectedProduct = products.find((p) => p.id === parseInt(id));

if (!selectedProduct) {
  return (
    <div className="text-center text-red-500 mt-20 text-xl">
      ⚠️ Product not found
    </div>
  );
}

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDiasbled] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange= (action) => {
    if(action==="plus") setQuantity((prev) => prev+1);
    if(action==="minus" && quantity>1) setQuantity((prev) => prev-1);
  }

  const handleAddToCart = () => {
    if(!selectedSize || !selectedColor){
        toast.error("Please select a size and color before adding to cart.", {
            duration: 1000,
        });
        return;
    }
    setIsButtonDiasbled("true");

    setTimeout(() => {
        toast.success("Product added to cart!", {duration:1000,});
        setIsButtonDiasbled(false);
    }, 500);
  };
  
  const handleAddToWishlist = () => {
    toast.success("Product added to wishlist!", {duration: 1000});
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-6xl mt-28 mx-auto bg-white p-8 rounded-lg">
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span className="text-sm font-semibold">Back to Products</span>
      </button>

      <div className="flex flex-col md:flex-row">
        {/* left Thumbnail  */}
        <div className="hidden md:flex flex-col space-y-4 mr-6">
          {selectedProduct.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText || `Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                mainImage === image.url ? "border-orange-500" : "border-gray-300"
              } transition-colors duration-200`}
              onClick={() => setMainImage(image.url)}
            />
          ))}
        </div>
        {/* Main Image and Magnified View Container */}
        <div className="md:w-1/2 relative">
          <div className="mb-4">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-[580px] object-cover rounded-lg shadow-md cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            />
          </div>
          {isZoomed && (
            <div
              className="hidden md:block absolute top-0 right-[-105%] w-full h-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
              style={{
                backgroundImage: `url(${mainImage})`,
                backgroundSize: "200%",
                backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
            ></div>
          )}
        </div>
        {/* Mobile Thumbnail  */}
        <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
          {selectedProduct.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText || `Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                mainImage === image.url ? "border-orange-500" : "border-gray-300"
              } transition-colors duration-200`}
              onClick={() => setMainImage(image.url)}
            />
          ))}
        </div>

        {/* Right Section  */}
        <div className="md:w-1/2 md:ml-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {selectedProduct.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-2 font-semibold">
            ₹ {selectedProduct.price}
            {selectedProduct.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2 font-normal">
                {`₹ ${selectedProduct.originalPrice}`}
              </span>
            )}
          </p>
          <p className="text-gray-600 text-sm md:text-base mb-4">{selectedProduct.description}</p>
          <div className="mb-6">
            <p className="text-gray-700 font-semibold mb-2">Color:</p>
            <div className="flex gap-3 mt-2">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={()=>setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transform transition-transform hover:scale-110 ${selectedColor === color ? "border-orange-500 ring-2 ring-orange-500" : "border-gray-300"}`}
                  style={{
                    backgroundColor: color.toLocaleLowerCase(),
                    filter: "brightness(0.8)",
                  }}
                ></button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 font-semibold mb-2">Size:</p>
            <div className="flex gap-3 mt-2">
              {selectedProduct.sizes.map((size) => (
                <button key={size}
                  onClick={() => setSelectedSize(size)}
                className={`px-5 py-2 rounded-md border-2 font-medium text-sm transform transition-transform hover:scale-105 ${
                    selectedSize === size ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-700 border-gray-300"
                }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 font-semibold mb-2">Quantity:</p>
            <div className="flex items-center space-x-4 mt-2">
              <button 
                onClick={() => handleQuantityChange("minus")}
                className="px-4 py-2 bg-gray-200 rounded-md text-xl font-bold hover:bg-gray-300 transition-colors duration-200"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("plus")}
                className="px-4 py-2 bg-gray-200 rounded-md text-xl font-bold hover:bg-gray-300 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`flex-1 py-3 px-6 rounded-md font-bold text-lg transition-colors duration-200 ${isButtonDisabled ? "cursor-not-allowed opacity-50 bg-gray-400 text-gray-100" : "bg-orange-500 text-white hover:bg-orange-600"}`}
            >
              ADD TO CART
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex-1 py-3 px-6 rounded-md font-bold text-lg border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-200"
            >
              ADD TO WISHLIST
            </button>
          </div>

          <div className="mt-8 text-gray-700">
            <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
            <table className="w-full text-left text-sm md:text-base text-gray-600">
              <tbody>
                <tr>
                  <td className="py-2">Brand</td>
                  <td className="py-2 font-medium">{selectedProduct.brand}</td>
                </tr>
                <tr>
                  <td className="py-2">Material</td>
                  <td className="py-2 font-medium">{selectedProduct.material}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <h2 className="text-3xl text-center font-bold mb-6">
            You May Also Like
        </h2>
        <ProductGrid products={similarProducts} />
      </div>

      <div className="mt-16">
        <h2 className="text-3xl text-center font-bold mb-6">
            More Like This
        </h2>
        <ProductGrid products={products} />
      </div>

      <div className="mt-16">
        <h2 className="text-3xl text-center font-bold mb-6">
            Frequently Bought Together
        </h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductDetails;
