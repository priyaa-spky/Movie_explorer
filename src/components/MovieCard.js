import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../services/tmdbApi';

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col"
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-72 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h3 className="text-white font-semibold text-base line-clamp-1 group-hover:text-amber-400">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
          <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}
          </span>
        </div>
      </div>
    </Link>
  );
}