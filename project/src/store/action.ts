import {createAction} from '@reduxjs/toolkit';

export const genreResetAction = createAction('genreHome-reset');
export const genreChangeAction = createAction('genreHome-change', (newGenre) => ({
  payload: newGenre as string,
}));
export const getMoviesAction = createAction('movies-get');
