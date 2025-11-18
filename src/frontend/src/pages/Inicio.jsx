import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Inicio() {
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [onTheAir, setOnTheAir] = useState([]);

  const API_KEY = "0babf46a08195017924e9f9c670fc7d6";
  const TMDB_BASE = "https://api.themoviedb.org/3";

  // TV Mejor valoradas (Banner)
  useEffect(() => {
    fetch(`${TMDB_BASE}/tv/top_rated?api_key=${API_KEY}&language=es-ES&page=1`)
      .then((res) => res.json())
      .then((data) => data.results && setTopRatedTV(data.results))
      .catch((err) => console.error("Error al traer TV top rated:", err));
  }, []);

  // Películas: Ahora en cartelera
  useEffect(() => {
    fetch(`${TMDB_BASE}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`)
      .then((res) => res.json())
      .then((data) => setNowPlaying(data.results || []))
      .catch((err) => console.error("Error al traer en cartelera:", err));
  }, []);

  // Películas: Mejor valoradas
  useEffect(() => {
    fetch(`${TMDB_BASE}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`)
      .then((res) => res.json())
      .then((data) => setTopRated(data.results || []))
      .catch((err) => console.error("Error al traer top rated pelis:", err));
  }, []);

  // Películas: Próximos estrenos
  useEffect(() => {
    fetch(`${TMDB_BASE}/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`)
      .then((res) => res.json())
      .then((data) => setUpcoming(data.results || []))
      .catch((err) => console.error("Error al traer upcoming:", err));
  }, []);

  // Series on the air
  useEffect(() => {
    fetch(`${TMDB_BASE}/tv/on_the_air?api_key=${API_KEY}&language=es-ES&page=1`)
      .then((res) => res.json())
      .then((data) => setOnTheAir(data.results || []));
  }, []);

  // Navbar scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        topRatedTV.length > 0 ? (prev + 1) % topRatedTV.length : 0
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [topRatedTV]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-4 transition-all duration-500 ${
          isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
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
            <img src="/lupas.svg" alt="Buscar" className="w-6 h-6 cursor-pointer hover:opacity-80 transition" />
          </Link>
          <img src="/guardarpeli.svg" alt="Guardar" className="w-6 h-6 cursor-pointer hover:opacity-80 transition" />
        </div>
      </nav>

      {/* BANNER PRINCIPAL */}
      <section id="banner" className="relative h-[90vh] flex items-center justify-start p-10 overflow-hidden">
        {topRatedTV.length > 0 ? (
          <>
            {topRatedTV.map((tv, index) => (
              <div
                key={tv.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`} alt={tv.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60"></div>
                {index === currentIndex && (
                  <div className="absolute bottom-24 left-12 z-30 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{tv.name}</h1>
                    <p className="text-gray-300 mb-6 text-lg max-w-xl line-clamp-3 drop-shadow-md">
                      {tv.overview || "Sin descripción disponible."}
                    </p>
                    <Link
                      to={`/detalles/${tv.id}?type=tv`}
                      className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition inline-block"
                    >
                      ▶ Ver más
                    </Link>
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => setCurrentIndex(prev => prev === 0 ? topRatedTV.length - 1 : prev - 1)}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-transparent text-white p-4 rounded-full z-40 text-2xl">
              <img src="/atrasador.svg" alt="Atras" className="w-6 h-6" />
            </button>
            <button onClick={() => setCurrentIndex(prev => topRatedTV.length > 0 ? (prev + 1) % topRatedTV.length : 0)}
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-transparent text-white p-4 rounded-full z-40 text-2xl">
              <img src="/siguientes.svg" alt="Siguiente" className="w-6 h-6" />
            </button>
          </>
        ) : (
          <p className="text-gray-400">Cargando series...</p>
        )}
      </section>

      {/* Otras secciones con botones de scroll usando imágenes */}
      <Section title="Destacados" data={nowPlaying} type="movie" />
      <Section title="Bienvenido a CINEVERSE!" data={topRated} type="movie" />
      <Section title="Lo mejor de CINEVERSE" data={upcoming} type="movie" />
      <Section title="Series que te van a encantar!" data={onTheAir} type="tv" />
    </div>
  );
}

// 🔹 Section reutilizable con scroll buttons con imágenes
function Section({ title, data, type }) {
  const sectionId = `section-${title.replace(/\s+/g, "")}`;

  const scrollLeft = () => {
    const container = document.getElementById(sectionId);
    container?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.getElementById(sectionId);
    container?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="px-10 py-8 relative">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex items-center relative">
        <button onClick={scrollLeft} className="absolute left-0 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full">
          <img src="/atrasador.svg" alt="Atras" className="w-6 h-6" />
        </button>

        <div id={sectionId} className="flex space-x-4 overflow-x-hidden scroll-smooth">
          {data.length === 0 ? (
            <p className="text-gray-400">Cargando...</p>
          ) : (
            data.map(item => (
              <Link
                to={`/detalles/${item.id}?type=${type}`}
                key={item.id}
                className="w-40 h-60 flex-shrink-0 rounded-lg relative cursor-pointer"
              >
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="w-full h-full object-cover rounded-lg" />
                <div className="absolute bottom-0 w-full bg-black/60 p-2 text-sm font-semibold text-white">
                  {item.title || item.name}
                </div>
              </Link>
            ))
          )}
        </div>

        <button onClick={scrollRight} className="absolute right-0 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full">
          <img src="/siguientes.svg" alt="Siguiente" className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}

export default Inicio;
