import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createApi} from '../api/api';
import {redirect} from './middlewares/redirect';

export const api = createApi();
export const store = configureStore({reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
