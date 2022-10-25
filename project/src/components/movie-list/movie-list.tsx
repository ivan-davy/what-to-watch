import {MovieType} from '../../types/types';
import MovieCard from '../movie-card/movie-card';
import {BaseSyntheticEvent, useState} from 'react';
import {useAppSelector} from '../../hooks/store-hooks';
import {allGenresFilterName} from '../../const';

export type MovieListPropsType = {
  movies: MovieType[];
}

export default function MovieList({movies}: MovieListPropsType): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(null);
  const selectedGenre = useAppSelector((state) => state.selectedGenreHome);

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
      {movies.map((movie: MovieType) => {
        if (selectedGenre === allGenresFilterName || selectedGenre === movie.genre) {
          return <MovieCard movie={movie} isActive={movie.id.toString() === activeId} key={movie.id}/>;
        }
        return null;
      })}
    </div>
  );
}
