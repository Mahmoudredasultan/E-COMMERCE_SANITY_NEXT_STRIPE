import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/clint";
const Product = ({ product: { images, name, slug, price } }) => {
    return (
        <Link href={`/product/${slug.current}`}>
            <div className="product-card">
                <img
                    className="product-image"
                    src={urlFor(images && images[0]).url()}
                    width={250}
                    height={250}
                />
                <p className="product-name">{name}</p>
                <p className="product-price">${price}</p>
            </div>
        </Link>
    );
};

export default Product;
