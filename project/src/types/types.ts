import {AuthorizationStatus} from '../const';

export type MovieType = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type ReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

export type NewReviewType = {
  comment: string;
  rating: number | null;
}

export type StateType = {
  active: ActiveMovieDataType;
  home: HomeDataType;
  myList: MovieType[];
  authStatus: AuthorizationStatus;
  isDataLoading: boolean;
}

export type ActiveMovieDataType = {
  movie: MovieType;
  similar: MovieType[];
  reviews: ReviewType[];
}

export type HomeDataType = {
  featuredMovie: MovieType;
  selectedGenre: string;
  movies: MovieType[];
}
