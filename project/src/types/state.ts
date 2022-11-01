import {store} from '../store/store';
import {MovieType, ReviewType} from './types';
import {AuthorizationStatus} from '../const';

export type HomeType = {
  home: {
    featuredMovie: MovieType | null;
    movies: MovieType[];
    selectedGenre: string;
  };
}

export type ActiveType = {
  active: {
    movie: MovieType | null;
    similar: MovieType[];
    reviews: ReviewType[];
  };
}

export type UserType = {
  user: {
    id: number | null;
    name: string | null;
    email: string | null;
    token: string | null;
    avatarUrl: string | null;
    myList: MovieType[];
  };
};

export type ServiceType = {
  service: {
    isDataLoading: boolean;
    authStatus: string;
  };
}

export type StateType = HomeType & ActiveType & UserType & ServiceType;

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
