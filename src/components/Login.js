import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [modo, setModo] = useState("login"); // "login" o "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleModo = () => {
    setModo(modo === "login" ? "register" : "login");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (modo === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">
          {modo === "login" ? "🔑 Iniciar Sesión" : "📝 Registrarse"}
        </h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="usuario@correo.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Min 6 caracteres"
            />
          </div>
          <button type="submit" className={`btn w-100 ${modo === "login" ? "btn-primary" : "btn-success"}`}>
            {modo === "login" ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <div className="text-center mt-3">
          {modo === "login" ? (
            <span>
              ¿No tienes cuenta?{" "}
              <button className="btn btn-link p-0" onClick={toggleModo}>
                Regístrate
              </button>
            </span>
          ) : (
            <span>
              ¿Ya tienes cuenta?{" "}
              <button className="btn btn-link p-0" onClick={toggleModo}>
                Inicia Sesión
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
