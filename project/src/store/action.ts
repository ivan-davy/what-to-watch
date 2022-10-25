import {createAction} from '@reduxjs/toolkit';

export const genreResetAction = createAction('genreHome/reset');
export const genreChangeAction = createAction('genreHome-change', (newGenre) => ({
  payload: newGenre as string,
}));

//export const getAllMovies = createAction('moviesHome/getAll');
export const getMoviesByGenre = createAction('moviesHome/getByGenre');


