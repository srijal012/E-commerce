"use client";
import { MdOutlineSecurity } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductByCat from '@/app/com/ProductByCat';
import ProductById from '@/app/com/ProductById';
import { FaWallet } from "react-icons/fa6";
function Page() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProduct();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section className='container sm:mx-auto mx-[50px] md:flex justify-between py-[100px]'>
                <div className=' sm:w-[250px] pb-[50px]'>
                    <img className=' sm:h-[250px] sm:w-full w-[200px]' src={product.image} alt={product.title} />
                </div>
                <div className='w-[450px] h-[350px] relative'>
                    <h3 className='text-xl font-semibold'>{product.title}</h3>
                    <p className='text-md mt-[10px]'> Items Sold : {product.rating.count} pieces</p>
                    <div className='py-[15px] border-b-2'></div>
                    <p className='mt-[20px] h-[100px] overflow-hidden'>{product.description}</p>

                    <h5 className='absolute bottom-[50px] text-lg font-medium'>Price : $ {product.price}</h5>
                    <button className='bg-slate-900 absolute bottom-[50px] right-0 text-white rounded-lg p-3'>Add to cart</button>
                </div>
                <div className='h-[400px] w-[350px]  p-5 border shadow-md'>
                  <h3 className=' text-lg font-medium'>Protections for this product</h3>
                  <div className="flex py-[15px]">
                  <MdOutlineSecurity size={18}/>  <h5 className='font medium px-2'>Secure payments</h5>
                   </div>
                   <p className="text-sm">Every payment you make on Alibaba.com is secured with strict SSL encryption and PCI DSS data protection protocols</p>
                   <div className="flex py-[15px] mt-[20px]">
                   <FaWallet />  <h5 className='font medium px-2'>Refund policy & Easy Return
                  </h5>
                   </div>
                   <p className="text-sm">Claim a refund if your order doesn't ship, is missing, or arrives with product issues, plus free local returns for defects</p>
                    
                </div>
            </section>
            <section className='container '>
                <h2 className='text-2xl font-medium sm:mx-auto mx-[50px]'>You might like </h2>
                <ProductById title={product.category}/>
                
            </section>
        </>
    );
}

export default Page;
