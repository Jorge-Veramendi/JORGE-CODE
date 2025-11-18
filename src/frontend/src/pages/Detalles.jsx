import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";

function Detalles() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type"); // "movie" o "tv"
  const [data, setData] = useState(null);
  const [type, setType] = useState(typeParam || "movie");
  const [isScrolled, setIsScrolled] = useState(false);
  const API_KEY = "0babf46a08195017924e9f9c670fc7d6";
  const TMDB_BASE = "https://api.themoviedb.org/3";

  // SCROLL DEL NAVBAR
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FETCH DATOS
  useEffect(() => {
    async function fetchData() {
      try {
        const endpoint =
          type === "movie"
            ? `${TMDB_BASE}/movie/${id}?api_key=${API_KEY}&language=es-ES`
            : `${TMDB_BASE}/tv/${id}?api_key=${API_KEY}&language=es-ES`;

        const res = await fetch(endpoint);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error("Error al cargar detalles:", err);
      }
    }

    fetchData();
  }, [id, type]);

  if (!data) {
    return (
      <div className="text-center text-white mt-20 text-xl">
        Cargando o no encontrado...
      </div>
    );
  }

  // Función para guardar (puedes adaptarla a tu lógica)
  const handleGuardar = () => {
    console.log("Guardado:", data.title || data.name);
    alert(`Guardaste: ${data.title || data.name}`);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* NAVBAR */}
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-4 transition-all duration-500 ${
          isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-black/80"
        }`}
      >
        <div className="text-2xl font-bold tracking-wide text-white">
          CINEVERSE
        </div>

        <div className="flex space-x-8 text-sm font-semibold">
          <Link
            to="/inicio"
            className="text-white hover:text-purple-400 transition"
          >
            INICIO
          </Link>
          <Link
            to="/series"
            className="text-white hover:text-purple-400 transition"
          >
            SERIES
          </Link>
          <Link
            to="/peliculas"
            className="text-white hover:text-purple-400 transition"
          >
            PELICULAS
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-xl">
          <Link to="/buscar">
            <img
              src="/lupas.svg"
              alt="Buscar"
              className="w-6 h-6 cursor-pointer hover:opacity-80 transition"
            />
          </Link>
          <img
            src="/guardarpeli.svg"
            alt="Guardar"
            className="w-6 h-6 cursor-pointer hover:opacity-80 transition"
            onClick={handleGuardar}
          />
        </div>
      </nav>

      {/* BANNER DETALLES */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center p-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Contenido principal */}
        <div className="absolute bottom-24 left-12 z-30 max-w-3xl text-white">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            {data.title || data.name}
          </h1>
          <p className="text-lg mb-6 line-clamp-3 drop-shadow-md">
            {data.overview || "Sin descripción disponible."}
          </p>
          {type === "movie" && (
            <p className="text-lg mb-2">
              🎬 <b>Duración:</b> {data.runtime} min
            </p>
          )}
          {type === "tv" && (
            <p className="text-lg mb-2">
              📺 <b>Temporadas:</b> {data.number_of_seasons}
            </p>
          )}
          <p className="text-lg mb-4">
            ⭐ <b>Rating:</b> {data.vote_average}
          </p>

          {/* Botón guardar */}
          <button
            onClick={handleGuardar}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition mb-4"
          >
            <img src="/guardarpeli.svg" alt="Guardar" className="w-5 h-5" />
            Guardar
          </button>

          {/* Botón volver */}
          <Link
            to="/inicio"
            className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition inline-block"
          >
            ◀ Volver
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Detalles;
