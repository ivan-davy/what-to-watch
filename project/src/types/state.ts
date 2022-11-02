import {store} from '../store/store';
import {MovieType, ReviewType} from './types';
import {AuthorizationStatus} from '../const';

export type HomeType = {
  featuredMovie: MovieType | null;
  movies: MovieType[];
  selectedGenre: string;
}

export type ActiveType = {
  movie: MovieType | null;
  similar: MovieType[];
  reviews: ReviewType[];
}

export type UserType = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  avatarUrl: string | null;
  myList: MovieType[];
};

export type ServiceType = {
  isDataLoading: boolean;
  authStatus: AuthorizationStatus;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
