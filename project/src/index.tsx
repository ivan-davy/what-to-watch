import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {moviesMock} from './mocks/movies';
import {reviewsMock} from './mocks/reviews';
import {MovieType, ReviewType} from './types/types';

export type StoreType = {
  featuredMovie: MovieType;
  movies: MovieType[];
  reviews: ReviewType[];
  myListMovies: MovieType[];
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const store: StoreType = {
  featuredMovie: moviesMock[6],
  movies: moviesMock,
  reviews: reviewsMock,
  myListMovies: moviesMock.slice(0, 7)
};

root.render(
  <React.StrictMode>
    <App
      featuredMovie={store.featuredMovie}
      movies={store.movies}
      reviews={store.reviews}
      myListMovies={store.myListMovies}
    />
  </React.StrictMode>,
);
