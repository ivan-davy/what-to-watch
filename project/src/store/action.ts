import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {ActiveMovieDataType, HomeDataType, MovieType, UserDataType} from '../types/types';
import {Omit} from '@reduxjs/toolkit/dist/tsHelpers';

export const genreChangeAction = createAction('genreHome/change', (newGenre) => ({
  payload: newGenre as string,
}));

export const loadHomeMovieDataAction = createAction<Omit<HomeDataType, 'selectedGenre'>>('data/apiGetMoviesHome');
export const loadActiveMovieDataAction = createAction<ActiveMovieDataType>('data/apiGetMovieById');
export const loadMyListMoviesAction = createAction<MovieType[]>('data/apiGetMyList');
export const loadUserDataAction = createAction<UserDataType>('data/apiGetUserData');

export const setLoadingStatusAction = createAction<boolean>('data/setApiStatus');
export const setErrorAction = createAction<string | null>('game/setError');

export const requireAuthorizationAction = createAction<AuthorizationStatus>('user/requireAuth');
