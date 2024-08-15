"use client";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ProductByCat from "./com/ProductByCat";
import { IoStarSharp } from "react-icons/io5";

export default function Home() {
  const [products, setProducts] = useState([]); 
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        }
    };

    fetchProduct();
}, []);

if (error) {
    return <div>Error: {error}</div>;
}

if (!products) {
    return <div>Loading...</div>;
}

  const slides = [
    { url: 'https://images-na.ssl-images-amazon.com/images/G/01/consumerelectronics/CAC/Category_Storefronts/1367476_us_he_handpicked_laptops_1500x440.jpg' },
    { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a5a42a69061263.5b733686540e8.png' },
    { url: 'https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651' }
  ];

  const prevSlides = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? slides.length - 1 : prevIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex => prevIndex === slides.length - 1 ? 0 : prevIndex + 1);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setCat(category);
    setIsOpen(false);
  };

  return (
    <>
      {cat ? ( 
        <ProductByCat title={cat} />
      ) : (
        <>
          <div className="h-[440px] relative group">
            <div
              style={{ background: `url(${slides[currentIndex].url})` }}
              className="bg-cover bg-center duration-300 h-full bg-no-repeat mx-w-[full]"
            ></div>
            <div
              className="absolute top-[200px] text-white hidden cursor-pointer group-hover:block"
              onClick={prevSlides}
            >
              <MdKeyboardArrowLeft size={50} />
            </div>
            <div
              className="absolute top-[200px] text-white right-0 cursor-pointer hidden group-hover:block"
              onClick={nextSlide}
            >
              <MdKeyboardArrowRight size={50} />
            </div>
          </div>
          

          <div className="container sm:mx-auto  ml-[20px] relative">
            <div
              className="bg-slate-900 sm:w-[150px] w-[100px] text-white justify-center mt-[40px] flex py-2 rounded-lg cursor-pointer"
              onClick={toggleDropdown}
            >
              <button>Filter By</button>
              <IoMdArrowDropdown size={25} />
            </div>
            {isOpen && (
              <div className="absolute bg-slate-200 text-black sm:w-[250px] w-[200px] rounded-lg shadow-lg z-30">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-400 cursor-pointer" onClick={() => handleCategoryClick('electronics')}> Electronics</li>
                  <li className="px-4 py-2 hover:bg-gray-400 cursor-pointer" onClick={() => handleCategoryClick('jewelery')}> Jewelery</li>
                  <li className="px-4 py-2 hover:bg-gray-400 cursor-pointer" onClick={() => handleCategoryClick("Men's clothing")}> Men's clothing</li>
                  <li className="px-4 py-2 hover:bg-gray-400 cursor-pointer" onClick={() => handleCategoryClick("women's clothing")}> Women's clothing</li>
                </ul>
              </div>
            )}
          </div>

          <div className="container mx-auto group mt-[50px] ">
            <h1 className="ml-[20px] font-medium text-xl mb-[20px]">Suggested for you</h1>
            <div className="flex flex-wrap justify-between ">
              {products.map((product) => (
                <div className="md:w-[30%] sm:w-[45%] w-[100%] h-[450px] shadow border p-5 mb-10 relative" key={product.id}>
                  <p className="font-medium">{product.title}</p>
                  <img className="h-[250px] py-5 mx-auto" src={product.image} alt={product.title} />
                  <p className="absolute top-[350px]">Price: ${product.price}</p>
                  <p className="absolute top-[350px] right-5 bg-slate-900 text-white rounded-lg py-2 px-4 sm:px-2 sm:text-sm">
                    <Link href={`/details/${product.id}`}> Order Now</Link>
                  </p>
                  <div className="absolute top-[400px] flex gap-2">
                   <p> Rating : </p>{product.rating.rate} <IoStarSharp  className="text-yellow-500" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
