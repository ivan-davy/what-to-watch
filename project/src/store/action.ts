import {createAction} from '@reduxjs/toolkit';

export const genreReset = createAction('genreHome/reset');
export const genreChange = createAction('genreHome/change');
//export const getAllMovies = createAction('moviesHome/getAll');
export const getMoviesByGenre = createAction('moviesHome/getByGenre');
