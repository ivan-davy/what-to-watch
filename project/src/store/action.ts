import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {MovieType} from '../types/types';

export const genreResetAction = createAction('genreHome/reset');
export const genreChangeAction = createAction('genreHome/change', (newGenre) => ({
  payload: newGenre as string,
}));
export const loadMoviesAction = createAction<MovieType[]>('movies/apiLoadMovies');
export const loadMovieAction = createAction<MovieType>('movies/apiLoadMovie');
export const requireAuthorizationAction = createAction<AuthorizationStatus>('user/requireAuthorization');
