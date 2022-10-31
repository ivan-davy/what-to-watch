import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {ApiRoute, AuthorizationStatus, SIMILAR_SHOWN_QTY} from '../const';
import {AuthDataType, MovieType, NewReviewType, ReviewType,} from '../types/types';
import {loadUserDataAction, setLoadingStatusAction, updateAuthStatusAction, updateUserReviewsAction} from './action';
import {Omit} from '@reduxjs/toolkit/dist/tsHelpers';
import {dropToken, saveToken} from '../api/token';
import React from 'react';
import {FormStatus} from '../components/add-review-form/add-review-form';

type FetchHomeDataReturnType = {
  movies: MovieType[];
  featuredMovie: MovieType | null;
}
export const fetchHomeDataAction = createAsyncThunk<FetchHomeDataReturnType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'home/apiGetData',
  async (_, {dispatch, extra: api}) => {
    const homeData: FetchHomeDataReturnType = {
      movies: [],
      featuredMovie: null,
    };

    homeData.movies = (await api.get<MovieType[]>(ApiRoute.Movies)).data;
    homeData.featuredMovie = (await api.get<MovieType>(ApiRoute.Featured)).data;

    return homeData;
  },
);

type FetchActiveMovieDataType = {
  movie: MovieType | null;
  similar: MovieType[];
  reviews: ReviewType[];
}
export const fetchActiveMovieDataAction = createAsyncThunk<FetchActiveMovieDataType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'active/apiGetDataById',
  async (movieId, {dispatch, extra: api}) => {
    const activeData: FetchActiveMovieDataType = {
      movie: null,
      similar: [],
      reviews: [],
    };

    activeData.movie = (await api.get<MovieType>(`${ApiRoute.Movies}/${movieId}`)).data;
    activeData.similar = (await api.get<MovieType[]>(`${ApiRoute.Movies}/${movieId}${ApiRoute.Similar}`))
      .data.slice(0, SIMILAR_SHOWN_QTY);
    activeData.reviews = (await api.get<ReviewType[]>(`${ApiRoute.Reviews}/${movieId}`)).data;

    return activeData;
  }
);


type PostUserReviewReturnType = ReviewType[];
export const postUserReviewAction = createAsyncThunk<void, {userReview: NewReviewType; setFormSubmitStateCb: React.Dispatch<React.SetStateAction<number>>}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiPostNewReview',
  async (formData, {dispatch, extra: api}) => {
    try {
      const updatedReviews: PostUserReviewReturnType = (await api.post<ReviewType[]>(`${ApiRoute.Reviews}/${activeId as number}`, formData.userReview)).data;
      dispatch(updateUserReviewsAction(updatedReviews));
      formData.setFormSubmitStateCb(FormStatus.Submitted);
    } catch (err) {
      formData.setFormSubmitStateCb(FormStatus.Available);
      throw err;
    }
  }
);

type FetchMyListMoviesReturnType = MovieType[];
export const fetchMyListMoviesAction = createAsyncThunk<FetchMyListMoviesReturnType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiGetMyList',
  async (_, {dispatch, extra: api}) =>
    (await api.get<MovieType[]>(`${ApiRoute.MyList}`)).data);

type CheckAuthActionReturnType = {
  id: number;
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
  myList: MovieType[];
}
export const checkAuthAction = createAsyncThunk<CheckAuthActionReturnType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiCheckUserAuth',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatusAction(true));
    const userData: Omit<CheckAuthActionReturnType, 'myList'> = (await api.get<Omit<UserDataType, 'myList'>>(ApiRoute.Login)).data;
    const myListMovies = (await api.get<MovieType[]>(`${ApiRoute.MyList}`)).data;

    const completeUserData: CheckAuthActionReturnType = {
      id: userData.id,
      name: userData.name,
      avatarUrl: userData.avatarUrl,
      email: userData.email,
      token: userData.token,
      myList: myListMovies,
    };

    dispatch(loadUserDataAction(userData));
    saveToken(completeUserData.token as string);
    dispatch(updateAuthStatusAction(AuthorizationStatus.Auth));

    return completeUserData;
  },
);

export const loginAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiLogin',
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
    dispatch(updateAuthStatusAction(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/apiLogout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(updateAuthStatusAction(AuthorizationStatus.NoAuth));
  },
);
