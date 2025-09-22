import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contactos"), {
        nombre,
        correo,
        mensaje,
        fecha: Timestamp.now(),
      });

      setEnviado(true);
      setNombre("");
      setCorreo("");
      setMensaje("");

      setTimeout(() => setEnviado(false), 3000);
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
    }
  };

  return (
    <div className="mt-4">
      <h3>📩 Formulario de Contacto</h3>
      {enviado && (
        <div className="alert alert-success">Mensaje enviado con éxito ✅</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre:</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Correo:</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mensaje:</label>
          <textarea
            className="form-control"
            rows="3"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Formulario;
