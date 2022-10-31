import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {ActiveMovieDataType, HomeDataType, MovieType, ReviewType} from '../types/types';
import {Omit} from '@reduxjs/toolkit/dist/tsHelpers';

export const genreChangeAction = createAction('genreHome/change', (newGenre) => ({
  payload: newGenre as string,
}));

export const loadHomeMovieDataAction = createAction<Omit<HomeDataType, 'selectedGenre'>>('home/loadData');

export const loadActiveMovieDataAction = createAction<ActiveMovieDataType>('active/loadDataById');
export const updateUserReviewsAction = createAction<ReviewType[]>('active/updateReviews');

export const loadMyListMoviesAction = createAction<MovieType[]>('user/loadMyList');
export const loadUserDataAction = createAction<UserDataType>('user/loadData');
export const updateAuthStatusAction = createAction<AuthorizationStatus>('user/requireAuth');

export const setLoadingStatusAction = createAction<boolean>('service/setLoadingStatus');
export const redirectToRouteAction = createAction<string>('service/redirectToRoute');


