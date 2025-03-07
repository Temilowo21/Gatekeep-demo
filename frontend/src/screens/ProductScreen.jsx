import React from "react";  // ✅ Correct React import
import { useParams } from "react-router-dom";
import products from "../products";

const ProductScreen = () => {
    const { id: productId } = useParams();  // ✅ Destructure correctly
    const product = products.find((p) => p._id === productId);  // ✅ Use strict equality

    console.log(product);  // ✅ Debugging log

    return (
        <div>
            <h1>{product ? product.name : "Product Not Found"}</h1>
        </div>
    );
};

export default ProductScreen;
