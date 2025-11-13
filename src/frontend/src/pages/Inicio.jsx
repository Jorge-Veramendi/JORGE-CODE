import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Inicio() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [airingTodaySeries, setAiringTodaySeries] = useState([]);

  //series que te van a encantar
  useEffect(() => {
    const API_KEY = "0babf46a08195017924e9f9c670fc7d6";
    const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=0babf46a08195017924e9f9c670fc7d6&language=es-ES&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAiringTodaySeries(data.results || []);
      })
      .catch((err) => console.error("Error al traer series:", err));
  }, []);

  //destacados
  useEffect(() => {
    const API_KEY = "0babf46a08195017924e9f9c670fc7d6";
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=0babf46a08195017924e9f9c670fc7d6&language=es-ES&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);
      })
      .catch((err) =>
        console.error("Error al traer peliculas populares:", err)
      );
  }, []);

  //seccion lo mejor
  useEffect(() => {
    const API_KEY = "0babf46a08195017924e9f9c670fc7d6";
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=0babf46a08195017924e9f9c670fc7d6&language=es-ES&page=1"
    )
      .then((res) => res.json())
      .then((data) => setTopRatedMovies(data.results || []))
      .catch((err) => console.error("Error al traer top rated:", err));
  }, []);

  // 🔹 Detectar scroll para cambiar el color del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Cargar películas "Top Rated" carrusel
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=0babf46a08195017924e9f9c670fc7d6&language=es-ES&page=1"
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error al cargar películas:", error);
      }
    };
    fetchMovies();
  }, []);

  // 🔹 Cambio automático del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        movies.length > 0 ? (prev + 1) % movies.length : 0
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [movies]);

  // Bienvenido a CINEVERSE
  useEffect(() => {
    const API_KEY = "0babf46a08195017924e9f9c670fc7d6";
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=0babf46a08195017924e9f9c670fc7d6&language=es-ES&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNowPlayingMovies(data.results || []);
      })
      .catch((err) => console.error("Error al traer now playing:", err));
  }, []);

  //proximos estrenos
  useEffect(() => {
    const API_KEY = "0babf46a08195017924e9f9c670fc7d6";
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=0babf46a08195017924e9f9c670fc7d6&language=es-ES&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUpcomingMovies(data.results || []); // Guardamos los próximos estrenos
      })
      .catch((err) => console.error("Error al traer próximos estrenos:", err));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 🔹 NAVBAR con efecto scroll */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-4 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
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
      {/* 🔹 BANNER PRINCIPAL - CARRUSEL CON FADE */}
      <section
        id="inicio"
        className="relative h-[90vh] flex items-center justify-start p-10 mt-[0px] overflow-hidden"
      >
        {movies.length > 0 ? (
          <>
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* 🔹 Imagen de fondo */}
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

                {/* 🔹 Capa oscura sobre la imagen */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* 🔹 Contenido de texto */}
                {index === currentIndex && (
                  <div className="absolute bottom-24 left-12 z-30 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                      {movie.title}
                    </h1>
                    <p className="text-gray-300 mb-6 text-lg max-w-xl line-clamp-3 drop-shadow-md">
                      {movie.overview && movie.overview.trim() !== ""
                        ? movie.overview
                        : "Sin descripción disponible."}
                    </p>
                    <button className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                      ▶ Ver
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* 🔹 Botones manuales */}
            <button
              onClick={() =>
                setCurrentIndex(
                  (currentIndex - 1 + movies.length) % movies.length
                )
              }
              className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white text-2xl px-3 py-2 rounded-full z-40"
            >
              ◀
            </button>
            <button
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % movies.length)
              }
              className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white text-2xl px-3 py-2 rounded-full z-40"
            >
              ▶
            </button>
          </>
        ) : (
          <p className="text-gray-400">Cargando...</p>
        )}
      </section>
      {/* 🔹 SECCIÓN DESTACADOS */}
      <section className="px-10 py-8 relative">
        <h2 className="text-2xl font-semibold mb-4">Destacados</h2>

        {/* Contenedor del carrusel */}
        <div className="flex items-center relative">
          {/* Botón anterior */}
          <button
            onClick={() => {
              const container = document.getElementById("carousel");
              container.scrollBy({ left: -300, behavior: "smooth" });
            }}
            className="absolute left-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ◀
          </button>

          {/* Contenedor desplazable */}
          <div
            id="carousel"
            className="flex space-x-4 overflow-x-hidden scroll-smooth"
          >
            {popularMovies.map((movie) => (
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
            ))}
          </div>

          {/* Botón siguiente */}
          <button
            onClick={() => {
              const container = document.getElementById("carousel");
              container.scrollBy({ left: 300, behavior: "smooth" });
            }}
            className="absolute right-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ▶
          </button>
        </div>
      </section>
      {/* 🔹 SECCIÓN BIENVENIDO */}
      <section className="px-10 py-8 relative">
        <h2 className="text-2xl font-semibold mb-4">
          ¡Bienvenido a CINEVERSE!
        </h2>

        <div className="flex items-center relative">
          {/* Botón anterior */}
          <button
            onClick={() => {
              const container = document.getElementById("nowPlayingCarousel");
              container.scrollBy({ left: -300, behavior: "smooth" });
            }}
            className="absolute left-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ◀
          </button>

          {/* Contenedor desplazable */}
          <div
            id="nowPlayingCarousel"
            className="flex space-x-4 overflow-x-hidden scroll-smooth"
          >
            {nowPlayingMovies.map((movie) => (
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
            ))}
          </div>

          {/* Botón siguiente */}
          <button
            onClick={() => {
              const container = document.getElementById("nowPlayingCarousel");
              container.scrollBy({ left: 300, behavior: "smooth" });
            }}
            className="absolute right-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ▶
          </button>
        </div>
      </section>
      {/* 🔹 SECCIÓN LO MEJOR */}
      <section className="px-10 py-8 relative">
        <h2 className="text-2xl font-semibold mb-4">Lo mejor de CINEVERSE</h2>

        <div className="flex items-center relative">
          {/* Botón anterior */}
          <button
            onClick={() => {
              const container = document.getElementById("topRatedCarousel");
              container.scrollBy({ left: -300, behavior: "smooth" });
            }}
            className="absolute left-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ◀
          </button>

          {/* Contenedor desplazable */}
          <div
            id="topRatedCarousel"
            className="flex space-x-4 overflow-x-hidden scroll-smooth"
          >
            {topRatedMovies.length === 0 ? (
              <p className="text-gray-400">Cargando...</p>
            ) : (
              topRatedMovies.map((movie) => (
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

          {/* Botón siguiente */}
          <button
            onClick={() => {
              const container = document.getElementById("topRatedCarousel");
              container.scrollBy({ left: 300, behavior: "smooth" });
            }}
            className="absolute right-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ▶
          </button>
        </div>
      </section>

      {/* 🔹 SECCIÓN PROXIMOS ESTRENOS */}
      <section className="px-10 py-8 relative">
        <h2 className="text-2xl font-semibold mb-4">Próximos Estrenos</h2>

        <div className="flex items-center relative">
          {/* Botón anterior */}
          <button
            onClick={() => {
              const container = document.getElementById("upcomingCarousel");
              container.scrollBy({ left: -300, behavior: "smooth" });
            }}
            className="absolute left-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ◀
          </button>

          {/* Contenedor desplazable */}
          <div
            id="upcomingCarousel"
            className="flex space-x-4 overflow-x-hidden scroll-smooth"
          >
            {upcomingMovies.length === 0 ? (
              <p className="text-gray-400">Cargando...</p>
            ) : (
              upcomingMovies.map((movie) => (
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

          {/* Botón siguiente */}
          <button
            onClick={() => {
              const container = document.getElementById("upcomingCarousel");
              container.scrollBy({ left: 300, behavior: "smooth" });
            }}
            className="absolute right-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ▶
          </button>
        </div>
      </section>

      {/* 🔹 SECCIÓN SERIES QUE TE VAN A ENCANTAR */}
      <section className="px-10 py-8 relative">
        <h2 className="text-2xl font-semibold mb-4">
          Series que te van a encantar
        </h2>

        <div className="flex items-center relative">
          {/* Botón anterior */}
          <button
            onClick={() => {
              const container = document.getElementById("seriesCarousel");
              container.scrollBy({ left: -300, behavior: "smooth" });
            }}
            className="absolute left-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ◀
          </button>

          {/* Contenedor desplazable */}
          <div
            id="seriesCarousel"
            className="flex space-x-4 overflow-x-hidden scroll-smooth"
          >
            {airingTodaySeries.length === 0 ? (
              <p className="text-gray-400">Cargando...</p>
            ) : (
              airingTodaySeries.map((serie) => (
                <div
                  key={serie.id}
                  className="w-40 h-60 flex-shrink-0 rounded-lg relative"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                    alt={serie.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 w-full bg-black/60 p-2 text-sm font-semibold text-white">
                    {serie.name}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Botón siguiente */}
          <button
            onClick={() => {
              const container = document.getElementById("seriesCarousel");
              container.scrollBy({ left: 300, behavior: "smooth" });
            }}
            className="absolute right-0 z-20 bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full"
          >
            ▶
          </button>
        </div>
      </section>
    </div>
  );
}

export default Inicio;
