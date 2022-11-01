import {combineReducers} from '@reduxjs/toolkit';
import {Namespace} from '../const';
import {home} from './home/home';
import {active} from './active/active';
import {user} from './user/user';
import {service} from './service/service';

export const rootReducer = combineReducers({
  [Namespace.Home]: home.reducer,
  [Namespace.Active]: active.reducer,
  [Namespace.User]: user.reducer,
  [Namespace.Service]: service.reducer,
});
