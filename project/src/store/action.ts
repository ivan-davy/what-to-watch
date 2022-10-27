import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {ActiveMovieDataType, HomeDataType} from '../types/types';
import {Omit} from '@reduxjs/toolkit/dist/tsHelpers';

export const genreChangeAction = createAction('genreHome/change', (newGenre) => ({
  payload: newGenre as string,
}));

export const loadsHomeMovieDataAction = createAction<Omit<HomeDataType, 'selectedGenre'>>('data/apiGetMoviesHome');
export const loadActiveMovieDataAction = createAction<ActiveMovieDataType>('data/apiGetMovieById');

export const setLoadingStatusAction = createAction<boolean>('data/setApiStatus');


export const requireAuthorizationAction = createAction<AuthorizationStatus>('user/requireAuth');
