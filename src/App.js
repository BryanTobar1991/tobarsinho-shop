import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Formulario from "./components/Formulario";
import Login from "./components/Login";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Cart from "./components/Cart";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Escucha cambios de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.id === product.id);
      if (existing) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío ❌");
      return;
    }

    try {
      const userData = auth.currentUser;
      await addDoc(collection(db, "ordenes"), {
        userId: userData ? userData.uid : null,
        email: userData ? userData.email : null,
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price * item.qty, 0),
        fecha: Timestamp.now(),
      });

      alert("✅ Compra realizada con éxito");
      clearCart();
    } catch (error) {
      console.error("Error al guardar la orden:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">🛒 Tobarsinho shop</h1>

      {!user ? (
        <Login />
      ) : (
        <>
          <div className="mb-3 text-end">
            <span className="me-2">Hola, {user.email}</span>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>

          <div className="row">
            {/* Productos + Formulario */}
            <div className="col-lg-8">
              <ProductList addToCart={addToCart} />
              <Formulario />
            </div>

            {/* Carrito */}
            <div className="col-lg-4 mt-4 mt-lg-0">
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                handleCheckout={handleCheckout}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
