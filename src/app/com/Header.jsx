"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { MdOutlineLanguage } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { MdOutlineSubject } from "react-icons/md";


function Header() {
  const [isMenuVisible ,setIsMenuVisible] =useState(false);
  const toggleMenu=()=>
    setIsMenuVisible(!isMenuVisible);
    {}
  return (
    <>
      <header className='bg-slate-900 h-[60px] sticky top-0 z-30'>
        <div className='container mx-auto text-white p-3  sm:text-sm text-[12px] flex justify-between'>
            <ul className=' space-x-10 flex'>
            <li className=''>
                Logo
            </li>
            <li className='hidden lg:inline-block'>
                <Link href="">Delivery to Nepal</Link>
                
            </li>
            <li className='flex px-3'>
                <input className='p-3 h-[25px] w-[150px] sm:w-[200px] md:w-[400px] ' type ="text" placeholder='Search' /><IoSearch className='sm:text-lg bg-yellow-500 text-black sm:w-[50px] h-[25px] w-[30px]' />
            </li>
            <div className='cursor pointer sm:hidden block'onClick={toggleMenu}>
            <MdOutlineSubject size={30}/>
            </div>
            </ul>
            <ul className={`sm:space-x-6  sm:inline-flex sm:text-[12px] hidden space-x-10 ${isMenuVisible ? '':'hidden'}`}>
            <li className='flex space-x-1 '>
            <MdOutlineLanguage className='text-lg' />    <Link href="">Lang</Link>
            </li>
            <li className='sm:inline'>
            <Link href="" className=''>  Accounts & Lists</Link>
            </li>
            <li>
            <Link href="" className='sm:hidden md:inline-flex'>Return & Orders</Link>
            </li>
            <li className='flex space-x-1'> 
            <BsCart4 className='text-lg'/>     <Link href="">Cart</Link>
            </li>
            </ul>
        </div>
      </header>
      <nav className='bg-slate-700 h-[40px]'>
        <div className='container mx-auto text-white p-2 text-[12px] sm:text-sm'>
          <ul className='flex space-x-3 sm:space-x-6'>
            <li><Link href="">All</Link></li>
            <li><Link href="">Best Deals</Link></li>
           <li><Link href="customerservice">customer service</Link></li>
            <li><Link href="">Gift Cards</Link></li>
            <li className='sm:inline hidden'><Link href="/about">About-Us</Link></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
