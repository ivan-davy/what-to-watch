import {MovieType} from '../../types/types';
import MovieCard from '../movie-card/movie-card';
import {BaseSyntheticEvent, useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks/store-hooks';
import {ALL_GENRES_FILTER_NAME, MAX_MOVIES_SHOWN_HOME} from '../../const';
import ShowMore from '../show-more/show-more';

export type MovieListPropsType = {
  movies: MovieType[];
  isAtHome?: boolean;
}

export default function MovieList({movies, isAtHome = false}: MovieListPropsType): JSX.Element {
  const selectedGenreHome: string = useAppSelector((state) => state.home.selectedGenre);
  const moviesFiltered: MovieType[] = [];

  if (isAtHome) {
    movies.forEach((movie: MovieType) => {
      if (selectedGenreHome === ALL_GENRES_FILTER_NAME || selectedGenreHome === movie.genre) {
        moviesFiltered.push(movie);
      }
    });
  }

  const [activeId, setActiveId] = useState<string | null>(null);
  const [moviesShown, setMoviesShown] = useState<number>(Math.min(moviesFiltered.length, MAX_MOVIES_SHOWN_HOME));

  const handleMouseOver = (evt: BaseSyntheticEvent) => {
    const target = evt.target as Element;
    const parent = target.parentElement as Element;
    if (parent.classList.contains('small-film-card') || target.className === 'small-film-card__link') {
      setActiveId(parent.id);
    } else {
      setActiveId(null);
    }
  };

  const increaseMoviesShown = () => {
    setMoviesShown(Math.min(moviesFiltered.length, moviesShown + MAX_MOVIES_SHOWN_HOME));
  };

  useEffect(() => {
    setMoviesShown(Math.min(moviesFiltered.length, MAX_MOVIES_SHOWN_HOME));
  }, [selectedGenreHome, moviesFiltered.length]);

  if (isAtHome) {
    return (
      <>
        <div className="catalog__films-list" onMouseOver={handleMouseOver} onMouseOut={() => setActiveId(null)}>
          {moviesFiltered.slice(0, moviesShown).map((movie: MovieType) => <MovieCard movie={movie} isActive={movie.id.toString() === activeId} key={movie.id}/>)}
        </div>
        {moviesShown < moviesFiltered.length ? <ShowMore onClick={increaseMoviesShown}/> : null}
      </>);
  }
  return (
    <div className="catalog__films-list" onMouseOver={handleMouseOver} onMouseOut={() => setActiveId(null)}>
      {movies.map((movie: MovieType) => <MovieCard movie={movie} isActive={movie.id.toString() === activeId} key={movie.id}/>)}
    </div>);
}
