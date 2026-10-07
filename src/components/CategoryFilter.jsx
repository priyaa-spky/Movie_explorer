import React from 'react';

export default function CategoryFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <select
      value={selectedGenre}
      onChange={(e) => onSelectGenre(e.target.value)}
      className="bg-gray-800 text-white px-4 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-400 cursor-pointer"
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}