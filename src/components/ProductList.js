import React from "react";
import ProductItem from "./ProductItem";

// Lista de productos
const products = [
  { id: 1, name: "Camiseta", price: 15000, img: "/images/camiseta.jpeg" },
  { id: 2, name: "Pantalón", price: 25000, img: "/images/pantalon.jpeg" },
  { id: 3, name: "Gorra", price: 8000, img: "/images/gorra.jpeg" },
];

function ProductList({ addToCart }) {
  return (
    <div className="mb-4">
      <h3 className="mb-3">🛍️ Productos</h3>
      <div className="row">
        {products.map((prod) => (
          <div className="col-md-6 col-lg-4 mb-4" key={prod.id}>
            <ProductItem product={prod} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
