import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Peliculas() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const API_KEY = "0babf46a08195017924e9f9c670fc7d6";

  // 🔹 Películas populares (para el banner)
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results || []))
      .catch((err) => console.error("Error al traer películas populares:", err));
  }, []);

  // 🔹 Películas en cartelera (Now Playing)
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`
    )
      .then((res) => res.json())
      .then((data) => setNowPlaying(data.results || []))
      .catch((err) => console.error("Error al traer películas en cartelera:", err));
  }, []);

  // 🔹 Películas mejor valoradas
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`
    )
      .then((res) => res.json())
      .then((data) => setTopRated(data.results || []))
      .catch((err) => console.error("Error al traer top rated:", err));
  }, []);

  // 🔹 Próximos estrenos
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`
    )
      .then((res) => res.json())
      .then((data) => setUpcoming(data.results || []))
      .catch((err) => console.error("Error al traer próximos estrenos:", err));
  }, []);

  // 🔹 Scroll Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        popularMovies.length > 0 ? (prev + 1) % popularMovies.length : 0
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [popularMovies]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 🔹 NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-4 transition-all duration-500 ${
          isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="text-2xl font-bold tracking-wide">CINEVERSE</div>

        <div className="flex space-x-8 text-sm font-semibold">
          <Link to="/inicio" className="hover:text-purple-400 transition">
            INICIO
          </Link>
          <Link to="/series" className="hover:text-purple-400 transition">
            SERIES
          </Link>
          <Link to="/peliculas" className="hover:text-purple-400 transition">
            PELÍCULAS
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-xl">
          <img
            src="/lupas.svg"
            alt="Buscar"
            className="w-6 h-6 cursor-pointer hover:opacity-80 transition"
          />
          <img
            src="/guardarpeli.svg"
            alt="Guardar"
            className="w-6 h-6 cursor-pointer hover:opacity-80 transition"
          />
        </div>
      </nav>

      {/* 🔹 BANNER PRINCIPAL */}
      <section
        id="banner"
        className="relative h-[90vh] flex items-center justify-start p-10 overflow-hidden"
      >
        {popularMovies.length > 0 ? (
          <>
            {popularMovies.map((movie, index) => (
              <div
                key={movie.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>

                {index === currentIndex && (
                  <div className="absolute bottom-24 left-12 z-30 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                      {movie.title}
                    </h1>
                    <p className="text-gray-300 mb-6 text-lg max-w-xl line-clamp-3 drop-shadow-md">
                      {movie.overview || "Sin descripción disponible."}
                    </p>
                    <button className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                      ▶ Ver
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-400">Cargando...</p>
        )}
      </section>

      {/* 🔹 SECCIONES */}
      <Section title="En Cartelera" data={nowPlaying} id="nowPlaying" />
      <Section title="Mejor Valoradas" data={topRated} id="topRated" />
      <Section title="Próximos Estrenos" data={upcoming} id="upcoming" />
    </div>
  );
}

// 🔹 COMPONENTE REUTILIZABLE DE SECCIÓN
function Section({ title, data, id }) {
  return (
    <section className="px-10 py-8 relative">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex items-center relative">
        <button
          onClick={() => {
            const container = document.getElementById(id);
            container.scrollBy({ left: -300, behavior: "smooth" });
          }}
          className="absolute left-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
        >
          ◀
        </button>

        <div id={id} className="flex space-x-4 overflow-x-hidden scroll-smooth">
          {data.length === 0 ? (
            <p className="text-gray-400">Cargando...</p>
          ) : (
            data.map((movie) => (
              <div
                key={movie.id}
                className="w-40 h-60 flex-shrink-0 rounded-lg relative"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 w-full bg-black/60 p-2 text-sm font-semibold text-white">
                  {movie.title}
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => {
            const container = document.getElementById(id);
            container.scrollBy({ left: 300, behavior: "smooth" });
          }}
          className="absolute right-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
        >
          ▶
        </button>
      </div>
    </section>
  );
}

export default Peliculas;
