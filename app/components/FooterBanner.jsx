import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/clint";
const FooterBanner = ({ footerData }) => {
    return (
        <div className="footer-banner-container">
            <div className="banner-desc">
                <div className="left">
                    <p>{footerData.descount} OFF</p>
                    <h3>{footerData.largeText1}</h3>
                    <h3>{footerData.largeText2}</h3>
                    <p>{footerData.saleTime}</p>
                </div>
                <div className="right">
                    <p>{footerData.smallText}</p>
                    <h3>{footerData.midText}</h3>
                    <p>{footerData.desc}</p>
                    <Link href={`/product/${footerData.product}`}>
                        <button type="button">{footerData.buttonText}</button>
                    </Link>
                </div>
                <img
                    src={urlFor(footerData.images).url()}
                    className="footer-banner-image"
                    alt=""
                />
            </div>
        </div>
    );
};

export default FooterBanner;
