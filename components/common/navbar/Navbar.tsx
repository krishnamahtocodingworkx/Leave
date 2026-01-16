"use client";
import React, { useEffect, useRef, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import { IoBagAdd } from "react-icons/io5";

import "./Navbar.css";
import Link from 'next/link';
import HamburgerButton from './HamburgerButton';
import { navItems } from '@/utils/constants';
import { NavItems } from '@/utils/type';
import { usePathname } from 'next/navigation';
import gsap from "gsap";

const Navbar = () => {
    const pathname = usePathname();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<HTMLAnchorElement[]>([]);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!menuContainerRef.current || !menuRef.current) return;

        const tl = gsap.timeline({ paused: true });
        timelineRef.current = tl;

        gsap.set(menuContainerRef.current, {
            scaleX: 0,
            transformOrigin: "right center",
        });
        gsap.set(menuRef.current, { x: "-100%" });
        gsap.set(navItemsRef.current, { opacity: 0, x: -30 });

        tl.to(menuContainerRef.current, {
            scaleX: 1,
            duration: 0.4,
            ease: "power2.inOut",
        })
            .to(menuRef.current, {
                x: 0,
                duration: 0.4,
                ease: "power2.out",
            })
            .to(navItemsRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.3,
                ease: "power2.out",
                stagger: 0.08,
            });
    }, []);

    // Control animation direction
    useEffect(() => {
        if (timelineRef.current) {
            showMobileMenu
                ? timelineRef.current.timeScale(1.2).play()
                : timelineRef.current.timeScale(1.8).reverse();
        }
    }, [showMobileMenu]);
    return (
        <nav className='navbar'>
            <div className="navbar-logo-container flex justify-between w-full ">
                <div className='flex items-center gap-2'>
                    <div className="mobile-only-display  ">
                        <HamburgerButton
                            isOpen={showMobileMenu}
                            toggle={() => setShowMobileMenu((prev) => !prev)}
                        />
                    </div>
                    {/* <Image
                    src="/navbar-logo.svg"
                    height={30}
                    width={100}
                    alt="Mind craft logo"
                    className="navbar-logo cursor-pointer"
                    onClick={() => {
                        router.push("/");
                    }}
                /> */}
                    <Link href={"/"} aria-label='base route' className="font-poppins text-4xl font-bold"><span className='text-primary'>CW</span><span className='text-warning'>X</span></Link>

                    {/* <Link href={"/"} aria-label='base route' className="font-poppins text-4xl font-bold"><span className='text-primary'>still</span><span className='text-warning'>o</span></Link> */}
                </div>

                <Link
                    href={"/login"}
                    className={`mobile-only-display`}
                >
                    < CgProfile fontSize={24} />
                </Link>

            </div>

            <div className=' md:w-1/3 w-full flex items-center gap-2 my-2 px-4 py-2 rounded-xl bg-input'>
                <FiSearch />
                <input className='outline-none' placeholder='Search for products...' />
            </div>

            <div className="nav-items-container desktop-only-display">
                {navItems.map((item: NavItems, index) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            href={item.href}
                            key={index}
                            className={`nav-item ${isActive ? "active-nav-item" : ""} flex items-center gap-2`}
                        >
                            {item.icon && (
                                <span className="nav-item-icon">{<item.icon />}</span>
                            )}
                            {item.name}
                        </Link>
                    );
                })}
            </div>


            <div
                onClick={() => setShowMobileMenu((prev) => !prev)}
                ref={(ref) => {
                    if (ref) menuContainerRef.current = ref;
                }}
                className="mobile-nav-menu-container mobile-only-display"
            >
                <div
                    ref={(ref) => {
                        if (ref) menuRef.current = ref;
                    }}
                    className="mobile-nav-items-container "
                >
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                href={item.href}
                                ref={(ref) => {
                                    if (ref) navItemsRef.current[index] = ref;
                                }}
                                key={index}
                                className={`mobile-nav-item flex gap-2 items-center   ${isActive ? "active-nav-item" : ""
                                    }`}
                            >
                                {
                                    Icon && (
                                        <span className="mobile-nav-item-icon">{<Icon />}</span>
                                    )
                                }
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

        </nav>
    )
}

export default Navbar