const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export async function fetchMovies(query = '', genreId = '') {
  let url = '';

  if (query) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  } else if (genreId) {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
  } else {
    url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch movies. Please try again later.');
  }
  const data = await response.json();
  return data.results;
}

export async function fetchMovieDetails(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Movie details could not be retrieved.');
  }
  return await response.json();
}

export async function fetchGenres() {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch genres.');
  }
  const data = await response.json();
  return data.genres;
}