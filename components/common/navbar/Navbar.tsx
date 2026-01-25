"use client";
import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoAdd } from "react-icons/io5";

import "./Navbar.css";
import Link from 'next/link';
import HamburgerButton from './HamburgerButton';
import { navItems } from '@/utils/constants';
import { NavItems } from '@/utils/type';
import { usePathname } from 'next/navigation';
import gsap from "gsap";
import { SHOW_ERROR_TOAST } from '@/utils/toasts';
import { userServices } from '@/services/user.service';
import { LocationResult } from '@/utils/modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { saveOwnLocation } from '@/store/auth/authSlice';

const Navbar = () => {
    const pathname = usePathname();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<HTMLAnchorElement[]>([]);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const { token, ownLocation } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const fetchLocation = () => {
        if (!navigator.geolocation) {
            SHOW_ERROR_TOAST("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    const data = await userServices.fetchOwnAddress(latitude, longitude) as LocationResult;

                    if (!data) {
                        SHOW_ERROR_TOAST("Unable to fetch address");
                        return;
                    }

                    console.log("my address:", data);
                    dispatch(saveOwnLocation(data));

                    const dataToSend = {
                        lat: Number(data.lat),
                        lng: Number(data.lon),
                        address: data.display_name,
                    };
                    console.log("token :", token);
                    if (token && token.length && !ownLocation) await userServices.saveOwnLocation(dataToSend);
                } catch (error: unknown) {
                    console.log("error :", error);
                }
            },
            (err) => {
                SHOW_ERROR_TOAST(err.message);
            },
            { enableHighAccuracy: true }
        );

    };

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
        fetchLocation();
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
                    {/* <Link href={"/"} aria-label='base route' className="font-poppins text-4xl font-bold"><span className='text-primary'>CW</span><span className='text-warning'>X</span></Link> */}

                    <Link href={"/"} aria-label='base route' className="font-poppins text-4xl font-bold"><span className='text-primary'>still</span><span className='text-warning'>o</span></Link>
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
                {
                    token && <Link
                        href={"sell"}
                        className={`nav-item ${pathname === "/sell" ? "active-nav-item" : ""} flex items-center gap-2`}
                    >
                        <span className="nav-item-icon">{<IoAdd />}</span>
                        {"Sell"}
                    </Link>
                }
                {
                    token ? <Link
                        href={"/profile"}
                        className={`nav-item ${pathname === "/profile" ? "active-nav-item" : ""} flex items-center gap-2`}
                    >
                        <span className="nav-item-icon">{<CgProfile />}</span>
                        {"Profile"}
                    </Link> : <Link
                        href={"/login"}
                        className={`nav-item ${pathname === "/profile" ? "active-nav-item" : ""} flex items-center gap-2`}
                    >
                        <span className="nav-item-icon">{<CgProfile />}</span>
                        {"Login"}
                    </Link>
                }
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