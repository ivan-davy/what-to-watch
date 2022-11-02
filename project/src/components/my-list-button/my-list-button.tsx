import {MovieType} from '../../types/types';
import {AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {BaseSyntheticEvent} from 'react';
import {postToggleMyListMovie} from '../../store/api-actions';

export type MyListButtonPropsType = {
  movie: MovieType;
}

export default function MyListButton({movie}: MyListButtonPropsType): JSX.Element | null {
  const myListMovies = useAppSelector((state) => state.user.myList);
  const authStatus = useAppSelector((state) => state.service.authStatus);
  const dispatch = useAppDispatch();

  const handleButtonClick = (evt: BaseSyntheticEvent) => {
    evt.preventDefault();
    dispatch(postToggleMyListMovie({movieId: movie.id, actionId: movie.isFavorite ? 0 : 1}));
  };

  if (authStatus === AuthorizationStatus.NoAuth) {
    return null;
  }
  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleButtonClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={`${movie.isFavorite ? '#in-list' : '#add'}`}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{myListMovies.length}</span>
    </button>);
}
