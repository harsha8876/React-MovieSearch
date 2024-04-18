import React, { useState, useEffect } from 'react';

const FilmCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  const [rating, setRating] = useState('');

  useEffect(() => {
    const fetchRating = async () => {
      const response = await fetch(`https://www.omdbapi.com/?apikey=6485b4b3&i=${imdbID}`);
      const data = await response.json();
      setRating(data.imdbRating);
    };

    fetchRating();
  }, [imdbID]);

  return (
    <div>
      <div className="movie" key={imdbID}>
        <div>
          <p>{Year}</p>
          <p>Rating: {rating}</p>
        </div>
        <div>
          <img src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} />
        </div>
        <div>
          <span>{Type}</span>
          <h3>{Title}</h3>
          
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
