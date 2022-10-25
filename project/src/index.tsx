import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {moviesMock} from './mocks/movies';
import {reviewsMock} from './mocks/reviews';
import {MovieType, ReviewType} from './types/types';
import {Provider} from 'react-redux';
import {store} from './store';

export type StoreType = {
  featuredMovie: MovieType;
  movies: MovieType[];
  reviews: ReviewType[];
  myListMovies: MovieType[];
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const storeTemp: StoreType = {
  featuredMovie: moviesMock[11],
  movies: moviesMock,
  reviews: reviewsMock,
  myListMovies: moviesMock.slice(0, 7)
};

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App
        featuredMovie={storeTemp.featuredMovie}
        movies={storeTemp.movies}
        reviews={storeTemp.reviews}
        myListMovies={storeTemp.myListMovies}
      />
    </React.StrictMode>
  </Provider>
);
