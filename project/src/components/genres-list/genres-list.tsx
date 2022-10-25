import {MovieType} from '../../types/types';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {genreChangeAction} from '../../store/action';
import {allGenresFilterName} from '../../const';

export type GenresListPropsType = {
  movies: MovieType[];
}


export default function GenresList({movies}: GenresListPropsType): JSX.Element {
  const orderedGenresList: string[] = [];
  orderedGenresList.push(allGenresFilterName);
  movies.forEach((movie) => {
    if (!orderedGenresList.includes(movie.genre)) {
      orderedGenresList.push(movie.genre);
    }
  });

  const selectedGenre = useAppSelector((state) => state.selectedGenreHome);
  const dispatch = useAppDispatch();

  const getGenreElement = (genre: string): JSX.Element => (
    <li className={`catalog__genres-item  ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
      <a onClick={() => dispatch(genreChangeAction(genre))} className="catalog__genres-link">{genre}</a>
    </li>
  );

  console.log(selectedGenre);

  return <>{orderedGenresList.map((genre) => getGenreElement(genre))}</>;
}
