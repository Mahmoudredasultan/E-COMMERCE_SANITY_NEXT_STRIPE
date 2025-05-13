"use client";
import React, { useEffect } from "react";
import { utillty } from "../lib/utillty";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
const FireWorks = () => {
    useEffect(() => {
        utillty();
    }, []);
    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className="email-msg">
                    Check your email inbox for the receipt.
                </p>
                <p className="description">
                    if you have questionsn, please email
                    <a href="mailto:tuvsnake@gmail.com"> tuvsnake@gmail.com</a>
                </p>
                <Link href="/">
                    <button type="button" width={300} className="btn">
                        Countinue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FireWorks;
