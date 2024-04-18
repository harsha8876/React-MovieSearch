import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import FilmCard from './FilmCard';

const API_URL = 'https://www.omdbapi.com/?apikey=6485b4b3';



function App() {
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const searchMovie = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search);
    setSearchItem('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchMovie(searchItem);
    }
  };

  useEffect(() => {
    searchMovie('batman');
  }, []);

  return (
    <div className="app">
      <h1>CineSearch</h1>
      <div className="search">
        <input
          type="text"
          placeholder="search for movies"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(searchItem)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <FilmCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
