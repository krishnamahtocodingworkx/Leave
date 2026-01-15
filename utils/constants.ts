import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { NavItems } from "./type";
import { BsShop } from "react-icons/bs";
import React from "react";

export const navItems: NavItems[] = [
    {
        name: "Login",
        href: "/login",
        icon: CgProfile,
    },
    {
        name: "Signup",
        href: "/signup",
        icon: CgProfile,
    },
    {
        name: "Cart",
        href: "/cart",
        icon: FiShoppingCart,
    },
    {
        name: "Shop",
        href: "/shop",
        icon: BsShop,
    }
];