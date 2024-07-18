import React, { useState, useEffect } from "react";
import "../pages/Movies.css";
import { API_KEY } from "../utility/constant";
import Sidebar from "../component/Sidebar";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
        const data = await response.json();
        setMovieList(data.results); // Make sure to access the 'results' property which contains the list of movies
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="movies-content">
        <div className="movies-container">
          {movieList.map((movie) => (
            <img key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;

