import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // ✅ Mantiene la verificación del token
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    navigate("/"); // Redirige al inicio
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/porta-1v2.jpg')", // asegúrate que esté en src/public/
      }}
    >
      {/* Capa oscura encima del fondo */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Botón superior derecho */}
      <div className="absolute top-6 right-8 z-10">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-md shadow-lg transition-all"
          >
            Cerrar sesión
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-purple-700 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-md shadow-lg transition-all"
          >
            Iniciar sesión
          </Link>
        )}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent drop-shadow-lg">
          CINEVERSE
        </h1>

        {token ? (
          <>
            <p className="text-lg sm:text-xl font-semibold text-green-400 mb-8">
              ¡Has iniciado sesión exitosamente!
            </p>
            <button
              onClick={() => navigate("/inicio")}
              className="bg-white text-black font-bold px-6 py-3 rounded-md shadow-lg hover:bg-gray-200 transition-all"
            >
              Continuar
            </button>
          </>
        ) : (
          <>
            <p className="text-lg sm:text-xl font-semibold mb-2">
              SUMÉRGETE EN LAS HISTORIAS MÁS
            </p>
            <p className="text-lg sm:text-xl font-semibold mb-8">
              EMOCIONANTES DEL CINE Y LA TELEVISIÓN
            </p>

            <Link
              to="/register"
              className="bg-white text-black font-bold px-6 py-3 rounded-md shadow-lg hover:bg-gray-200 transition-all"
            >
              SUSCRÍBETE AHORA
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;