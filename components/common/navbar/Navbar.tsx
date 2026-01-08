import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import { IoBagAdd } from "react-icons/io5";

import "./Navbar.css";
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className='navbar-container'>
            <nav className='navbar'>
                <h1 className="font-poppins text-4xl font-bold"><span className='text-warning'>Leave</span><span className='text-primary'>It</span></h1>

                <div className='flex items-center gap-2 px-4 py-2 rounded-2xl bg-input'>
                    <FiSearch />
                    <input className='outline-none' placeholder='Search for products...' />
                </div>

                <div className='flex items-center gap-5 text-2xl'>
                    <Link href={"/"} className='flex items-center gap-2 text-lg'>
                        <CgProfile />
                        <p>Login</p>
                    </Link>
                    <Link href={"/"} className='flex items-center gap-2 text-lg'>
                        <FiShoppingCart />
                        <p>Cart</p>
                    </Link>
                    <Link href={"/"} className='flex items-center gap-2 text-lg'>
                        <BsShop />
                        <p>Sell Stuff</p>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar