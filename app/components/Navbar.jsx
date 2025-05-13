"use client";
import React from "react";
import Link from "next/link";
import { data } from "../context/StateContext";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
const Navbar = () => {
    const { allQtyProducts, showCart, setShowCart } = data();
    return (
        <div className="navbar-container">
            <p className="logo">
                <Link href={"/"}>PHONE HEADS</Link>
            </p>
            <button
                type="button"
                onClick={() => {
                    setShowCart(!showCart);
                }}
                className="cart-icon"
            >
                <AiOutlineShopping />
                <span className="cart-item-qty">{allQtyProducts}</span>
            </button>
            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;
