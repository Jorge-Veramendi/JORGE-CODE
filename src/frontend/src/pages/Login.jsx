import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("authToken", data.data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center relative"
      style={{ backgroundImage: 'url("/porta-1v2.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
      <div
        className="relative z-10 w-full max-w-md p-8 space-x-6 bg-transparent rounded-xl shadow-2xl border-2 border-white-600"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundImage: 'url("tu-imagen-de-fondo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white font-semibold bg-purple-600 border border-transparent rounded-2xl shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ingresar
            </button>
          </div>
        </form>

        <div className="flex items-center mt-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm font-medium text-gray-500">O</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="text-center mt-6">
          <a
            className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            href={GOOGLE_AUTH_URL}
          >
            Iniciar sesión con Google
          </a>
        </div>

        <p className="text-sm text-center text-gray-600 mt-4">
          ¿Primera vez?
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500 ml-2"
          >
            Suscribete Aqui
          </Link>
        </p>

        <Link
            to="/recuperar"
            className="block text-center text-sm font-medium text-blue-600 hover:text-blue-500 mt-2">
            ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
}

export default Login;
