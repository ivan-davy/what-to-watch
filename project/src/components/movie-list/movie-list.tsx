import {MovieType} from '../../types/types';
import MovieCard from '../movie-card/movie-card';
import {BaseSyntheticEvent, useState} from 'react';

export type MovieListPropsType = {
  movies: MovieType[];
}

export default function MovieList({movies}: MovieListPropsType): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleMouseOver = (evt: BaseSyntheticEvent) => {
    const target = evt.target as Element;
    const parent = target.parentElement as Element;
    if (parent.classList.contains('small-film-card') || target.tagName === 'A') {
      setActiveId(parent.id);
    } else {
      setActiveId(null);
    }
  };

  return (
    <div className="catalog__films-list" onMouseOver={handleMouseOver} onMouseOut={() => setActiveId(null)}>
      {movies.map((movie: MovieType) => <MovieCard movie={movie} isActive={movie.id.toString() === activeId} key={movie.id}/>)}
    </div>
  );
}