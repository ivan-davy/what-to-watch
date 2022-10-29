import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state';
import {State} from '../types/state';
import {AxiosInstance} from 'axios';
import {FormStatus, SIMILAR_SHOWN_QTY} from '../const';

import {
  ActiveMovieDataType,
  AuthDataType,
  HomeDataType,
  MovieType,
  NewReviewType,
  ReviewType,
  UserDataType
} from '../types/types';
import {ApiRoute, AuthorizationStatus} from '../const';
import {
  loadActiveMovieDataAction,
  loadHomeMovieDataAction, loadMyListMoviesAction, loadUserDataAction,
  requireAuthorizationAction,
  setLoadingStatusAction, updateUserReviewsAction
} from './action';
import {Omit} from '@reduxjs/toolkit/dist/tsHelpers';
import {store} from './store';
import {dropToken, saveToken} from '../api/token';
import {useNavigate} from 'react-router-dom';
import React from 'react';

export const fetchMoviesHomeAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/getMoviesHome',
  async (_, {dispatch, extra: api}) => {
    dispatch(setLoadingStatusAction(true));

    const homeData: Omit<HomeDataType, 'selectedGenre'> = {
      movies: [],
      featuredMovie: null,
    };

    homeData.movies = (await api.get<MovieType[]>(ApiRoute.Movies)).data;
    homeData.featuredMovie = (await api.get<MovieType>(ApiRoute.Featured)).data;

    dispatch(loadHomeMovieDataAction(homeData));
    dispatch(setLoadingStatusAction(false));
  },
);

export const fetchActiveMovieDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/getActiveMovieData',
  async (movieId, {dispatch, extra: api}) => {
    dispatch(setLoadingStatusAction(true));
    const activeData: ActiveMovieDataType = {
      movie: null,
      similar: null,
      reviews: null,
    };

    const navigate = useNavigate();

    try {
      activeData.movie = (await api.get<MovieType>(`${ApiRoute.Movies}/${movieId}`)).data;
      activeData.similar = (await api.get<MovieType[]>(`${ApiRoute.Movies}/${movieId}${ApiRoute.Similar}`))
        .data.slice(0, SIMILAR_SHOWN_QTY);
      activeData.reviews = (await api.get<ReviewType[]>(`${ApiRoute.Reviews}/${movieId}`)).data;
      dispatch(loadActiveMovieDataAction(activeData));
      dispatch(setLoadingStatusAction(false));
    } catch (err) {
      dispatch(setLoadingStatusAction(false));
      navigate('/not-found');
      throw err;
    }
  },
);

export const postUserReviewAction = createAsyncThunk<void, {userReview: NewReviewType; setFormSubmitStateCb: React.Dispatch<React.SetStateAction<number>>}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/postUserReview',
  async (formData, {dispatch, extra: api}) => {
    const activeId = store.getState().active.movie?.id;
    try {
      const updatedReviews = (await api.post<ReviewType[]>(`${ApiRoute.Reviews}/${activeId as number}`, formData.userReview)).data;
      dispatch(updateUserReviewsAction(updatedReviews));
      formData.setFormSubmitStateCb(FormStatus.Submitted);
    } catch (err) {
      formData.setFormSubmitStateCb(FormStatus.Available);
    }
  }
);

export const fetchMyListMoviesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/getActiveMovieData',
  async (_, {dispatch, extra: api}) => {
    dispatch(setLoadingStatusAction(true));

    const myListMovies = (await api.get<MovieType[]>(`${ApiRoute.MyList}`)).data;

    dispatch(loadMyListMoviesAction(myListMovies));
    dispatch(setLoadingStatusAction(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Omit<UserDataType, 'myList'>>(ApiRoute.Login);

      const userData: UserDataType = {
        id: data.id,
        name: data.name,
        avatarUrl: data.avatarUrl,
        email: data.email,
        token: data.token,
        myList: [],
      };

      dispatch(loadUserDataAction(userData));
      saveToken(userData.token as string);
      dispatch(requireAuthorizationAction(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorizationAction(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<Omit<UserDataType, 'myList'>>(ApiRoute.Login, {email, password});

    const userData: UserDataType = {
      id: data.id,
      name: data.name,
      avatarUrl: data.avatarUrl,
      email: data.email,
      token: data.token,
      myList: [],
    };

    dispatch(loadUserDataAction(userData));
    saveToken(userData.token as string);
    dispatch(requireAuthorizationAction(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireAuthorizationAction(AuthorizationStatus.NoAuth));
  },
);
