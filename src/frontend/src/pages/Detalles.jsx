import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detalles() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [type, setType] = useState(""); // movie o tv
  const API_KEY = "0babf46a08195017924e9f9c670fc7d6";

  useEffect(() => {
    async function fetchData() {
      try {
        // 1️⃣ Intentar como película
        let res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`
        );
        if (res.ok) {
          let movieData = await res.json();
          setData(movieData);
          setType("movie");
          return;
        }

        // 2️⃣ Si falla, intentar como serie
        res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-ES`
        );
        if (res.ok) {
          let tvData = await res.json();
          setData(tvData);
          setType("tv");
          return;
        }

        // 3️⃣ Si no existe ni como movie ni tv
        setData(null);
      } catch (error) {
        console.error("Error al cargar detalles:", error);
      }
    }

    fetchData();
  }, [id]);

  if (!data) {
    return (
      <div className="text-center text-white mt-20 text-xl">
        Cargando o no encontrado...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto flex gap-10">
        {/* Poster */}
        <img
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
              : "/no-image.jpg"
          }
          alt={data.title || data.name}
          className="w-72 rounded-lg shadow-lg"
        />

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">
            {data.title || data.name}
          </h1>

          <p className="text-gray-300 mb-6 text-lg">
            {data.overview || "Sin descripción disponible"}
          </p>

          <p className="text-lg">
            ⭐ <b>Rating:</b> {data.vote_average}
          </p>

          {type === "movie" && (
            <p className="text-lg mt-2">
              🎬 <b>Duración:</b> {data.runtime} min
            </p>
          )}

          {type === "tv" && (
            <p className="text-lg mt-2">
              📺 <b>Temporadas:</b> {data.number_of_seasons}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detalles;
