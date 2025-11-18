import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Series() {
  const [popularSeries, setPopularSeries] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const API_KEY = "0babf46a08195017924e9f9c670fc7d6";

  // SERIES POPULARES (BANNER)
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-ES&page=1`
    )
      .then((res) => res.json())
      .then((data) => setPopularSeries(data.results || []));
  }, []);

  // SERIES AL AIRE HOY
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=es-ES&page=1`
    )
      .then((res) => res.json())
      .then((data) => setAiringToday(data.results || []));
  }, []);

  // SERIES TOP RATED
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es-ES&page=1`
    )
      .then((res) => res.json())
      .then((data) => setTopRatedSeries(data.results || []));
  }, []);

  // SERIES ON THE AIR
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=es-ES&page=1`
    )
      .then((res) => res.json())
      .then((data) => setOnTheAir(data.results || []));
  }, []);

  // NAVBAR SCROLL
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CARRUSEL AUTO
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        popularSeries.length > 0 ? (prev + 1) % popularSeries.length : 0
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [popularSeries]);

  return (
    <div className="bg-black text-white min-h-screen">
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
          <Link to="/inicio" className="hover:text-purple-400 transition">
            INICIO
          </Link>
          <Link to="/series" className="hover:text-purple-400 transition">
            SERIES
          </Link>
          <Link to="/peliculas" className="hover:text-purple-400 transition">
            PELICULAS
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-xl">
          <Link to="/buscar">
            <img src="/lupas.svg" className="w-6 h-6 cursor-pointer" />
          </Link>
          <img src="/guardarpeli.svg" className="w-6 h-6 cursor-pointer" />
        </div>
      </nav>

      {/* BANNER */}
      <section className="relative h-[90vh] flex items-center justify-start p-10 overflow-hidden">
        {popularSeries.length > 0 ? (
          <>
            {popularSeries.map((serie, index) => (
              <Link
                to={`/detalles/${serie.id}?type=tv`}
                key={serie.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${serie.backdrop_path}`}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-40 transition duration-300"></div>

                {index === currentIndex && (
                  <div className="absolute bottom-24 left-12 z-30 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-4">{serie.name}</h1>
                    <p className="text-gray-300 mb-6 max-w-xl line-clamp-3">
                      {serie.overview}
                    </p>
                    <button className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                      ▶ Ver
                    </button>
                  </div>
                )}
              </Link>
            ))}

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? popularSeries.length - 1 : prev - 1
                )
              }
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-transparent text-white p-4 rounded-full z-40 text-2xl"
            >
              <img src="/atrasador.svg" alt="Atras" className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  popularSeries.length > 0
                    ? (prev + 1) % popularSeries.length
                    : 0
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-transparent text-white p-4 rounded-full z-40 text-2xl"
            >
              <img src="/siguientes.svg" alt="Siguiente" className="w-6 h-6" />
            </button>
          </>
        ) : (
          <p className="text-gray-400">Cargando...</p>
        )}
      </section>

      {/* SECCIONES */}
      <Section title="Series al aire hoy" data={airingToday} id="airingToday" />
      <Section
        title="Series mejor valoradas"
        data={topRatedSeries}
        id="topRated"
      />
      <Section title="Series en emisión" data={onTheAir} id="onTheAir" />
    </div>
  );
}

// 🔹 COMPONENTE DE SECCIÓN CON NAVEGACIÓN A DETALLES
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
            data.map((serie) => (
              <Link
                to={`/detalles/${serie.id}?type=tv`}
                key={serie.id}
                className="w-40 h-60 flex-shrink-0 rounded-lg relative group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  className="w-full h-full object-cover rounded-lg"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-40 rounded-lg transition"></div>

                <div className="absolute bottom-0 w-full bg-black/60 p-2 text-sm font-semibold">
                  {serie.name}
                </div>
              </Link>
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

export default Series;
