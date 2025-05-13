"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiFillStar,
    AiOutlineStar,
} from "react-icons/ai";
import { urlFor } from "../lib/clint";
import Product from "./Product";
import { data } from "../context/StateContext";
import gitStripe from "../lib/stripeFront";

const ProductPage = ({ productSlug, product, products }) => {
    const handel = async (product, qty1) => {
        toast.loading(`Please wait to payment ${qty1} from ${product.name}`);
        const stripe = await gitStripe();

        const resp = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([{ product: product, qty: qty1 }]),
        });
        if (resp.status === 500) {
            return;
        }
        const deta = await resp.json();
        stripe.redirectToCheckout({ sessionId: deta.id });
    };
    //get data from contextapi
    const { qty, qtyProducts, setQtyProducts } = data();
    //useStates
    const [index, setIndex] = useState(0);
    const [qty1, setQty1] = useState(1);
    useEffect(() => {
        if (qtyProducts.length >= 1) {
            const findProduct = qtyProducts.find(
                (el) => el.product._id === product._id
            );
            findProduct && setQty1(findProduct.qty);
        }
    }, [qtyProducts]);
    //functions
    const qtyIncress = () => {
        setQty1(qty1 + 1);
    };

    const qtyDcress = () => {
        if (qty1 > 1) {
            setQty1(qty1 - 1);
        }
    };

    const addItem = () => {
        const checkProductInCart = qtyProducts.find(
            (el) => el.product._id === product._id
        );
        if (!checkProductInCart) {
            let copi = qtyProducts.slice();
            copi.push({ product, qty: qty1 });

            setQtyProducts(copi);
            toast(`Add ${qty1} to your cart`);
        } else {
            let copiSecond = qtyProducts.slice();

            let copi = copiSecond.filter((el) => {
                return el.product._id !== product._id;
            });
            copi.push({ product, qty: qty1 });
            console.log(copi);
            setQtyProducts(copi);
            toast.success(`Add ${qty1} to your cart`);
        }
    };

    useEffect(() => {
        if (qtyProducts) {
            const checkProductExsest = qtyProducts.find(
                (el) => el.productId === product._id
            );
            if (checkProductExsest) {
                setQty1(checkProductExsest.qty);
            }
        }
    }, [qtyProducts]);
    return (
        <div>
            {" "}
            <div className="product-detail-container">
                <div>
                    {" "}
                    <div className="image-container">
                        <img
                            className="product-detail-image"
                            src={urlFor(product.images[index]).url()}
                            alt=""
                        />
                    </div>
                    <div className="small-images-container">
                        {product.images.map((image, i) => (
                            <img
                                className={
                                    i === index
                                        ? "small-image selected-image "
                                        : "small-image"
                                }
                                onMouseEnter={() => {
                                    setIndex(i);
                                }}
                                src={urlFor(image).url()}
                                key={i}
                            />
                        ))}
                    </div>
                </div>
                <div className="product-detail-desc">
                    <h1>{product.name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details :</h4>
                    <p>{product.details}</p>
                    <p className="price">${product.price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={qtyDcress}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num">{qty1}</span>
                            <span className="plus" onClick={qtyIncress}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button
                            type="button"
                            className="add-to-cart"
                            onClick={addItem}
                        >
                            Add to cart
                        </button>
                        <button
                            type="button"
                            className="buy-now"
                            onClick={() => {
                                handel(product, qty1);
                            }}
                        >
                            Bay Now
                        </button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
