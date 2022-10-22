import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {moviesMock} from './mocks/movies';
import {reviewsMock} from './mocks/reviews';
import {MoviesType, MovieType, ReviewsType} from './types/types';

export type StoreType = {
  featuredMovie: MovieType;
  movies: MoviesType;
  reviews: ReviewsType;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const store: StoreType = {
  featuredMovie: moviesMock[0],
  movies: moviesMock,
  reviews: reviewsMock
};

root.render(
  <React.StrictMode>
    <App
      featuredMovie={store.featuredMovie}
      movies={store.movies}
      reviews={store.reviews}
    />
  </React.StrictMode>,
);
