import React from "react";

function Cart({ cart, removeFromCart, clearCart, handleCheckout }) {
  return (
    <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
      <div className="card-body">
        <h4 className="card-title text-center">🛒 Carrito</h4>
        {cart.length === 0 ? (
          <p className="text-muted text-center">El carrito está vacío</p>
        ) : (
          <>
            <ul className="list-group list-group-flush mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {item.name} <br />
                    <small>
                      ${item.price} x {item.qty}
                    </small>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
            <h5 className="text-end">
              Total: $
              {cart.reduce((acc, item) => acc + item.price * item.qty, 0)}
            </h5>
            <button
              className="btn btn-success w-100 mt-2"
              onClick={handleCheckout}
            >
              Finalizar Compra
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
