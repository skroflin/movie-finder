import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=dacfbdd6b61356be380de7e75971c4d6');
      setMovies(response.data.results);
    };

    fetchData();
  }, []);

  console.log(movies)

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.release_date}</p>
          <p>Overview: {movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.original_title} Poster`}
          />
        </div>
      ))}
    </div>
  );
};