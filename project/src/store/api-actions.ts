import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state';
import {State} from '../types/state';
import {AxiosInstance} from 'axios';
import {MovieType} from '../types/types';
import {ApiRoute} from '../const';
import {loadMovieAction, loadMoviesAction} from './action';

export const fetchMoviesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/getMovies',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<MovieType[]>(ApiRoute.Movies);
    dispatch(loadMoviesAction(data));
  },
);

export const fetchMovieAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'api/getMovie',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<MovieType>(`${ApiRoute.Movies}/${movieId}`);
    dispatch(loadMovieAction(data));
  },
);
