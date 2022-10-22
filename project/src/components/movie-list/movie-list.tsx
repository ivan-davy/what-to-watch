import {MovieType} from '../../types/types';
import MovieCard from '../movie-card/movie-card';
import React from 'react';

export type MovieListPropsType = {
  movies: MovieType[];
}

export default function MovieList({movies}: MovieListPropsType): JSX.Element {
  //const [activeId, setActiveId] = React.useState(null);
  return (
    <div className="catalog__films-list">
      {movies.map((movie: MovieType) => <MovieCard movie={movie} key={movie.id}/>)}
    </div>
  );
}
