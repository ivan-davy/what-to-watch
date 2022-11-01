import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {ReviewType} from '../types/types';

export const genreChangeAction = createAction('genreHome/change', (newGenre) => ({
  payload: newGenre as string,
}));

export const updateUserReviewsAction = createAction<ReviewType[]>('active/updateReviews');
export const updateAuthStatusAction = createAction<AuthorizationStatus>('user/requireAuth');

export const setLoadingStatusAction = createAction<boolean>('service/setLoadingStatus');
export const redirectToRouteAction = createAction<string>('service/redirectToRoute');


