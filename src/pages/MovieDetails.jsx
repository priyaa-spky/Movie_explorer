import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails, IMAGE_BASE_URL } from '../services/tmdbApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(id)
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-block mb-6 text-amber-400 hover:underline">
        ← Back to Movies
      </Link>
      <div className="flex flex-col md:flex-row gap-8 bg-gray-800 p-6 rounded-xl shadow-xl">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Poster'
          }
          alt={movie.title}
          className="w-full md:w-80 rounded-lg shadow-md object-cover"
        />
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 italic">{movie.tagline}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="bg-amber-500 text-black px-2.5 py-1 rounded-md font-bold">
              ★ {movie.vote_average?.toFixed(1)} / 10
            </span>
            <span>{movie.release_date}</span>
            <span>{movie.runtime} mins</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((g) => (
              <span key={g.id} className="bg-gray-700 px-3 py-1 rounded-full text-xs">
                {g.name}
              </span>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1 text-gray-200">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}