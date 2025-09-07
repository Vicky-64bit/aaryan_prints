import React, { useEffect, useState } from "react";
import {toast} from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish javket perfect for any ocassion",
  brand: "AaryanPrints",
  material: "leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://media.istockphoto.com/id/1061746720/photo/young-man-business-casual-fashion-in-new-york.jpg?s=612x612&w=0&k=20&c=zvoy_JZXIqRtbUCmdUMeNPMlcgDZyDYqs999JE8j_Eg=",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://media.istockphoto.com/id/1776475600/photo/indoor-portrait-of-a-stylish-man.jpg?s=612x612&w=0&k=20&c=L0fyDwWbBVKbq995_0SQi5El_ufbnmvBYS_2V6XKDyk=",
      altText: "Stylish Jacket 2",
    },
    {
      url: "https://media.istockphoto.com/id/1061746720/photo/young-man-business-casual-fashion-in-new-york.jpg?s=612x612&w=0&k=20&c=zvoy_JZXIqRtbUCmdUMeNPMlcgDZyDYqs999JE8j_Eg=",
      altText: "Stylish Jacket 3",
    },
    {
      url: "https://media.istockphoto.com/id/1061746720/photo/young-man-business-casual-fashion-in-new-york.jpg?s=612x612&w=0&k=20&c=zvoy_JZXIqRtbUCmdUMeNPMlcgDZyDYqs999JE8j_Eg=",
      altText: "Stylish Jacket 4",
    },
  ],
};

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
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDiasbled] = useState(false);


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

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
      <div className="flex flex-col md:flex-row">
        {/* left Thumbnail  */}
        <div className="hidden md:flex flex-col space-y-4 mr-6">
          {selectedProduct.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText || `Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                mainImage === image.url ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setMainImage(image.url)}
            />
          ))}
        </div>
        {/* Main Image  */}
        <div className="md:w-1/2">
          <div className="mb-4 ">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-[580px] object-fit rounded-lg"
            />
          </div>
        </div>
        {/* Mobile Thumbnail  */}
        <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
          {selectedProduct.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText || `Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                mainImage === image.url ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setMainImage(image.url)}
            />
          ))}
        </div>

        {/* Right Section  */}
        <div className="md:w-1/2 md:ml-10">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {selectedProduct.name}
          </h1>
          <p className="text-lg text-gray-600 mb-1 line-through">
            {selectedProduct.originalPrice &&
              `${selectedProduct.originalPrice}`}
          </p>
          <p className="text-xl text-gray-500 mb-2">
            $ {selectedProduct.price}
          </p>
          <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
          <div className="mb-4">
            <p className="text-gray-700">Color:</p>
            <div className="flex gap-2 mt-2">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={()=>setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-4 border-black" : "border-gray-300"}`}
                  style={{
                    backgroundColor: color.toLocaleLowerCase(),
                    filter: "brigthness(0.5)",
                  }}
                ></button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700">Size:</p>
            <div className="flex gap-2 mt-2">
              {selectedProduct.sizes.map((size) => (
                <button key={size}
                 onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded border ${
                    selectedSize === size ? "bg-black text-white" : ""
                }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 ">
            <p className="text-gray-700">Quantity</p>
            <div className="flex items-center space-x-4 mt-2">
              <button 
              onClick={() => handleQuantityChange("minus")}
               className="px-2 py-1 bg-gray-200 rounded text-lg">
                {" "}
                -{" "}
              </button>
              <span className="text-lg">{quantity}</span>
              <button
              onClick={() => handleQuantityChange("plus")}
              className="px-2 py-1 bg-gray-200 rounded text-lg">
                {" "}
                +{" "}
              </button>
            </div>
          </div>

          <button onClick={handleAddToCart} 
          disabled={isButtonDisabled}
          className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled? "cursor-not-allowed opacity-50":"hover:bg-gray-900"}`}>
           {isButtonDisabled ? "Adding..." : "ADD TO CART"} 
          </button>
       

        <div className="mt-5 text-gray-700">
          <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
          <table className="w-full text-left text-sm text-gray-600">
            <tbody>
              <tr>
                <td className="py-2">Brand</td>
                <td className="py-2">{selectedProduct.brand}</td>
              </tr>
              <tr>
                <td className="py-2">Material</td>
                <td className="py-2">{selectedProduct.material}</td>
              </tr>
            </tbody>
          </table>
        </div> </div>
        
      </div>
      <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
                You May Also Like
            </h2>
            
            <ProductGrid products={ similarProducts }/>
            </div>

            <div className="mt-15">
            <h2 className="text-2xl text-center font-medium mb-4">
                More Like This
            </h2>
            <ProductGrid products={ similarProducts }/>
        </div>
            <div className="mt-15">
            <h2 className="text-2xl text-center font-medium mb-4">
                Frequently Bought Together
            </h2>
            <ProductGrid products={ similarProducts }/>
        </div>
    </div>
  );
};

export default ProductDetails;
