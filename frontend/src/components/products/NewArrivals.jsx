import React, { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setscrollLeft] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Jacket",
      price: 120,
      images: [
        {
          url: "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
          altText: "Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Casual Shirt",
      price: 80,
      images: [
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ31PLNUPWIqWTYodoO_7bdGgg6M4ZazOBO_w&s",
          altText: "Casual Shirt",
        },
      ],
    },
    {
      _id: "3",
      name: "T-Shirt",
      price: 40,
      images: [
        {
           url: "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
          altText: "T-Shirt",
        },
      ],
    },
    {
      _id: "4",
      name: "Hoodie",
      price: 95,
      images: [
        {
           url: "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
          altText: "Hoodie",
        },
      ],
    },
    {
      _id: "5",
      name: "Kurta",
      price: 110,
      images: [
        {
          url: "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
          altText: "Kurta",
        },
      ],
    },
    {
      _id: "6",
      name: "Jeans",
      price: 70,
      images: [
        {
           url: "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
          altText: "Jeans",
        },
      ],
    },
    {
      _id: "7",
      name: "Sneakers",
      price: 130,
      images: [
        {
          url: "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
          altText: "Sneakers",
        },
      ],
    },
    {
      _id: "8",
      name: "Formal Shoes",
      price: 150,
      images: [
        {
           url: "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
          altText: "Formal Shoes",
        },
      ],
    },
    {
      _id: "9",
      name: "Cap",
      price: 25,
      images: [
        {
           url: "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
        },
      ],
    },
  ];

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({left: scrollAmount, behaviour: "smooth"});
  }
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setscrollLeft(scrollRef.current.scrollLeft);
  }

  const handleMouseMove = (e) => {
    if(!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft-walk;
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }


  //Update scroll Buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if(container){
        const leftScroll = container.scrollLeft;
        const rightScrollable = container.scrollWidth>leftScroll + container.clientWidth;

        setCanScrollLeft(leftScroll>0);
        setCanScrollRight(rightScrollable);

    }
    
  }

  useEffect(() => {
    const container = scrollRef.current;
    if(container){
        container.addEventListener("scroll", updateScrollButtons)
        updateScrollButtons();

        return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  })

  return <section className="py-4 px-4 lg:px-0 my-4 bg-gray-200" >
    <div className="w-[95%] container mx-auto text-center mb-10 relative" >
        <h2 className="text-3xl font-bold mb-4" >
            Explore New Arrivals
        </h2>
        <p className="text-lg text-gray-600 mb-8" >
            Discover the latest styles straight off the runway, freshly added to keep your on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons  */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2" >
            <button onClick={()=>scroll("left")} disabled={!canScrollLeft} className={`p-2 rounded border ${ canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`} >
                <FiChevronLeft className="text-2xl"/>
            </button>
            <button onClick={()=> scroll("right")} className={`p-2 rounded border ${ canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`} >
                <FiChevronRight className="text-2xl"/>
            </button>
        </div>
    </div>

    {/* Scrollable Content  */}
    <div ref={scrollRef} className={`w-[95%] bg-white p-4 container mx-auto overflow-x-scroll flex space-x-6 relative drop-shadow-lg ${isDragging ? "cursor-garbbing" : "cursor-garb"} `} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave} >
        {
            newArrivals.map((product)=> (
                <div key={product._id} className="min-w-[220px] bg-white  overflow-hidden" >
                    <img src={product.images[0]?.url} alt={product.images[0]?.altText || product.name} draggable="false" className="w-full h-72 object-cover shadow-lg" />
                    <div className="p-2 text-left" >
                        <Link to={`/product/${product._id}`} className="block"/>
                        <h4 className="font-medium text-gray-800" >{product.name.toUpperCase()}</h4>
                        <p className="text-sm text-gray-600" >${product.price}</p>
                    </div>
                </div>
            ))
        }
    </div>


  </section>
};

export default NewArrivals;
