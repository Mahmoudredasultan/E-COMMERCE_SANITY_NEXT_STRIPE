import React from "react";
import ProductPage from "../../components/ProductPage";
import { clint } from "../../lib/clint";
const getProduct = async (slug) => {
    const quiry = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuiry = '*[_type == "product"]';
    const product = await clint.fetch(quiry);
    const products = await clint.fetch(productsQuiry);
    return [product, products];
};
export default async function page({ params }) {
    const productSlug = await params;
    const [product, products] = await getProduct(productSlug.slug);
    return (
        <ProductPage
            productSlug={productSlug}
            product={product}
            products={products}
        />
    );
}
