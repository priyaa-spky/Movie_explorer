import React, { useState, useEffect } from 'react';
import { fetchMovies, fetchGenres } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Genres on mount
  useEffect(() => {
    fetchGenres()
      .then(setGenres)
      .catch((err) => console.error(err));
  }, []);

  // Fetch Movies based on search query or selected genre
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchMovies(searchQuery, selectedGenre)
      .then((data) => {
        if (isMounted) setMovies(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [searchQuery, selectedGenre]);

  const handleSearch = (query) => {
    setSelectedGenre(''); // Clear genre filter when searching
    setSearchQuery(query);
  };

  const handleSelectGenre = (genreId) => {
    setSearchQuery(''); // Clear search query when picking a genre
    setSelectedGenre(genreId);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={handleSelectGenre}
        />
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No movies found. Try searching for something else!
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}