import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Buscar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const API_KEY = "0babf46a08195017924e9f9c670fc7d6";

  // Detecta scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buscar = async (e) => {
    e.preventDefault();

    if (query.trim() === "") return;

    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=es-ES&query=${query}`
    );

    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div className="bg-black min-h-screen text-white px-10 py-6">
      
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-4 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="text-2xl font-bold tracking-wide">CINEVERSE</div>

        <div className="flex space-x-8 text-sm font-semibold">
          <Link to="/inicio" className="hover:text-purple-400 transition">INICIO</Link>
          <Link to="/series" className="hover:text-purple-400 transition">SERIES</Link>
          <Link to="/peliculas" className="hover:text-purple-400 transition">PELICULAS</Link>
        </div>

        <div className="flex items-center space-x-4 text-xl">
          <Link to="/buscar">
            <img src="/lupas.svg" alt="Buscar" className="w-6 h-6 cursor-pointer hover:opacity-80" />
          </Link>
          <img src="/guardarpeli.svg" alt="Guardar" className="w-6 h-6 cursor-pointer hover:opacity-80" />
        </div>
      </nav>

      <h1 className="text-3xl font-bold mt-24 mb-6">Buscar</h1>

      {/* BARRA DE BUSQUEDA */}
      <form onSubmit={buscar}>
        <input
          type="text"
          className="w-full p-4 bg-black/40 border border-white/20 rounded-lg text-white"
          placeholder="Encuentra películas, series y más..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* RESULTADOS */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Resultados</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {results.map((item) => {
          const img = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "/noimage.png";

          return (
            <Link to={`/detalles/${item.id}`} key={item.id} className="group">
              <img
                src={img}
                className="rounded-lg w-full h-60 object-cover group-hover:opacity-70 transition"
                alt={item.title || item.name}
              />

              <p className="mt-2 text-sm font-medium">
                {item.title || item.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Buscar;
