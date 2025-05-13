"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
    AiOutlineLeft,
    AiOutlineShopping,
    AiOutlineMinus,
    AiOutlinePlus,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { data } from "../context/StateContext";
import { urlFor } from "../lib/clint";
import gitStripe from "../lib/stripeFront";
import toast from "react-hot-toast";
const handel = async (qtyProducts) => {
    toast.loading(`loading ...`);
    const stripe = await gitStripe();

    const resp = await fetch("/api/stripe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(qtyProducts),
    });
    if (resp.status === 500) {
        return;
    }
    const deta = await resp.json();
    stripe.redirectToCheckout({ sessionId: deta.id });
};
const Cart = () => {
    const {
        setShowCart,
        showCart,
        qtyProducts,
        setQtyProducts,
        allQtyProducts,
    } = data();
    const cartRef = useRef();
    const [totalPrice, setTotalPrice] = useState(0);
    const qtyIncress = (index) => {
        let productData = [...qtyProducts];
        productData[index].qty = productData[index].qty + 1;
        setQtyProducts(productData);
    };
    useEffect(() => {
        let total = 0;
        qtyProducts.map((el) => {
            total = total + el.product.price * el.qty;
            setTotalPrice(total);
        });
    }, [qtyProducts]);
    const qtyDcress = (index) => {
        if (qtyProducts[index].qty > 1) {
            let productData = [...qtyProducts];
            productData[index].qty = productData[index].qty - 1;
            setQtyProducts(productData);
        }
    };
    const removeFunc = (index) => {
        let productData = [...qtyProducts];
        productData.splice(index, 1);
        setQtyProducts(productData);
    };

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => {
                        setShowCart(false);
                    }}
                >
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">
                        {allQtyProducts} items
                    </span>
                </button>
                {qtyProducts.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your Shoping Page Is Empty</h3>
                        <Link href={"/"}>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                    setShowCart(false);
                                }}
                            >
                                Continue Shoping
                            </button>
                        </Link>
                    </div>
                )}
                <div className="product-container">
                    {qtyProducts.length >= 1 &&
                        qtyProducts.map((item, index) => (
                            <div className="product" key={item.product._id}>
                                <img
                                    src={urlFor(item.product.images[0]).url()}
                                    className="cart-product-image"
                                />
                                <div className="item-desc">
                                    <div className="flex top">
                                        <h5>{item.product.name}</h5>
                                        <h4>
                                            ${item.product.price * item.qty}
                                        </h4>
                                    </div>
                                    <div className="flex bottom">
                                        <div>
                                            <p className="quantity-desc">
                                                <span
                                                    className="minus"
                                                    onClick={() => {
                                                        qtyDcress(index);
                                                    }}
                                                >
                                                    <AiOutlineMinus />
                                                </span>
                                                <span className="num">
                                                    {item.qty}
                                                </span>
                                                <span
                                                    className="plus"
                                                    onClick={() => {
                                                        qtyIncress(index);
                                                    }}
                                                >
                                                    <AiOutlinePlus />
                                                </span>
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="remove-item"
                                            onClick={() => {
                                                removeFunc(index);
                                            }}
                                        >
                                            <TiDeleteOutline />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {qtyProducts.length > 0 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Suptotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => handel(qtyProducts)}
                            >
                                Pay With Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
