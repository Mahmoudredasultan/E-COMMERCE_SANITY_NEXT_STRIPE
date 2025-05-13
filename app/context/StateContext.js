"use client";
import React, { useEffect, useState, createContext, useContext } from "react";

const context = createContext();
const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [qty, setQty] = useState(0);
    const [qtyProducts, setQtyProducts] = useState([]);
    const [allQtyProducts, setAllQtyProducts] = useState(0);
    useEffect(() => {
        let allQty = 0;
        for (let index = 0; index < qtyProducts.length; index++) {
            allQty = allQty + qtyProducts[index].qty;
        }
        setAllQtyProducts(allQty);
    }, [qtyProducts]);
    return (
        <context.Provider
            value={{
                qty,
                qtyProducts,
                setQtyProducts,
                allQtyProducts,
                showCart,
                setShowCart,
            }}
        >
            {children}
        </context.Provider>
    );
};
const data = () => useContext(context);
export { StateContext, data };
