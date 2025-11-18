import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

function Recuperar() {
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  const enviarCorreo = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_bs8um9r",
        "template_cq6inbe",
        { user_email: correo },
        "ysTOha3gPeUeLHLZ5"
      );

      navigate("/correo-enviado", { state: { correo } });
    } catch (error) {
      console.error("Error al enviar correo:", error);
      alert("Hubo un problema al enviar el correo.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/fondos/cine.jpg')" }}
    >
      <div className="bg-black/60 p-8 rounded-xl backdrop-blur-md w-[500px] border border-white/10">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Recuperar cuenta
        </h1>

        <form onSubmit={enviarCorreo}>
          <label className="text-gray-300">Ingresa tu correo</label>
          <input
            type="email"
            className="w-full p-3 mt-2 rounded-md bg-black/40 text-white border border-white/20"
            placeholder="correo@ejemplo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md font-semibold transition"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Recuperar;