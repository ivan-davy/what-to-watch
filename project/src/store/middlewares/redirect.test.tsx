import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import {redirectToRouteAction} from '../action';
import {PageRoute} from '../../const';
import {State} from '../../types/state';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should redirect to /login', () => {
    store.dispatch(redirectToRouteAction(PageRoute.SignIn));
    expect(fakeHistory.location.pathname).toBe(PageRoute.SignIn);
    expect(store.getActions()).toEqual([
      redirectToRouteAction(PageRoute.SignIn),
    ]);
  });
});
