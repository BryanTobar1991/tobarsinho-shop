import React from "react";

function ProductItem({ product, addToCart }) {
  return (
    <div className="card h-100 shadow-sm hover-shadow">
      <img
        src={product.img}
        className="card-img-top"
        alt={product.name}
        style={{ height: "320px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <button
          className="btn btn-primary mt-auto"
          onClick={() => addToCart(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
