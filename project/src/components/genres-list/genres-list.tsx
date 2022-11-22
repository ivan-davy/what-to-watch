import {MovieType} from '../../types/types';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {genreChangeAction} from '../../store/action';
import {ALL_GENRES_FILTER_NAME} from '../../const';
import {getSelectedGenre} from '../../store/home/selectors';
import {useMemo} from 'react';

const MAX_GENRES_SHOWN = 10;

export type GenresListPropsType = {
  movies: MovieType[];
}

export default function GenresList({movies}: GenresListPropsType): JSX.Element {
  const getOrderedGenresList = (): string[] => {
    const orderedGenresList: string[] = [];
    orderedGenresList.push(ALL_GENRES_FILTER_NAME);
    movies.forEach((movie) => {
      if (!orderedGenresList.includes(movie.genre)) {
        orderedGenresList.push(movie.genre);
      }
    });
    return orderedGenresList;
  };

  const selectedGenre = useAppSelector(getSelectedGenre);
  const dispatch = useAppDispatch();

  const getGenreElement = (genre: string): JSX.Element => (
    <li className={`catalog__genres-item  ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
      <a onClick={() => dispatch(genreChangeAction(genre))} className="catalog__genres-link">{genre}</a>
    </li>
  );

  return (
    <>
      {useMemo(() => getOrderedGenresList(), [movies])
        .slice(0, MAX_GENRES_SHOWN)
        .map((genre) => getGenreElement(genre))}
    </>);
}
