import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { BsShop } from "react-icons/bs";



const Navbar = () => {
    return (
        <header className='bg-white shadow-sm'>
            <nav className='flex justify-between items-center p-4 '>
                <h1>Leave</h1>

                <div className='flex items-center gap-2 border px-4 py-2 rounded-2xl rounded-2xl bg-input'>
                    <FiSearch />
                    <input className='outline-none  ' placeholder='search...' />
                </div>

                <div className='flex items-center gap-4 text-2xl'>
                    <CgProfile />
                    <FiShoppingCart />
                    <BsShop />
                </div>
            </nav>
        </header>
    )
}

export default Navbar