import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoStarSharp } from "react-icons/io5";

function ProductById({title}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (title) {
          fetch(`https://fakestoreapi.com/products/category/${title}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to fetch products');
              }
              return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
        }
      }, [title]);
  return (
    <>
       <div className='container mx-auto'>
            <h1 className='py-[50px] text-2xl font-semibold first-letter:capitalize sm:mx-auto mx-[50px]'>{title}</h1>
            <div className="flex flex-wrap justify-between">
              {products.map((product) => (
                <div className="md:w-[30%] sm:w-[45%] w-[100%] h-[450px] shadow border p-5 mb-10 relative" key={product.id}>
                  <p className="font-medium">{product.title}</p>
                  <img className="h-[250px] py-5 mx-auto" src={product.image} alt={product.title} />
                  <p className="absolute top-[350px]">Price: ${product.price}</p>
                  <p className="absolute top-[350px] right-5 bg-slate-900 text-white rounded-lg py-2 px-4 sm:text-sm sm:px-2">
                    <Link href={`/details/${product.id}`}>Order Now</Link>
                  </p>
                  <div className="absolute top-[400px] flex gap-2">
                   <p> Rating : </p>{product.rating.rate} <IoStarSharp  className="text-yellow-500" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
    </>
  )
}

export default ProductById
