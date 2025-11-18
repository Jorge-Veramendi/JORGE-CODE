import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CorreoEnviado() {
  const location = useLocation();
  const navigate = useNavigate();

  const correo = location.state?.correo || "tu correo";

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/fondos/cine.jpg')" }}
    >
      <div className="bg-black/60 p-8 rounded-xl backdrop-blur-md w-[500px] border border-white/10">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          CORREO ENVIADO
        </h1>

        <p className="text-gray-300 text-center">
          Te enviamos un correo con instrucciones para restablecer la contraseña en <br />
          <span className="text-white font-bold">{correo}</span>.
          <br /><br />
          Si no lo ves en tu bandeja de entrada, revisa tu carpeta de correo no deseado.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-md font-semibold transition"
        >
          Regresar al inicio
        </button>
      </div>
    </div>
  );
}

export default CorreoEnviado;